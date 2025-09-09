import axios from "axios";
import config from "@/secret";
import { toast } from "react-toastify";
import { getUserFromLocalStorage } from "../utils";
import { HttpStatus, PATHS } from "../consts";

export const axiosInstance = axios.create({
  baseURL: config.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 300000,
  timeoutErrorMessage: `Connection is timeout exceeded`
})

let isTokenExpired = false;
const user = getUserFromLocalStorage();
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log(response);
    if (response.status === HttpStatus.Success || response.status === HttpStatus.Created) {
      return response.data;
    }
  },
  (error) => {
    if (error.response) {
      const { data } = error.response;
      console.log(error.response);
      if (data.errors && data.errors.length > 0) {
        data.errors.forEach((error: { field: string, message: string[] }) => {
          const errorMessage = error.message.join(', ');
          toast.error(`${error.field}: ${errorMessage}`);
        });
      }

      else {
        switch (error.response.status) {
          case HttpStatus.Unauthorized:
          case HttpStatus.Forbidden: {
            if (!isTokenExpired) {
              isTokenExpired = true
              toast.error(data.message);
              const user = getUserFromLocalStorage();
              setTimeout(() => {
                if (user) {
                  window.location.href = PATHS.HOME
                } else {
                  return;
                }
                console.log('test')
                localStorage.clear();
                isTokenExpired = false;
              }, 1300);
            }
            break;
          }

          case HttpStatus.NotFound:
            toast.error(data.message || data.Message);
            switch(user.role){
              case "member":
                window.location.href = PATHS.NOTFOUND;
                break;
              case "manager":
                window.location.href = '/manager/404';
                break;
              case "referee":
                // window.location.href = "/referee/404";
                break;
              case "staff":
                window.location.href = "/staff/404";
                break;
              default:
                window.location.href = PATHS.HOME;
                break;
            }
            
            break;

          case HttpStatus.InternalServerError:
            toast.error(data.message || data.Message);
            window.location.href = PATHS.INTERNAL_SERVER_ERROR;
            break;

          default:
            toast.error(data.message || data.Message);
            break;
        }
      }

      return Promise.reject(error.response.data);
    } else {
      toast.error('Network error');
      return Promise.reject(error);
    }
  }
);