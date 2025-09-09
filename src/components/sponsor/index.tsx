import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const sponsors = [
	{
		img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7aw8zze-EdstkRqWqK7uRk7O69aIdhA6fxw&s",
	},
	{
		img: "https://vcdn1-kinhdoanh.vnecdn.net/2023/07/05/354413646-179485114820680-1747-9953-7239-1688547132.jpg?w=460&h=0&q=100&dpr=2&fit=crop&s=-SAC9NcPMNlTSAFRGgRXqw",
	},
	{
		img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQJ8t4uGNl-41or75XM9Yl8EPz9NcZuB888g&s",
	},
	{
		img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJ0a8naTdBjXKPB3f1OTqFg-gF-LRluWBCyA&s",
	},
];

const SponsorItem = ({ sponsor }: any) => (
	<div className="bg-white dark:bg-slate-800 shadow-xl rounded-2xl p-4">
		<div>
			<img
				src={sponsor.img}
				alt={sponsor.name}
				className="w-full rounded-t-2xl"
			/>
		</div>
	</div>
);

SponsorItem.propTypes = {
	sponsor: PropTypes.object.isRequired,
};

const ListSponsors = () => {

	const { t } = useTranslation();

	return (
		<section className="ezy__team20 light py-14 md:py-24 dark:bg-[#0b1727] text-zinc-900 dark:text-white">
			<div className="container px-4 mx-auto">
				<div className="flex justify-center text-center">
					<div className="sm:max-w-lg">
						<h3 className="text-3xl leading-none md:text-[45px] font-bold text-yellow-500">
							{t('title_sponsor')}
						</h3>
					</div>
				</div>
				<div className="grid grid-cols-4 gap-6">
					{sponsors.map((sponsor, i) => (
						<div className="col-span-4 sm:col-span-2 lg:col-span-1" key={i}>
							<SponsorItem sponsor={sponsor} />
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default ListSponsors;