export const userLoggedIn = localStorage.getItem("localStorageIsSignedIn") ? JSON.parse(localStorage.getItem("localStorageIsSignedIn")) : false;

export const localStorageData = JSON.parse(localStorage.getItem('loginObject'));
export const userId = localStorageData ? localStorageData.userObject._id : null;
export const accessToken = localStorageData ? localStorageData.accessToken : '';
export const refreshToken = localStorageData ? localStorageData.refreshToken : '';