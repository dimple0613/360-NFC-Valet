export const ApiEndpoints = {
  auth: {
    login: "/auth/login",
    logout: "/auth/logout",
    refresh: "/auth/refresh",
  },
  valet: {
    shift: "/valet/shift",
    vehicles: "/valet/vehicles",
  },
} as const;
