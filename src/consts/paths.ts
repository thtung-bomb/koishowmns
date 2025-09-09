export const PATHS = {
    HOME: '/',
    ABOUT: '/about',
    BLOG: '/blog',
    CONTACT: "/contact",
    BLOG_DETAIL: '/blog/:id',
    INTERNAL_SERVER_ERROR: '/500',
    NOTFOUND: '/404',
    CONTEST: '/contest',
    FORGOT_PASSWORD: '/forgot-password',
    LOGIN: '/login',
    CHANGE_PASSWORD: '/change-password',
    TERMS: '/terms',
    REGISTER_KOI: '/register-koi',
    SUCCESS: '/success',
    CANCEL: '/cancel',

    // member paths
    USER_PROFILE: '/profile',
    USER_HISTORY: '/history',

    // manager paths
    MANAGER: '/manager/*',
    MANAGER_HOME: '/manager/dashboard',
    MANAGER_LOGIN: '/manager/login',
    MANAGER_DASHBOARD: 'dashboard',
    MANAGER_USERS: 'manage-users',
    MANAGER_CATEGORY: 'manage-categories',
    MANAGER_CONTEST: 'manage-contest',
    MANAGER_CRITERIA: 'manage-criteria',
    MANAGER_BLOGS: 'manage-blogs',

    // referee paths
    REFEREE: '/referee/*',
    REFEREE_HOME: '/referee/dashboard',
    REFEREE_LOGIN: '/referee/login',
    REFEREE_DASHBOARD: 'dashboard',
    REFEREE_COMPETITION: 'competition',
    REFEREE_SCORE: 'score-koi/:roundId',

    // staff paths
    STAFF: '/staff/*',
    STAFF_LOGIN: '/staff/login',
    STAFF_HOME: '/staff/dashboard',
    STAFF_DASHBOARD: 'dashboard',
    STAFF_REGISTRATION: 'contest-registration',
    STAFF_COMPETITION: 'competition',
    STAFF_REPORT: 'report',
    STAFF_EVALUATE: 'evaluate/:roundId/:id'
}
