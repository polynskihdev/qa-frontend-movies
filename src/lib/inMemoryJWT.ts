import AuthService from '@api/services/AuthService/service';

const inMemoryJWTService = () => {
  let inMemoryJWT: string | null = null;
  let refreshTimeoutId: any = null;

  const abortRefreshToken = () => {
    if (refreshTimeoutId) {
      clearTimeout(refreshTimeoutId);
    }
  };

  const getToken = () => inMemoryJWT;

  function calculateTimeout(expiresIn: number): number {
    return expiresIn - Date.now();
  }

  function refreshToken(expiresIn: number): void {
    const timeoutDuration = calculateTimeout(expiresIn);

    refreshTimeoutId = setTimeout(async () => {
      try {
        const { accessToken, expiresIn: newExpiresIn } = await AuthService.refreshTokens({});
        console.log(accessToken, expiresIn);
        // eslint-disable-next-line
        setToken(accessToken, newExpiresIn);
      } catch (error) {
        console.error(error);
      }
    }, timeoutDuration);
  }

  function setToken(token: string, expiresIn: number): void {
    inMemoryJWT = token;
    refreshToken(expiresIn);
  }

  const deleteToken = () => {
    inMemoryJWT = null;
    abortRefreshToken();
    localStorage.setItem('logout', Date.now().toString());
  };

  return {
    getToken,
    setToken,
    deleteToken,
  };
};

export default inMemoryJWTService();
