export const checkPermission = (permission) =>
    localStorage.getItem('permissions')?.toString()?.includes(permission);
