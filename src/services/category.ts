import { toast } from "react-toastify";
import { API_PATHS } from "../consts"
import { BaseService } from "./BaseService"
import { Category } from "../models";

export const getCategories = async (
	keyword: string = "",
	pageNum: number = 1,
	pageSize: number = 10

) => {
	try {

		const response = await BaseService.post({
			url: API_PATHS.GET_CATEGORIES, payload: {
				searchCondition: {
					keyword: keyword || "",
					isDeleted: false
				},
				pageInfo: {
					pageNum: pageNum,
					pageSize: pageSize,
				},
			}
		});

		return response;
	} catch (error) {
		return {
			data: {
				pageInfo: {
					totalItems: 0,
					totalPages: 0,
					pageNum,
					pageSize
				},
				pageData: []
			}
		}
	}
}

export const createCategory = async (categoryData: Category) => {

	const response = await BaseService.post({ url: API_PATHS.CREATE_CATEGORY, payload: categoryData })

	toast.success("Created new category successfully");
	return response;
}

export const getCategoryDetail = async (id: string) => {
	const response = await BaseService.get({ url: `${API_PATHS.GET_UPDATE_DELETE_CATEGORY}/${id}` });
	return response;
};

export const updateCategory = async (id: string, updateData: Category) => {
	await BaseService.put({ url: `${API_PATHS.GET_UPDATE_DELETE_CATEGORY}/${id}`, payload: updateData });
	toast.success("Category updated successfully");
}

export const deleteCategory = async (id: string, name: string, fetchCategories: () => Promise<void>) => {
	await BaseService.delete({ url: `${API_PATHS.GET_UPDATE_DELETE_CATEGORY}/${id}` });
	toast.success(`Deleted category ${name} successfully`);
	await fetchCategories();
};
