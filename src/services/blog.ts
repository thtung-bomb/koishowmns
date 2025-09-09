import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { BaseService } from "./BaseService";
import { Blog } from "../models";
import { API_PATHS } from "../consts";


export const getBlogs = async (
  categoryId: string = "",
  pageNum: number = 1,
  pageSize: number = 10
) => {
  try {
    const response = await BaseService.post({
      url: API_PATHS.GET_BLOGS, payload: {
        "searchCondition": {
          "categoryId": categoryId || "",
          "isDeleted": false
        },
        "pageInfo": {
          "pageNum": pageNum || 1,
          "pageSize": pageSize || 100
        }
      }
    })
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
};

export const createBlog = async (blogData: Blog) => {
  await BaseService.post({ url: API_PATHS.CREATE_BLOG, payload: blogData });
  message.success("Blog added successfully");
}

export const getBlog = async (id: string) => {
  const response = await BaseService.getById({ url: API_PATHS.GET_UPDATE_DELETE_BLOG, id });
  return response;
}

export const updateBlog = async (id: string, blogData: Blog) => {
  await BaseService.put({ url: `${API_PATHS.GET_UPDATE_DELETE_BLOG}/${id}`, payload: blogData });
  message.success("Blog updated successfully");
}

export const deleteBlog = async (id: string, title: string, fetchBlogs: () => Promise<void>) => {
  await BaseService.delete({ url: `${API_PATHS.GET_UPDATE_DELETE_BLOG}/${id}` });
  message.success(`Deleted blog ${title} successfully`);
  await fetchBlogs();
};

export const handleGetBlogDetail = (id: string, navigate: ReturnType<typeof useNavigate>) => {
  navigate(`/blog/${id}`);
};