import { toast } from "react-toastify";
import { API_PATHS } from "../consts";
import { User } from "../models";
import { BaseService } from "./BaseService";
import { UserRole } from "../models/User";
import { ValuesChangePassword } from "../interfaces";



export const register = async (values) => {
  await BaseService.post({ url: API_PATHS.REGISTER, payload: values });
}

export const getUsers = async (
  keyword: string = "",
  role: string = "",
  status: boolean = true,
  isDeleted: boolean = false,
  pageNum: number = 1,
  pageSize: number = 10
) => {
  try {
    const response = await BaseService.post({
      url: API_PATHS.GET_USERS, payload: {
        searchCondition: {
          keyword: keyword || "",
          role: role || "",
          status: status !== undefined ? status : true,
          isDeleted: isDeleted !== undefined ? isDeleted : false,
        },
        pageInfo: {
          pageNum: pageNum || 1,
          pageSize: pageSize || 10,
        },
      }
    });
    return response;
  } catch (error) {
    console.log(error);
    return {
      data: {
        pageInfo: {
          totalItems: 0,
          pageNum,
          pageSize
        },
        pageData: []
      }
    };
  }
}

export const getUserDetail = async (_id: string) => {
  const response = await BaseService.get({ url: `${API_PATHS.GET_UPDATE_DELETE_USER}/${_id}` });
  return response;
};

export const createUser = async (userData: User) => {
  const response = await BaseService.post({ url: API_PATHS.CREATE_USER, payload: userData });
  toast.success("Created new user successfully");
  return response;
}

export const changePassword = async (values: ValuesChangePassword) => {
  const response = await BaseService.put({
    url: API_PATHS.CHANGE_PASSWORD, payload: {
      userId: user.id,
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
    }
  });
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  if (response.success) {
    toast.success("Change password successfully");
  }
};

export const deleteUser = async (id: string, email: string, fetchUsers: () => Promise<void>) => {
  await BaseService.delete({ url: `${API_PATHS.GET_UPDATE_DELETE_USER}/${id}` });
  toast.success(`Deleted user ${email} successfully`);
  await fetchUsers();
};

export const changeStatusUser = async (
  checked: boolean,
  userId: string,
  updateUserData: (userId: string, status: boolean) => void
) => {
  await BaseService.put({
    url: API_PATHS.CHANGE_STATUS_USER, payload: {
      userId: userId,
      status: checked,
    }
  });
  updateUserData(userId, checked);
  toast.success(`User status updated successfully`);
};

export const changeUserRole = async (userId: string, role: UserRole) => {
  await BaseService.put({
    url: API_PATHS.CHANGE_ROLE, payload: {
      userId: userId,
      role,
    }
  });
  toast.success(`Role changed successfully`);
};

export const updateUser = async (id: string, updateData: User) => {
  await BaseService.put({ url: `${API_PATHS.GET_UPDATE_DELETE_USER}/${id}`, payload: updateData });
  toast.success("User updated successfully");
}
