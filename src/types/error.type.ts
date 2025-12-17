export type ApiError = Error & {
  code?: string;
  status?: number;
  message?: string;
  isTokenValidate?: boolean;
  payload?: unknown;
};
