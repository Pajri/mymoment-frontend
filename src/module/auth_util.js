import Vue from "vue"

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

export function getFullName(){
    const payload = Vue.$jwt.decode(getAccessToken(), null)
    if (payload.full_name){
        return payload.full_name;
    }else{
        return "";
    }
}