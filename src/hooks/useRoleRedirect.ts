
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { PATHS, ROLES } from "../consts";
import { getUserFromLocalStorage } from "../utils";

const useRoleRedirect = () => {
  const user = getUserFromLocalStorage();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (user.role) {
      redirectBasedOnRole();
    }
    if (user.googleId) {
      if (location.pathname.includes(PATHS.CHANGE_PASSWORD)) {
        navigate(PATHS.HOME)
      }
    }
  }, [user.role, location.pathname]);


  const redirectBasedOnRole = () => {
    const path = location.pathname;

    switch (user.role) {
      case ROLES.MEMBER:
        if (path.includes(ROLES.REFEREE) || path.includes(ROLES.MANAGER) || path.includes(PATHS.FORGOT_PASSWORD) || path.includes(ROLES.STAFF)) {
          navigate(PATHS.NOTFOUND);
        }
        break;
      case ROLES.REFEREE:
        if (!path.includes(ROLES.REFEREE) || path.includes(PATHS.LOGIN) || path.includes(PATHS.FORGOT_PASSWORD)) {
          navigate('/referee/competition');
        }
        break;
      case ROLES.MANAGER:
        if (!path.includes(ROLES.MANAGER) || path.includes(PATHS.LOGIN) || path.includes(PATHS.FORGOT_PASSWORD)) {
          navigate(PATHS.MANAGER_HOME);
        }
        break;
      case ROLES.STAFF:
        if (!path.includes(ROLES.STAFF) || path.includes(PATHS.LOGIN) || path.includes(PATHS.FORGOT_PASSWORD)) {
          navigate(PATHS.STAFF_HOME);
        }
        break;
        default:
          navigate(PATHS.NOTFOUND);
          break;
        
    }
  };
  const canAccess = (allowedRoles: string[]) => {
    return user.role && allowedRoles.includes(user.role);
  };

  return { canAccess };
};

export default useRoleRedirect;
