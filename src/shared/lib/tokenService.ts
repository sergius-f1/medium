const TOKEN_KEY = "token";

const get = (): string | null => localStorage.getItem(TOKEN_KEY);

const set = (token: string): void => localStorage.setItem(TOKEN_KEY, token);

const remove = (): void => localStorage.removeItem(TOKEN_KEY);

const isExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
};

export const tokenService = { get, set, remove, isExpired };
