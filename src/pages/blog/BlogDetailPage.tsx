import React, { useEffect, useState } from 'react'
import { FaClock, FaUser } from 'react-icons/fa6'
import { useParams } from 'react-router-dom'
import { Blog } from '@/models'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { LoadingOverlay, Sidebar } from '@/components'
import { getBlog } from '../../services'
import { formartedDate } from '../../utils'
import parse from 'html-react-parser';


const BlogDetailPage: React.FC = () => {
    const { id: blogId } = useParams();
    const [blogData, setBlogData] = useState<Blog | null>(null);
    const isLoading = useSelector((state: RootState) => state.loading.isLoading);

    useEffect(() => {
        if (blogId) {
            fetchBlog();
            window.scrollTo(0, 0);
        }
    }, [blogId]);


    const fetchBlog = async () => {
        try {
            const response = await getBlog(blogId)
            setBlogData(response.data);
            console.log(response);
        } catch (error) {
            console.error("Error fetching blog:", error);
        }
    };

    return (
        <div>
            {isLoading && <LoadingOverlay />}
            {/* Blog Detail */}
            <div className='max-w-7xl mx-auto my-12 flex flex-col md:flex-row gap-12'>
                <div className='lg:w-3/4 mx-auto'>
                    <div>
                        <img src={blogData?.imgUrl} alt={blogData?.title} className='w-full mx-auto rounded h-96' />
                    </div>
                    <h2 className='text-3xl mt-8 font-bold mb-4 text-blue-500 cursor-pointer'>{blogData?.title}</h2>
                    <p className='mb-3 text-gray-600'><FaUser className='inline-flex items-center mr-2' />
                        {blogData?.manager?.name} | {formartedDate(blogData?.updatedAt)}
                    </p>
                    <p className='mb-3 text-gray-600'><FaClock className='inline-flex items-center mr-2' />
                        {blogData?.readingTime} minutes
                    </p>
                    <div className='text-base text-gray-500 mb-6'>
                        {blogData?.content ? parse(blogData.content) : ""}
                    </div>
                </div>
                <div className='lg:w-1/2'>
                    <Sidebar />
                </div>
            </div>
        </div>
    )
}

export default BlogDetailPage