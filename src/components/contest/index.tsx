import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const blogs = [
	{
		title:
			"contest_ended",

		description:
			`contest_description_1
		contest_description_2
		contest_description_3
		contest_description_4
		contest_description_5
		contest_description_6`,
		date: "August 10th, 2020",
		image: "../../../src/assets/list_winner.png",
	},
	{
		title:
			"about_contest",
		description: "prizes_info",
		author: "Finn Alen",
		authorImg: "https://cdn.easyfrontend.com/pictures/users/user27.jpg",
		date: "March 11th, 2020",
		image: "../../../src/assets/contest.png",
	},
];

const BlogItem = ({ blog }) => {
	const { t } = useTranslation();
	const { title, description, image } = blog;

	const descriptionLines = description.split('\n').filter(line => line.trim() !== '');

	return (
		<article className="flex flex-col h-[500px]">
			<div className="flex-1">
				<img
					src={image}
					alt=""
					className="w-full object-cover rounded-md"
				/>
			</div>
			<div className="mt-6 lg:pr-6 flex flex-col justify-between h-full">
				<h4 className="text-2xl font-medium md:text-[40px] md:leading-[50px] mb-2 min-h-[80px]">
					{t(title)}
				</h4>
				{descriptionLines.length > 1 ? (
					<ul className="md:text-lg opacity-60 mt-3 mb-6 text-black list-disc pl-5">
						{descriptionLines.map((line, index) => (
							<li key={index}>{t(line.trim())}</li>
						))}
					</ul>
				) : (
					<p className="md:text-lg  mt-3 mb-6">{t(description)}</p>
				)}

				<hr className="ezy__blog9-hr my-6 opacity-10 text-btnBorder bg-btnBorder" />
			</div>
		</article>
	);
};

BlogItem.propTypes = {
	blog: PropTypes.object.isRequired,
};

const ContestComponent: React.FC = () => {
	const { t } = useTranslation();

	return (
		<section className="py-5 md:py-8 text-stone-800 bg-white dark:bg-[#0b1727] dark:text-white flex flex-col">
			<div className="px-8 md:px-24" >
				<div className="grid grid-cols-12 justify-center">
					<div className="col-span-12 lg:col-span-8 lg:col-start-1 lg:col-end-13 text-center">
						<h2 className="text-[32px] lg:text-[45px] text-center font-bold mb-4 text-yellow-500">
							{t('banner_contest')}
						</h2>
					</div>
				</div>

				<div className="grid grid-cols-2 items-center mt-6 gap-6 md:gap-11">
					{blogs.map((blog, i) => (
						<div className="col-span-2 md:col-span-1 w-full" key={i}>
							<BlogItem blog={blog} />
						</div>
					))}
				</div>
			</div>
			<div className="text-center mt-64">
				<Link
					to="/"
					className="bg-blue-600 hover:bg-opacity-90 text-white font-bold border border-blue-600 py-3 px-7 rounded transition"
				>
					{t('Load_All_Posts')}
				</Link>
			</div>
		</section>
	);
};

export default ContestComponent