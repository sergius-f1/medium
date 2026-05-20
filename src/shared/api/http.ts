import { API_URL } from '../config';
import { tokenService } from '../lib';
import {
  CONTENT_TYPE_JSON,
  HEADER_AUTHORIZATION,
  HEADER_CONTENT_TYPE,
  HTTP_STATUS,
  HttpMethod,
} from './constants';

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly errors: Record<string, string[]>
  ) {
    super(`API Error: ${status}`);
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

type UnauthorizedHandler = () => void;

/**
 * Default unauthorized handler
 */
let onUnauthorized: UnauthorizedHandler = () => {
  tokenService.remove();
};

export const setUnauthorizedHandler = (handler: UnauthorizedHandler): void => {
  onUnauthorized = handler;
};

async function request<T>(
  method: HttpMethod,
  path: string,
  body?: unknown
): Promise<T> {
  const token = tokenService.get();
  const headers: HeadersInit = { [HEADER_CONTENT_TYPE]: CONTENT_TYPE_JSON };

  if (token) {
    headers[HEADER_AUTHORIZATION] = `Token ${token}`;
  }

  const response = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const data = await response.json();

  if (!response.ok) {
    if (response.status === HTTP_STATUS.UNAUTHORISED) {
      onUnauthorized();
    }
    const errors: Record<string, string[]> =
      data.errors ?? (data.message ? { body: [data.message] } : { body: ['Unknown error'] });
    throw new ApiError(response.status, errors);
  }

  return data as T;
}

/**
 * Used to send GET HTTP request to the API
 * @param path - endpoint path
 */
const get = <T>(path: string): Promise<T> =>
  request<T>('GET', path);

/**
 * Used to send POST HTTP request to the API
 * @param path - endpoint path
 * @param body - body of the request
 */
const post = <T>(path: string, body?: unknown): Promise<T> =>
  request<T>('POST', path, body);

/**
 * Used to send PUT HTTP request to the API
 * @param path - endpoint path
 * @param body - the body contains only modified fields of the object.
 */
const put = <T>(path: string, body?: unknown): Promise<T> =>
  request<T>('PUT', path, body);

/**
 * Used to send DELETE HTTP request to the API
 * @param path - endpoint path
 */
const deleteMethod = <T>(path: string): Promise<T> =>
  request<T>('DELETE', path);

export { get, post, put, deleteMethod };
