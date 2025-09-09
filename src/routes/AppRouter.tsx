import React from 'react';
import { Navigate, Route, Routes } from "react-router-dom";
import { PATHS, ROLES } from "@/consts";
import { useRoleRedirect } from '../hooks'
import {
    HomePage, AboutPage, BlogPage, ContactPage,
    BlogDetailPage, Notfound, DashboardLayout,
    ManagerDashboard, ManagerUsers, ManagerCategory,
    Managecompetition, ContestRegistration, ContestReport, ManageBlogs,
    RefereeCompetition, RefereeScored, ForgotPassword, ChangePassword, Profile, Terms, RegisterKoi, ManageContest, ManageCriteria,
    CancelPage, SuccessPage, History, EvaluateKoi, InternalServerError, ContestPage
} from "@/pages";
import RegistrationContest from '../pages/registration';

const AppRouter: React.FC = () => {
    const { canAccess } = useRoleRedirect();
    return (
        <Routes>
            <Route path={PATHS.HOME} element={<HomePage />} />
            <Route path={PATHS.ABOUT} element={<AboutPage />} />
            <Route path={PATHS.BLOG} element={<BlogPage />} />
            <Route path={PATHS.CONTACT} element={<ContactPage />} />
            <Route path={PATHS.BLOG_DETAIL} element={<BlogDetailPage />} />
            <Route path={PATHS.FORGOT_PASSWORD} element={<ForgotPassword />} />
            <Route path={PATHS.TERMS} element={<Terms />} />
            <Route path={PATHS.REGISTER_KOI} element={<RegisterKoi />} />
            <Route path={PATHS.SUCCESS} element={< SuccessPage />} />
            <Route path={PATHS.CANCEL} element={<CancelPage />} />
            <Route path={PATHS.USER_HISTORY} element={<History />} />
            <Route path={PATHS.CONTEST} element={<ContestPage />} />
            <Route path={PATHS.INTERNAL_SERVER_ERROR} element={<InternalServerError />} />



            {/* MEMBER ROUTE */}
            <Route path={PATHS.CHANGE_PASSWORD} element={<ChangePassword />} />
            <Route path={PATHS.USER_PROFILE} element={<Profile />} />
            <Route path='/contest-registration/:id' element={<RegistrationContest />} />

            {/* MANAGER ROUTE */}
            <Route path={PATHS.MANAGER} element={canAccess([ROLES.MANAGER]) ? <DashboardLayout /> : <Navigate to={PATHS.NOTFOUND} />}> {/* Layout */}
                <Route path={PATHS.MANAGER_DASHBOARD} element={<ManagerDashboard />} /> {/** MANAGER dashboard layout */}
                <Route path={PATHS.MANAGER_USERS} element={<ManagerUsers />} /> {/** MANAGER manage user */}
                <Route path={PATHS.MANAGER_CATEGORY} element={<ManagerCategory />} /> {/** MANAGER manage category */}
                <Route path={PATHS.MANAGER_CONTEST} element={<ManageContest />} /> {/** MANAGER manage contest */}
                <Route path={PATHS.MANAGER_CRITERIA} element={<ManageCriteria />} /> {/** MANAGER manage criteria */}
                <Route path={PATHS.MANAGER_BLOGS} element={<ManageBlogs />} /> {/** MANAGER manage blogs */}
                <Route path="*" element={<Notfound />} />

            </Route>

            {/* STAFF ROUTE */}
            <Route path={PATHS.STAFF} element={canAccess([ROLES.STAFF]) ? <DashboardLayout /> : <Navigate to={PATHS.NOTFOUND} />}> {/* Layout */}
                <Route path={PATHS.STAFF_REGISTRATION} element={<ContestRegistration />} /> {/* contest registration */}
                <Route path={PATHS.STAFF_COMPETITION} element={<Managecompetition />} /> {/* manage competition */}
                <Route path="*" element={<Notfound />} />

            </Route>

            {/* REFEREE ROUTE */}
            {/* login */}
            <Route path={PATHS.REFEREE} element={canAccess([ROLES.REFEREE]) ? <DashboardLayout /> : <Navigate to={PATHS.NOTFOUND} />}> {/* Layout */}
                <Route path={PATHS.REFEREE_COMPETITION} element={<RefereeCompetition />} /> {/* Assigned Competition */}
                <Route path={PATHS.REFEREE_SCORE} element={<RefereeScored />} /> {/* Score Koifish */}
                <Route path={PATHS.STAFF_EVALUATE} element={<EvaluateKoi />} /> {/* report */}
                <Route path="*" element={<Notfound />} />
            </Route>

            <Route path="*" element={<Notfound />} />
        </Routes>
    )
}

export default AppRouter;
