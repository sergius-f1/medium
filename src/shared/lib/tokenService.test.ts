import { tokenService } from './tokenService';

function createToken(expOffsetSeconds: number): string {
  const payload = { exp: Math.floor(Date.now() / 1000) + expOffsetSeconds };
  const encodedPayload = btoa(JSON.stringify(payload));
  return `header.${encodedPayload}.signature`;
}

describe('tokenService', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('get / set / remove', () => {
    it('returns null when no token is stored', () => {
      expect(tokenService.get()).toBeNull();
    });

    it('returns the token after set', () => {
      tokenService.set('my-token');
      expect(tokenService.get()).toBe('my-token');
    });

    it('returns null after remove', () => {
      tokenService.set('my-token');
      tokenService.remove();
      expect(tokenService.get()).toBeNull();
    });
  });

  describe('isExpired', () => {
    it('returns false for a valid token', () => {
      expect(tokenService.isExpired(createToken(3600))).toBe(false);
    });

    it('returns true for an expired token', () => {
      expect(tokenService.isExpired(createToken(-3600))).toBe(true);
    });

    it('returns true for a malformed token', () => {
      expect(tokenService.isExpired('not-a-jwt')).toBe(true);
    });
  });
});
