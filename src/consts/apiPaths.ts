export const API_PATHS = {
    //AUTH API
    LOGIN: "/api/auth/login",
    GET_CURRENT_LOGIN_USER: "api/auth",
    FORGOT_PASSWORD: "/api/auth/forgot-password",

    //USERS API
    REGISTER: "/api/users/register",
    CHANGE_PASSWORD: "/api/users/change-password",
    LOGOUT: "/api/auth/logout",
    CHANGE_STATUS_USER: "/api/users/change-status",
    GET_UPDATE_DELETE_USER: "/api/users",
    CHANGE_ROLE: "/api/users/change-role",
    CREATE_USER: "/api/users/register",
    GET_USERS: "/api/users/search",

    REGISTER_KOI: "/api/koiFish/register",
    KOI_VARIETY: "/api/variety",
    GET_USER_KOI: '/api/member/koi-fish',
    GET_CONTEST_REGISTRATION: '/api/member/registration',

    //CATEGORY API
    CREATE_CATEGORY: "/api/category/create",
    GET_CATEGORIES: "/api/category/search",
    GET_UPDATE_DELETE_CATEGORY: "/api/category",

    //BLOG API
    CREATE_BLOG: "/api/blog/create",
    GET_BLOGS: "/api/blog/search",
    GET_UPDATE_DELETE_BLOG: "/api/blog",

    //MEMBER API
    CONTEST_REGISTRATION: "/api/member/contest-registration",
    REVIEW_PENDING_REGISTRATION: "/api/member/pending-registration",

    //MANAGER API
    //CONTEST API
    CREATE_CONTEST: "/api/contest",
    GET_CONTEST: "/api/contest/search",
    UPDATE_CONTEST: "/api/contest/update-contest",
    DELETE_CONTEST: "/api/contest",
    UPDATE_RULE_CRITERIA: "/api/contest/update-rules",
    CONTEST_DETAIL: "/api/contest/",
    //CRITERIA API
    CREATE_CRITERIA: "/api/criteria/create",
    GET_CRITERIAS: "/api/criteria/search",
    GET_UPDATE_DELETE_CRITERIA: "/api/criteria",

    // STAFF API
    STAFF_CHECK_IN_LIST: "/api/round/check-in-list",


    // Dashboard 
    DASHBOARD_COUNT: "/api/dashboard/count",

    //Evaluation
    EVALUATE: "/api/evaluation/create"
}