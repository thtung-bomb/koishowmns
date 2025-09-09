import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getBlogs, handleGetBlogDetail } from "../../services";
import { useNavigate } from "react-router-dom";
import { Blog } from "../../models";
import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import { formartedDate } from "../../utils";
import './blog.css'
import "react-multi-carousel/lib/styles.css";
import Carousel from 'react-multi-carousel';



const ListBlogs = () => {

    const { t } = useTranslation();
    const [dataBlog, setDataBlog] = useState<Blog[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchBlog();
    }, []);
    const fetchBlog = async () => {
        const response = await getBlogs();
        setDataBlog(response.data.pageData)
    }

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    return (
        <div className="section_blog-1 w-full">
            <div className="container-1">
                <div className="block-title-1">
                    <h3 className="text-3xl leading-none md:text-[45px] font-bold text-yellow-500">
                        {t('title_blog')}
                    </h3>
                </div>
                <div className="block-content">
                    <div className="margin-am">
                        <Carousel responsive={responsive}>

                            {dataBlog.map((blog) => (
                                <div key={blog.id}>
                                    <a target="_blank" rel="noopener noreferrer">
                                        <Card
                                            onClick={() => handleGetBlogDetail(blog.id, navigate)}
                                            hoverable
                                            style={{ margin: '10px', backgroundColor: 'lightgray' }}
                                            cover={<img alt={blog.title} src={blog.imgUrl} style={{ borderRadius: '10px', height: '200px' }} />}
                                        >
                                            <Meta
                                                title={blog.title}
                                                description={formartedDate(blog.updatedAt)}
                                            />
                                        </Card>
                                    </a>
                                </div>
                            ))}
                        </Carousel>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListBlogs;