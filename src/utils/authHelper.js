

export const isUserAuthenticated = () => {
  const token = sessionStorage.getItem('accessToken'); 
  return !!token;
};
