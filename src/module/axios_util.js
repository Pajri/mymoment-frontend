import axios from "axios";

function setupResponseInterceptor(){
    axios.interceptors.response.use(function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
      }, function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        if (error.status == 401) {
            localStorage.removeItem('JWT');
            window.location.href = "login"
        }
        return Promise.reject(error);
      });
}

export default function setupAxios() {
    setupResponseInterceptor();
}