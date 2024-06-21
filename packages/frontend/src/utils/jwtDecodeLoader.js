// packages/frontend/src/utils/jwtDecodeLoader.js
export const loadJwtDecode = async () => {
    const jwtDecodeModule = await import('jwt-decode');
    return jwtDecodeModule.default || jwtDecodeModule;
};
