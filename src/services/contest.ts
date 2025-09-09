import { toast } from "react-toastify";
import { API_PATHS } from "../consts"
import { Contest } from "../models";
import { BaseService } from "./BaseService"

// export const getContest = async () => {
// 	const response = await BaseService.post({ url: API_PATHS.GET_ALL_CONTEST, payload: '' });
// 	return response.data;
// }


export const getContests = async (
	keyword: string = '',
	status: string = "",
	categoryId: any,
	pageNum: number = 1,
	pageSize: number = 10
) => {
	try {

		const response = await BaseService.post({
			url: API_PATHS.GET_CONTEST, payload: {
				searchCondition: {
					keyword: keyword || "",
					categoryId: categoryId || null,
					status: status || "",
					isDeleted: false
				},
				pageInfo: {
					pageNum: pageNum || 1,
					pageSize: pageSize || 10,
				},
			}
		});

		return response;
	} catch (error) {
		console.log('====================================');
		console.log(error);
		console.log('====================================');
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

export const createConstest = async (constestData: Contest) => {

	const response = await BaseService.post({ url: API_PATHS.CREATE_CONTEST, payload: constestData })

	toast.success("Created new contest successfully");
	return response;
}

export const getContestDetail = async (id: string) => {
	const response = await BaseService.get({ url: `${API_PATHS.CONTEST_DETAIL}${id}` });
	return response;
};

export const updateContest = async (updateData: Contest) => {
	await BaseService.put({ url: `${API_PATHS.UPDATE_CONTEST}`, payload: updateData });
	toast.success("Contest updated successfully");
}

export const deleteContest = async (id: string, name: string, fetchContests: () => Promise<void>) => {
	await BaseService.delete({ url: `${API_PATHS.DELETE_CONTEST}/${id}` });
	toast.success(`Deleted contest ${name} successfully`);
	await fetchContests();
};


