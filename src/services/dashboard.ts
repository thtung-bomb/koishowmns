import { API_PATHS } from "../consts";
import { BaseService } from "./BaseService";

export const getDashboard = async () => {
	try {
		const response = await BaseService.get({ url: API_PATHS.DASHBOARD_COUNT });
		return response.data;
	} catch (error) {
		console.log(error);

	}
} 