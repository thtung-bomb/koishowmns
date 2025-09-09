import { useTranslation } from "react-i18next";
import { FaUser } from "react-icons/fa6";
import { Link } from "react-router-dom";
import React from "react";
import { BlogCardsProps } from "@/interfaces";
import { Blog } from "@/models";
import { formartedDate } from '../../utils/timeHelpers/index';

const BlogCards: React.FC<BlogCardsProps> = ({ blogs, currentPage, selectedCategory, pageSize }) => {
    const { t } = useTranslation();
    const defaultImageUrl = "https://via.placeholder.com/400x300";
    const filteredBlogs = blogs
        .filter((blogs: Blog) => !selectedCategory || blogs.categoryName === selectedCategory)
        .slice((currentPage - 1) * pageSize, currentPage * pageSize);

    return (
        <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 max-w-5xl'>
            {filteredBlogs.map((blog: Blog) => (
                <Link key={blog.id} to={`/blog/${blog.id}`} className='p-5 shadow-lg rounded cursor-pointer'>
                    <div className='overflow-hidden rounded'>
                        <img
                            src={blog.imgUrl || defaultImageUrl}
                            alt={blog.title}
                            className='object-cover w-full h-48' // Set max height and maintain aspect ratio
                        />
                    </div>
                    <h3 className='mt-4 mb-2 font-bold hover:text-blue-600 cursor-pointer'>{blog.title}</h3>
                    <p className='mb-2 text-sm text-gray-600'>
                        <FaUser className='inline-flex items-center mr-2' />
                        {blog.manager.name}
                    </p>
                    <p className='text-sm text-gray-500'>
                        {t('blog_published')}: {formartedDate(blog.createdAt)}
                    </p>
                </Link>
            ))}
        </div>
    );
};

export default BlogCards;
