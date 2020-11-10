export function saveAccessToken(token) {
    localStorage.JWT = token;
}

export function saveAccessTokenFromResponse(response) {
    let data = response.data;
    let accessToken = data.access_token;
    localStorage.JWT = accessToken;
}

export function removeAccessToken() {
    localStorage.removeItem('JWT');
}

export function getAccessToken() {
    return localStorage.JWT
}