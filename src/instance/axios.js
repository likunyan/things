import { Toast } from "antd-mobile";
import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: { "Content-Type": "application/json" },
  timeout: process.env.REACT_APP_TIMEOUT,
  withCredentials: true,
});

instance.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
if (localStorage.token) {
  instance.defaults.headers.common.Authorization = localStorage.token;
}

instance.interceptors.request.use(
  (request) => {
    window.request = true;
    if (process.env.NODE_ENV === "development") {
      console.group("请求");
      window.console.log(request);
      console.groupEnd();
    }

    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    if (process.env.NODE_ENV === "development") {
      console.group("返回");
      window.console.log(response);
      console.groupEnd();
    }

    // 新 token
    const newToken = response.headers.authorization;
    if (newToken) {
      localStorage.token = newToken;
    }

    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.config.url === "/user/logout") {
        return error;
      }

      switch (error.response.status) {
        case 400:
          window.console.log(error);
          Toast.show({
            icon: "fail",
            content: error.response.data.message,
          });
          break;
        case 401: {
          const text = localStorage.getItem("userId")
            ? "登录状态过期"
            : "尚未登录账号";
          Toast.show({
            icon: "fail",
            content: text,
          });
          localStorage.removeItem("token");
          break;
        }
        case 422:
          break;
        default:
          Toast.show({
            icon: "fail",
            content: error.response.statusText || error.response.message,
          });
      }
    }

    return Promise.reject(error.response);
  }
);

export default instance;
