import React, { useEffect, useState } from 'react';
import { Button, Descriptions, Image, List, Modal, Table } from 'antd';
import { BaseService } from '../../../services';
import dayjs from 'dayjs';
import { getContestDetail } from '../../../services/contest';
import { toast } from 'react-toastify';

function EditCompetition() {

	const [assignRound, setassignRound] = useState([]);
	const [contestNames, setContestNames] = useState<Record<string, string>>({});
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [contestDetail, setContestDetail] = useState<any>(null);
	const [checkinData, setCheckinData] = useState<any[]>([]);
	const [selectedRound, setSelectedRound] = useState('');

	useEffect(() => {
		handleGetAssignRound();
	}, [])

	const handleGetAssignRound = async () => {
		try {
			const response = await BaseService.get({ url: '/api/round/assigned-round' });
			const { data } = response;
			data.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
			console.log(data)
			const contestNameMap: Record<string, string> = {};
			await Promise.all(
				data.map(async (round: any) => {
					const contestResponse = await getContestDetail(round.contestId);
					contestNameMap[round.contestId] = contestResponse.data.name;
				})
			);
			setContestNames(contestNameMap);
			setassignRound(data);
		} catch (error) {
			console.error(error)
		}
	}

	const showContestModal = async (contestId: string) => {
		const response = await getContestDetail(contestId);
		setContestDetail(response.data);
		setIsModalVisible(true);
	};

	const handleCloseModal = () => {
		setIsModalVisible(false);
		setContestDetail(null); // Reset contest detail on close
	};

	const getCheckinListForRound = async (roundId: string) => {
		setSelectedRound(roundId);
		try {
			const response = await BaseService.get({ url: '/api/round/check-in-list/' + roundId });
			setCheckinData(response.data);
			// Optionally, show another modal or handle the check-in data as needed
			console.log('Check-in data:', response.data);
		} catch (error) {
			console.error('Error fetching check-in data:', error);
		}
	};

	// Function to handle check-in
	const handleCheckIn = async (registrationId: string, roundId: string) => {
		try {
			console.log(registrationId);
			console.log(roundId);

			// Construct the check-in payload
			const checkInData = { registrationId, roundId };

			// Send the check-in request
			const response = await BaseService.post({ url: '/api/round/check-in', payload: checkInData });
			// Handle the server response
			toast.success(response.message);
		} catch (error) {
			console.error('Error during check-in:', error);
			toast.error('An error occurred during check-in. Please check the network or try again later.');
		}
	};

	const columns = [
		{
			title: 'Contest',
			dataIndex: 'contestId',
			key: 'contestId',
			render: (contestId: string) => (
				<Button type="link" onClick={() => showContestModal(contestId)}>
					{contestNames[contestId]}
				</Button>
			),
		},
		{
			title: 'Participant',
			dataIndex: 'participantNumber',
			key: 'participantNumber',
			width: '10%',
			render: (participantNumber: number, record: any) => (
				<Button type="link" onClick={() => getCheckinListForRound(record.id)}>
					{participantNumber}
				</Button>
			),
		},
		{
			title: 'Start Date',
			dataIndex: 'startDate',
			key: 'startDate',
			render: (startDate: string) => dayjs(startDate).format('DD-MM-YYYY'),
		},
		{
			title: 'End Date',
			dataIndex: 'endDate',
			key: 'endDate',
			render: (text: string) => new Date(text).toLocaleString(),
		},
	];

	return (
		<>
			<Table dataSource={assignRound} columns={columns} />
			{contestDetail && (
				<Modal
					title={contestDetail.name}
					visible={isModalVisible}
					onCancel={handleCloseModal}
					footer={null}
				>
					<p><strong>Description:</strong> {contestDetail.description}</p>
					<p><strong>Location:</strong> {contestDetail.location}</p>
					<p><strong>Status:</strong> {contestDetail.status}</p>
					<p><strong>Start Date:</strong> {dayjs(contestDetail.startDate).format('DD-MM-YYYY')}</p>
					<p><strong>End Date:</strong> {dayjs(contestDetail.endDate).format('DD-MM-YYYY')}</p>
					<p><strong>Rules:</strong></p>
					<ul>
						{contestDetail.rules.map((rule: any) => (
							<li key={rule.id}>{rule.description}</li>
						))}
					</ul>
					<p><strong>Categories:</strong></p>
					<ul>
						{contestDetail.categories.map((category: any) => (
							<li key={category.id}>
								{category.name} - {category.description}
							</li>
						))}
					</ul>
					<p><strong>Criterias:</strong></p>
					<ul>
						{contestDetail.criterias.map((criteria: any) => (
							<li key={criteria.criteriaName}>
								{criteria.criteriaName}: {criteria.criteriaDescription} (Weight: {criteria.weight * 100}%)
							</li>
						))}
					</ul>
				</Modal>
			)}

			{/* Check-in Data Modal */}
			<Modal
				title="Check-in Data"
				visible={checkinData.length > 0}
				onCancel={() => setCheckinData([])}
				footer={null}
				width={800}
			>
				<List
					dataSource={checkinData}
					renderItem={(checkin) => (
						<List.Item
							actions={[
								<Button
									type="primary"
									onClick={() => handleCheckIn(checkin.id, selectedRound)}
								>
									Check-in
								</Button>
							]}
						>
							<Descriptions column={3} className="gap-4">
								<Descriptions.Item label="Display Name" className="font-semibold">
									{checkin.displayName}
								</Descriptions.Item>
								<Descriptions.Item label="Fish Name">
									{checkin.fish.name}
								</Descriptions.Item>
								<Descriptions.Item label="Fish Variety">
									{checkin.fish.varietyName}
								</Descriptions.Item>
								<Descriptions.Item label="Fish Size">
									{checkin.fish.size} cm
								</Descriptions.Item>
								<Descriptions.Item label="Fish Age">
									{dayjs().diff(dayjs(checkin.fish.dateOfBirth), "month")} (months)
								</Descriptions.Item>
								<Descriptions.Item label="Check-in Status">
									{checkin.status}
								</Descriptions.Item>
								<Descriptions.Item label="Payment Status">
									{checkin.paymentStatus}
								</Descriptions.Item>
								<Descriptions.Item label="Payment Date">
									{dayjs(checkin.paymentDate).format("DD-MM-YYYY HH:mm")}
								</Descriptions.Item>
								<Descriptions.Item label="Note" className="italic">
									{checkin.note}
								</Descriptions.Item>
								<Descriptions.Item label="" span={12} className='flex justify-center align-middle'>
									{checkin.fish.koiImages && checkin.fish.koiImages.length > 0 && (
										<div className="mt-4 grid grid-cols-2 gap-4">
											{checkin.fish.koiImages.map((image, index) => (
												<div key={index} className="w-full">
													<img
														src={image.imageUrl}
														alt={`Koi Fish ${index + 1}`}
														className="w-full h-auto rounded-lg shadow-lg"
													/>
												</div>
											))}
										</div>
									)}
								</Descriptions.Item>
							</Descriptions>
						</List.Item>
					)}
				/>
			</Modal>

		</>
	)
}

export default EditCompetition
