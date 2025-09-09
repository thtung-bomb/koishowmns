import React, { useEffect, useState } from 'react';
import { BaseService } from '@/services';
import { Blog } from '../../models';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { getBlogs } from '../../services';

const Sidebar = () => {
    const [popularBlogs, setPopularBlogs] = useState<Blog[]>([]);
    const isLoading = useSelector((state: RootState) => state.loading.isLoading); // Lấy trạng thái loading

    useEffect(() => {
        fetchBlogs();
    }, []);

    async function fetchBlogs() {
        const response = await getBlogs();
        console.log(response)
        setPopularBlogs(response.data.pageData);
    }

    return (
        <div>
            <div>
                <h3 className='text-2xl font-semibold px-4'>Lastest Blogs</h3>
                <div>
                    {isLoading ? ( // Hiển thị loading khi đang fetch dữ liệu
                        <div>Loading...</div>
                    ) : (
                        popularBlogs.slice(0, 5).map((blog: Blog) => (
                            <div key={blog.id} className='my-5 border-b-2 border-spacing-2 px-4'>
                                <h4 className='font-medium mb-2'>{blog.title}</h4>
                                <Link to="/" className='text-base pb-2 hover:text-orange-500 inline-flex items-center py-1'>
                                    Read now <FaArrowRight className='mt-1 ml-2' />
                                </Link>
                            </div>
                        ))
                    )}
                </div>
            </div>
            <div>
                <h3 className='text-2xl font-semibold px-4 mt-20'>Popular Blogs</h3>
                <div>
                    {isLoading ? ( // Hiển thị loading cho popular blogs
                        <div>Loading...</div>
                    ) : (
                        popularBlogs.slice(6, 10).map((blog: Blog) => (
                            <div key={blog.id} className='my-5 border-b-2 border-spacing-2 px-4'>
                                <h4 className='font-medium mb-2'>{blog.title}</h4>
                                <Link to="/" className='text-base pb-2 hover:text-orange-500 inline-flex items-center py-1'>
                                    Read now <FaArrowRight className='mt-1 ml-2' />
                                </Link>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
