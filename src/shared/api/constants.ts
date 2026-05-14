/**
 * HTTP methods
 */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

/**
 * Header keys
 */
export const HEADER_CONTENT_TYPE = 'Content-Type'
export const HEADER_AUTHORIZATION = 'Authorization'

/**
 * Header values
 */
export const CONTENT_TYPE_JSON = 'application/json'


/**
 * List of HTTP status codes
 */
export const HTTP_STATUS =  {
    UNAUTHORISED: 401,
    FORBIDDEN: 403,
    INTERNAL_SERVER_ERROR: 500,
    SERVICE_UNAVAILABLE: 503,
};
