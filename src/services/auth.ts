import { useNavigate } from "react-router-dom";
import { API_PATHS, PATHS, ROLES, rolesArr } from "../consts";
import { toast } from "react-toastify";
import { BaseService } from "./BaseService";
import { JwtPayload } from "../interfaces";
import { jwtDecode } from "jwt-decode";

export const login = async (email: string, password: string) => {
  const response = await BaseService.post({
    url: API_PATHS.LOGIN,
    payload: { email, password },
  });

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  if (!response.success) {
    return;
  }


  const token = response.data.token;
  const decodedToken: JwtPayload = jwtDecode(token);
  console.log(decodedToken);
  const role = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
  // console.log(role);


  if (!rolesArr.includes(role)) {
    toast.error("Invalid user role");
    return null;
  }

  const currentPath = window.location.pathname;

  const userRole = role;

  console.log("user role", userRole);


  if (currentPath.includes(ROLES.REFEREE) && userRole !== ROLES.REFEREE) {
    toast.error("You don't have permission to access this page");
    return null;
  }
  else if (currentPath.includes(ROLES.MANAGER) && userRole !== ROLES.MANAGER) {
    toast.error("You don't have permission to access this page");
    return null;
  }

  else if (currentPath.includes(ROLES.STAFF) && userRole !== ROLES.STAFF) {
    toast.error("You don't have permission to access this page");
    return null;
  }

  // const handleWrongPathLogin = (correctPath: string) => {
  //   message.error(`You login wrong path. Navigate in 2s`);
  //   setTimeout(() => {
  //     window.location.href = correctPath;
  //   }, 2000);
  //   return null;
  // };

  // if (currentPath.includes("/admin")) {
  //   // Đã xử lý ở trên: nếu không phải admin vào trang admin
  // } else if ([roles.ADMIN, roles.MANAGER, roles.STAFF].includes(userRole)) {
  //   if (userRole === roles.ADMIN) {
  //     return handleWrongPathLogin(PATH.ADMIN_LOGIN);
  //   } else if (userRole === roles.MANAGER) {
  //     return handleWrongPathLogin(PATH.MANAGER_LOGIN);
  //   } else {
  //     return handleWrongPathLogin(PATH.STAFF_LOGIN);
  //   }
  // }

  return { token };
};


export const forgotPassword = async (email: string) => {
  await BaseService.put({ url: API_PATHS.FORGOT_PASSWORD, payload: { email } });
  toast.success('New password sent to your email. Please check your inbox.');
}

export const handleNavigateRole = async (token: string, navigate: ReturnType<typeof useNavigate>) => {
  localStorage.setItem('token', token);
  const response = await BaseService.get({ url: API_PATHS.GET_CURRENT_LOGIN_USER });
  const user = response.data;
  localStorage.setItem("user", JSON.stringify(user));
  switch (user.role) {
    case ROLES.MEMBER:
      navigate(PATHS.HOME);
      break;
    case ROLES.MANAGER:
      navigate(PATHS.MANAGER_HOME);
      break;
    case ROLES.REFEREE:
      navigate("/referee/competition");
      break;
    case ROLES.STAFF:
      navigate("/staff/competition");
      break;
    default:
      navigate(PATHS.HOME);
      break;
  }
  toast.success("Login successfully");
};

export const getCurrentLoginUser = async () => {
  const response = await BaseService.get({ url: API_PATHS.GET_CURRENT_LOGIN_USER });
  localStorage.setItem("user", JSON.stringify(response.data));
  return response.data;
};

export const logout = async (navigate: ReturnType<typeof useNavigate>) => {
  localStorage.clear();
  navigate(PATHS.HOME);
  toast.info("You logout from the system");
};
