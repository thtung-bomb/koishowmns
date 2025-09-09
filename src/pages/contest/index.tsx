import React, { useEffect, useState } from 'react';
import { getContests } from '../../services';
import { Card, List, Tag, Pagination, Typography, Select, Row, Col, Input, DatePicker, Skeleton } from "antd";
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { SlPresent } from "react-icons/sl";
import { IoCalendarOutline } from 'react-icons/io5';
import { CiLocationOn, CiViewList } from "react-icons/ci";
import { BiLocationPlus } from 'react-icons/bi';

const { Title, Text } = Typography;
const { Option } = Select;
const { Search } = Input;

interface Contest {
	id: string;
	name: string;
	description: string;
	startDate: string;
	endDate: string;
	location: string;
	categories: Category[];
	criterias: Criteria[];
}

interface Category {
	id: string;
	name: string;
	description: string;
}

interface Criteria {
	weight: number;
	criteriaName: string;
	criteriaDescription: string;
}

function ContestPage() {
	const [contests, setContests] = useState<Contest[]>([]);
	const [pageNum, setPageNum] = useState(1);
	const [pageSize] = useState(10);
	const [totalItems, setTotalItems] = useState(0);
	const [status, setStatus] = useState<'UpComing' | 'Ongoing' | 'Completed'>('UpComing');
	const [keyword, setKeyword] = useState('');
	const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
	const [loading, setLoading] = useState(false); // thêm state loading
	const navigate = useNavigate();

	const handleGetContest = async () => {
		setLoading(true); // Bắt đầu loading
		try {
			const response = await getContests(keyword, status, '', pageNum, pageSize);
			setContests(response.data.pageData);
			setTotalItems(response.data.pageInfo.totalItems);
		} catch (error) {
			console.error('Error fetching contests:', error);
		} finally {
			setLoading(false); // Dừng loading sau khi dữ liệu được tải
		}
	};

	useEffect(() => {
		handleGetContest();
	}, [pageNum, status, sortOrder, keyword]);

	const handleCardClick = (contestId: string) => {
		navigate(`/contest-registration/${contestId}`);
	};

	const onPageChange = (page: number) => {
		setPageNum(page);
	};

	const handleStatusChange = (value: 'UpComing' | 'Ongoing' | 'Completed') => {
		setStatus(value);
		setPageNum(1);
	};

	const handleSortOrderChange = (value: 'asc' | 'desc') => {
		setSortOrder(value);
	};

	const handleSearch = (value: string) => {
		setKeyword(value);
	};

	return (
		<div style={{ padding: '20px' }}>
			<Title level={2} style={{ textAlign: 'center', marginBottom: '20px' }}>Contest List</Title>

			<Row gutter={16}>
				{/* Bộ lọc bên trái */}
				<Col span={8}>
					<div style={{ padding: '20px', backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
						<Title level={4}>Filters</Title>

						{/* Tìm kiếm theo tên cuộc thi */}
						<Search
							placeholder="Search by name"
							enterButton="Search"
							size="large"
							onSearch={handleSearch}
							style={{ marginBottom: '20px' }}
						/>

						{/* Lọc theo trạng thái */}
						<div style={{ marginBottom: '20px' }}>
							<Text strong>Status</Text>
							<Select
								defaultValue="UpComing"
								style={{ width: '100%', marginTop: '10px' }}
								onChange={handleStatusChange}
							>
								<Option value="UpComing">UpComing</Option>
								<Option value="Ongoing">Ongoing</Option>
								<Option value="Completed">Completed</Option>
							</Select>
						</div>

						{/* Sắp xếp theo ngày tháng */}
						<div>
							<Text strong>Sort by Date</Text>
							<Select
								defaultValue="asc"
								style={{ width: '100%', marginTop: '10px' }}
								onChange={handleSortOrderChange}
							>
								<Option value="asc">Ascending</Option>
								<Option value="desc">Descending</Option>
							</Select>
						</div>
					</div>
				</Col>

				{/* Danh sách các cuộc thi bên phải */}
				<Col span={16}>
					{loading ? (
						<Skeleton active paragraph={{ rows: 4 }} /> // Hiệu ứng loading
					) : (
						<List
							grid={{ gutter: 16, column: 1 }}
							dataSource={contests}
							renderItem={(contest) => (
								contest.round !== 0 ? ( // Kiểm tra nếu round khác 0
									<List.Item key={contest.id}>
										<Card
											title={<Title level={4}>{contest.name}</Title>}
											extra={
												contest.categories?.map((category) => (
													<Tag key={category.id} color="blue">
														{category.name}
													</Tag>
												))
											}
											bordered={false}
											style={{
												borderRadius: '8px',
												boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
												cursor: "pointer",
												transition: "transform 0.3s",
												padding: '10px 20px',
											}}
											onClick={() => handleCardClick(contest.id)}
											onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.02)"; }}
											onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
										>
											<div>
												<p style={{ display: 'block', marginTop: '10px' }}>{contest.description}</p>
											</div>

											<div className='flex gap-5'>
												<div className='flex items-center gap-1'>
													<div className='bg-[#f0f0f0] rounded-full p-1'>
														<CiViewList size={16} />
													</div>
													<span>10/40 tham gia</span>
												</div>

												<div className='flex items-center gap-1'>
													<div className='bg-[#f0f0f0] rounded-full p-1'>
														<IoCalendarOutline size={16} />
													</div>
													<span>{new Date(contest.startDate).toLocaleDateString()}</span>
												</div>

												<div className='flex items-center gap-1'>
													<div className='bg-[#f0f0f0] rounded-full p-1'>
														<SlPresent size={16} />
													</div>
													<span>100 triệu</span>
												</div>

												<div className='flex items-center gap-1'>
													<div className='bg-[#f0f0f0] rounded-full p-1'>
														<CiLocationOn size={16} />
													</div>
													<span>{contest.location}</span>
												</div>
											</div>
										</Card>
									</List.Item>
								) : null
							)}
						/>
					)}

					{
						contests.length > 10 ? <Pagination
							current={pageNum}
							pageSize={pageSize}
							total={totalItems}
							onChange={onPageChange}
							style={{ textAlign: 'center', marginTop: '30px' }}
							showSizeChanger={false}
							itemRender={(page, type, originalElement) => (
								<span style={{ fontWeight: type === 'page' && page === pageNum ? 'bold' : 'normal' }}>{originalElement}</span>
							)}
						/> : <></>
					}
				</Col>

			</Row>
		</div>
	);
}

export default ContestPage;
