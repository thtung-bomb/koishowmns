import { Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { useLocation, Link } from "react-router-dom";
import { BreadcrumbItemType, BreadcrumbSeparatorType } from "antd/lib/breadcrumb/Breadcrumb";
import { PATHS } from "../../consts";
import React from "react";

interface CustomBreadcrumbProps { }

const CustomBreadcrumb: React.FC<CustomBreadcrumbProps> = () => {
	const location = useLocation();
	const pathnames = location.pathname.split("/").filter((item) => item);

	// Xác định vai trò dựa trên đường dẫn
	const isManager = pathnames.includes("manager");
	const isStaff = pathnames.includes("staff");
	const isReferee = pathnames.includes("referee");

	// Nếu là admin hoặc instructor thì homeHref sẽ được xác định theo vai trò
	let finalHomeHref = PATHS.HOME;
	if (isManager) {
		finalHomeHref = PATHS.MANAGER;
	} else if (isStaff) {
		finalHomeHref = PATHS.STAFF;
	} else if (isReferee) {
		finalHomeHref = PATHS.REFEREE;
	}

	// Format các phần breadcrumb
	const formatTitle = (title: string) => {
		return title.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
	};

	let currentPath = "";

	// Tạo mảng breadcrumbItems và loại bỏ các phần tử null ngay trong quá trình tạo mảng
	const breadcrumbItems = [
		{
			title: (
				<Link to={finalHomeHref}>
					<HomeOutlined />
				</Link>
			),
		},
		...pathnames.map((value, index) => {
			// Bỏ qua các phần breadcrumb nếu vai trò là instructor hoặc admin
			if (isManager && value === "manager") {
				currentPath += `/${value}`;
				return null;
			}

			if (isReferee && value === "referee") {
				currentPath += `/${value}`;
				return null;
			}

			if (isStaff && value === 'staff') {
				currentPath += `/${value}`
				return null;
			}

			// Skip IDs assuming they are numeric or are MongoDB ObjectIDs
			if (!isNaN(Number(value)) || value.match(/^[0-9a-fA-F]{24}$/)) {
				currentPath += `/${value}`;
				return null;
			}

			// Cập nhật đường dẫn hiện tại
			currentPath += `/${value}`;

			// Tạo liên kết cho các mục breadcrumb
			const a = pathnames.length - 1;
			let isLast;
			if (!isNaN(Number(pathnames[a])) || pathnames[a].match(/^[0-9a-fA-F]{24}$/)) {
				isLast = index === pathnames.length - 2;
			} else {
				isLast = index === pathnames.length - 1;
			}

			const title = formatTitle(value);
			return {
				title: isLast ? (
					title
				) : (
					<Link to={currentPath}>{title}</Link>
				),
			};
		}).filter((item) => item !== null) as Array<Partial<BreadcrumbItemType & BreadcrumbSeparatorType>>,
	];

	return (
		<Breadcrumb className="py-2" items={breadcrumbItems} />
	);
};

export default CustomBreadcrumb;
