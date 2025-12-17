import { ApiError } from '@/types/error.type';

type ApiErrorPayload = {
  code?: string;
  message?: string;
  status?: number;
};

type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

export const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/+$/, '') || '';

//** 공통 fetch 래퍼 (throw를 통해 호출마다 별도의 response.ok없이 catch문 실행) */
export async function apiFetch<T>(
  path: string,
  {
    method = 'GET',
    token,
    body,
    headers,
    skipTokenCheck = false, // 토큰 체크 스킵 옵션 (로그인 API 등)
  }: {
    method?: HttpMethod;
    token?: string;
    body?: unknown;
    headers?: Record<string, string>;
    skipTokenCheck?: boolean;
  } = {}
): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(headers ?? {}),
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  // 성공 처리
  if (res.ok) {
    if (res.status === 204) return undefined as unknown as T;
    const ct = res.headers.get('content-type') || '';
    if (ct.includes('application/json')) return (await res.json()) as T;
    return (await res.text()) as unknown as T;
  }

  // 실패 처리
  let details: ApiError | string = '';
  const ct = res.headers.get('content-type') || '';
  details = ct.includes('application/json') ? await res.json() : await res.text();

  // 토큰 유효성 체크 및 처리
  if (!skipTokenCheck && isTokenValidateError(res.status, details)) handleTokenValidate();

  // 일반 에러 처리
  const message =
    typeof details === 'string'
      ? details || `HTTP ${res.status}`
      : details?.message || `HTTP ${res.status}`;
  // Error 객체 대신 객체를 직접 throw
  if (typeof details === 'object' && details.code) {
    // API 에러 응답이 있는 경우 - 전체 객체 throw
    throw {
      code: details.code,
      message: details.message || message,
      status: res.status,
      payload: details,
    };
  } else {
    // 일반 에러인 경우 - 기존 방식 유지
    const error: ApiError = new Error(message);
    error.status = res.status;
    error.payload = details;
    throw error;
  }
}

// 토큰 유효 처리 함수
function handleTokenValidate() {
  // 클라이언트 사이드에서만 실행
  if (typeof window !== 'undefined') {
    const pathname = window.location.pathname;

    alert('사용자 인증정보가 존재하지 않습니다. 다시 로그인해주세요.');
    // 로컬 스토리지 토큰 제거
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken'); // refresh token이 있다면

    // 세션 스토리지도 정리
    sessionStorage.removeItem('token');

    // 현재 페이지 URL을 저장 (로그인 후 돌아가기 위해)
    const currentPath = pathname + window.location.search;
    localStorage.setItem('redirectAfterLogin', currentPath);

    const stampId = pathname.split('/')[1];

    // 로그인 페이지로 리다이렉트
    window.location.href = `/${stampId}`;

    // 토큰 유효성 에러는 별도로 던지기 (확실하게 함수를 종료시키기 위함)
    const tokenError: ApiError = new Error('유효하지 않은 토큰입니다. 다시 로그인해주세요.');
    tokenError.status = 401;
    tokenError.isTokenValidate = true;
    throw tokenError;
  }
}

// 토큰 유효 여부 체크 함수들
function isTokenValidateError(status: number, error: ApiErrorPayload | string): boolean {
  // 상태 코드로 체크
  if (status === 401) return true;

  // 에러 메시지로 체크
  if (typeof error === 'object' && error.code) {
    const expiredCodes = ['TOKEN_EXPIRED', 'UNAUTHORIZED', 'INVALID_TOKEN', 'A002'];
    return expiredCodes.includes(error.code);
  }

  // 메시지 문자열로 체크
  if (typeof error === 'string') {
    const expiredMessages = ['token expired', 'unauthorized', 'invalid token'];
    return expiredMessages.some((item) => error.toLowerCase().includes(item));
  }

  return false;
}
