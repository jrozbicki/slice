export const isAuthenticated = () =>
  localStorage.getItem('isLoggedIn') === 'true';
