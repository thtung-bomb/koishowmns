import { toast } from "react-toastify";
import { API_PATHS, PATHS } from "../consts"
import { BaseService } from "./BaseService"

export const evaluate = async (evaluateData: any) => {
    const response = await BaseService.post({url: API_PATHS.EVALUATE, payload: evaluateData});
    if(response.success){
        toast.success("Evaluation submitted successfully");
    }
    return response;
}