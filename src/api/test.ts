import { apiFetch } from './api-base';

export async function loginApi(opts: {
  festivalId: number;
  stampId: number;
  data: {
    phone: string;
    name: string;
  };
}) {
  const { festivalId, stampId, data } = opts;
  return apiFetch(`/api/v2/user/festivals/${festivalId}/stamp-tours/${stampId}/login`, {
    method: 'POST',
    body: data,
  });
}

export async function signUpApi(opts: {
  festivalId: number;
  stampId: number;
  data: {
    phone: string;
    participantCount: number;
    name: string;
    extraText: string;
  };
}) {
  const { festivalId, stampId, data } = opts;
  return apiFetch(`/api/v2/user/festivals/${festivalId}/stamp-tours/${stampId}/signup`, {
    method: 'POST',
    body: data,
  });
}

export async function getFestivalId(opts: { subAddress: string }) {
  const { subAddress } = opts;
  return apiFetch(`/home?subAddress=${subAddress}`, {
    method: 'GET',
  });
}

export async function getFestivalInfo(opts: { festivalId: number }) {
  const { festivalId } = opts;
  return apiFetch(`/festivals/${festivalId}`, {
    method: 'GET',
  });
}
