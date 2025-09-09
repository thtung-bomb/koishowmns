import { toast } from "react-toastify";
import { API_PATHS } from "../consts";
import { BaseService } from "./BaseService";
import { Criteria } from "../models";

export const createCriteria = async (criteriaData: Criteria) => {
    const response = await BaseService.post({ url: API_PATHS.CREATE_CRITERIA, payload: criteriaData });
    toast.success("Created new criteria successfully");
    return response;
}

export const getCriterias = async (keyword: string = "",
	pageNum: number = 1,
	pageSize: number = 10) => {
    try {
        const response = await BaseService.post({
            url: API_PATHS.GET_CRITERIAS, payload: {
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
        console.log(error);
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
    };
}

export const getCriteriaDetail = async (id: string) => {
    const response = await BaseService.get({ url: `${API_PATHS.GET_UPDATE_DELETE_CRITERIA}/${id}` });
    return response;
};

export const updateCriteria = async (id: string, updateData: Criteria) => {
    await BaseService.put({ url: `${API_PATHS.GET_UPDATE_DELETE_CRITERIA}/${id}`, payload: updateData });
    toast.success("Criteria updated successfully");
}

export const deleteCriteria = async (id: string, name: string, fetchCriterias: () => Promise<void>) => {
    console.log(id);

    await BaseService.delete({ url: `${API_PATHS.GET_UPDATE_DELETE_CRITERIA}/${id}` });
    toast.success(`Deleted criteria ${name} successfully`);
    await fetchCriterias();
};