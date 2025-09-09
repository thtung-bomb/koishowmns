import React, { useEffect, useState } from 'react'
import { Banner, BlogCards, Pagination, CategorySelection, Sidebar, LoadingOverlay } from '@/components';
import { useScrollPosition } from '@/hooks';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { getBlogs, getCategories } from '../../services';
import { Blog, Category } from '../../models';

const BlogPage = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 12;
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categories, setCategories] = useState<Category[]>([])
    const [activeCategory, setActiveCategory] = useState('');
    const isLoading = useSelector((state: RootState) => state.loading.isLoading);
    useScrollPosition(window.location.href);

    useEffect(() => {
        fetchBlogs();
        fetchCategories()
    }, [currentPage, pageSize, selectedCategory])
    const fetchBlogs = async () => {
        const response = await getBlogs(selectedCategory, currentPage, pageSize);
        setBlogs(response.data.pageData);
    }

    const fetchCategories = async () => {
        const responseCategories = await getCategories();
        setCategories(responseCategories.data.pageData);
    }

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    }

    const handleCategoryChange = (category: React.SetStateAction<string>) => {
        setSelectedCategory(category);
        setCurrentPage(1);
        setActiveCategory(category);
    }

    return (
        <>
            {isLoading && <LoadingOverlay />}
            {/* Banner Section */}
            <Banner
                bgImage="../src/assets/6.png"
                titleKey="blog_title"
                descriptionKey="blog_description"
                buttonTextKey="login_button"
                showButton={true}
            />
            <div className='max-w-7xl mx-auto'>
                {/* Category Section */}
                <div>
                    <CategorySelection categories={categories} onSelectedCategory={handleCategoryChange} selectedCategory={selectedCategory} activeCategory={activeCategory} />
                </div>

                {/* BlogCards Section */}
                <div className='flex flex-col lg:flex-row gap-12'>
                    <BlogCards
                        blogs={blogs}
                        currentPage={currentPage}
                        selectedCategory={selectedCategory}
                        pageSize={pageSize}
                    />
                    {/* Sidebar components */}
                    <div>
                        <Sidebar />
                    </div>
                </div>

                {/* Pagination Section */}
                <div>
                    <Pagination onPageChange={handlePageChange} items={blogs} pageSize={pageSize} currentPage={currentPage} />
                </div>
            </div >
        </>
    )
}

export default BlogPage