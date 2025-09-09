export default interface ApiRequest {
    url: string;
    payload?: any;
    headers: object;
    isLoading?: boolean;
}