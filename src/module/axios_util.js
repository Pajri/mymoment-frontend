import axios from "axios";
import { saveAccessTokenFromResponse, removeAccessToken } from "@/module/auth_util"

function setupResponseInterceptor() {
  axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const response = error.response;
    if (response.status === 401) {
      const errorType = response.data.error_type;
      if (errorType == 'token_expired') {
        const refreshTokenUrl = process.env.VUE_APP_API_HOST + "/api/auth/refresh_token";
        const config = {
          withCredentials: true
        }
        return axios.post(refreshTokenUrl, null, config)
          .then((response) => {
            saveAccessTokenFromResponse(response);
            error.config.headers.Authorization = response.data.access_token;
            return axios.request(error.config)
          })
          .catch((error) => {
            return Promise.reject(error)
          })
      } else if (errorType == "token_invalid") {
        removeAccessToken();
        window.location.href='login';
      }else{
        return Promise.reject(error);
      }
    } else {
      return Promise.reject(error);
    }
  });
}

export default function setupAxios() {
  setupResponseInterceptor();
}

export function generateErrorMessageFromResponse(error){
  const status = error.response.status;
  const text = error.response.statusText;
  const message = "[Error] "+status+" : "+text;
  return message;
}