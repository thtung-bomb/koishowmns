import { Button, Col, DatePicker, Form, Image, Input, Radio, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { GetProp, UploadFile, UploadProps } from "antd";
import { getBase64, uploadFile } from "../../utils";
import { PlusOutlined } from '@ant-design/icons';
import { getVariety, registerKoiFish } from '../../services/koiFish';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];


function RegisterKoiPage() {
	const [form] = Form.useForm();
	const { t } = useTranslation();
	const [previewOpen, setPreviewOpen] = useState(false);
	const [previewImage, setPreviewImage] = useState("");
	const [fileList, setFileList] = useState<UploadFile[]>([]);
	const [variety, setVariety] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		fetchVariety();
	}, [])

	const fetchVariety = async () => {
		try {
			const response = await getVariety();
			console.log(response);
			setVariety(response.data);
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		const user = localStorage.getItem('user');
		if (user) {
			const userId = JSON.parse(user).id;
			form.setFieldsValue({ ownerId: userId });
		}
	}, [form]);

	const onFinish = async (values) => {
		console.log('Form values:', values);

		if (fileList.length > 0) {
			const imageUrls: string[] = [];

			for (const file of fileList) {
				if (file.originFileObj) {
					try {
						const imageKoi = await uploadFile(file.originFileObj as File);
						console.log("Uploaded image URL:", imageKoi);
						imageUrls.push(imageKoi);
					} catch (error) {
						console.error("Error uploading file:", error);
					}
				}
			}

			values.koiImages = imageUrls;
			console.log("Final values with image URLs (array):", values.koiFishs);
		}
		console.log('====================================');
		console.log("file list", values.koiFishs);
		console.log('====================================');

		try {
			const response = await registerKoiFish(values);
			console.log(response);
			console.log('====================================');
			console.log("[P]::::registered KoiFish: ", response);
			console.log('====================================');
			toast.success("Registered KoiFish successfully, See your list register in history");

			form.resetFields();
			setFileList([]);
			navigate('/history');
		} catch (error) {
			console.error("Error registering koi fish:", error);
		}

	};

	const handlePreview = async (file: UploadFile) => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj as FileType);
		}
		setPreviewImage(file.url || (file.preview as string));
		setPreviewOpen(true);
	};

	const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => setFileList(newFileList);

	const uploadButton = (
		<button
			style={{
				border: 0,
				background: 'none',
			}}
			type="button"
		>
			<PlusOutlined />
			<div
				style={{
					marginTop: 8,
				}}
			>
				Upload
			</div>
		</button>
	);

	return (
		<>
			<div className='text-red-900 font-bold text-5xl text-center w-full py-10'>
				REGISTER YOUR KOI HERE
				{/* <p className='font-medium text-xl'>Add your koi entries here and pay $5/entry fee.</p> */}
			</div>
			<h1 className='text-4xl font-bold text-center'>6th Koi Show: Add Koi Entry - Single Koi Entry</h1>
			<div className='flex justify-center gap-10'>
				<Col span={8}>
					<Form
						form={form}
						name="koiFishForm"
						layout="vertical"
						onFinish={onFinish}
						initialValues={{
							name: '',
							description: '',
							variety: '',
							size: 0,
						}}
					>
						<Form.Item
							label={t('koi_name_label')}
							name="name"
							rules={[{ required: true, message: t('koi_name_error') }]}
						>
							<Input placeholder={t('koi_name_label')} />
						</Form.Item>
						<Form.Item
							label={t('variety_label')}
							name="varietyId"
							rules={[{ required: true, message: t('variety_error') }]}
						>
							<Radio.Group className='grid grid-cols-2 gap-4'>
								{variety.map((item, index) => (
									<Radio key={item.id} value={item.id} className={`flex w-1/2 ${index >= 2 ? 'mt-4' : ''}`}>{item.name}</Radio>
								))}
							</Radio.Group>
						</Form.Item>

						<Form.Item label="Date of Birth" name="DateOfBirth">
							<DatePicker />
						</Form.Item>

						<Form.Item
							label={t('size_label')}
							name="size"
							rules={[{ required: true, message: t('size_error') }]}
						>
							<Radio.Group className="flex gap-6">
								<div className="flex flex-col gap-3 w-1/2">
									<Radio value={15}>15 Bu - Under 15cm or 6”</Radio>
									<Radio value={25}>25 Bu - 15-25cm or 6-10”</Radio>
									<Radio value={35}>35 Bu - 25-35cm or 10-12”</Radio>
									<Radio value={45}>45 Bu - 35-45cm or 12-18”</Radio>
								</div>
								<div className="flex flex-col gap-3 w-1/2">
									<Radio value={55}>55 Bu - 45-55cm or 18-22”</Radio>
									<Radio value={65}>65 Bu - 55-65cm or 22-26”</Radio>
									<Radio value={75}>75 Bu - 65-75cm or 26-30”</Radio>
								</div>
							</Radio.Group>
						</Form.Item>

						<Form.Item label="Koi Image" name="koiImages" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
							<Upload
								action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
								listType="picture-card"
								fileList={fileList}
								onPreview={handlePreview}
								onChange={handleChange}
							>
								{fileList.length >= 4 ? null : uploadButton}
							</Upload>

						</Form.Item>

						<Form.Item
							label={t('description_label')}
							name="description"
							rules={[{ required: true, message: t('description_error') }]}
						>
							<Input.TextArea rows={4} placeholder={t('description_label')} />
						</Form.Item>

						<Form.Item name="ownerId" hidden>
							<Input type="hidden" />
						</Form.Item>

						<Form.Item>
							<Button className='w-full' type="primary" htmlType="submit">
								{t('submit_koi_button')}
							</Button>
						</Form.Item>
					</Form>
				</Col>
				{previewImage && (
					<Image
						wrapperStyle={{ display: 'none' }}
						preview={{
							visible: previewOpen,
							onVisibleChange: (visible) => setPreviewOpen(visible),
							afterOpenChange: (visible) => !visible && setPreviewImage(''),
						}}
						src={previewImage}
					/>
				)}

			</div >
		</>

	);
}

export default RegisterKoiPage;
