import { API_PATHS } from "../consts";
import { BaseService } from "./BaseService";

export const registerKoiFish = async (values) => {
	await BaseService.post({ url: API_PATHS.REGISTER_KOI, payload: values });
}


export const getVariety = async () => {
	const response = await BaseService.get({ url: API_PATHS.KOI_VARIETY });
	return response
}

export const getKois = async (searchText: string = "", page: number = 1, pageSize: number = 10) => {
	try {
		const payload = {
			searchCondition: {
				isDeleted: false,
				keyword: searchText || "",
			},
			pageInfo: {
				pageNum: page || 1,
				pageSize: pageSize || 10,
			},
		};
	
		const response = await BaseService.post({ url: API_PATHS.GET_USER_KOI, payload });
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

export const getContestRegistration = async (
	status?: "Pending" | "Approved" | "Rejected", // Make status optional
	searchText: string,
	page: number,
	pageSize: number
) => {
	const payload = {
		searchCondition: {
			status: status || undefined, // Only include status if provided
			isDeleted: false,
			keyword: searchText,
		},
		pageInfo: {
			pageNum: page,
			pageSize,
		},
	};

	try {
		const response = await BaseService.post({ url: API_PATHS.GET_CONTEST_REGISTRATION, payload });
		return response.data;
	} catch (error) {
		console.log('====================================');
		console.log(error);
		console.log('====================================');
		return {
			data: {
				pageInfo: {
					totalItems: 0,
					totalPages: 0,
					page,
					pageSize
				},
				pageData: []
			}
		};
	}
};
