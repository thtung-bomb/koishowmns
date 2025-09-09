import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { BaseService } from '../../../services';
import { Button, Table } from 'antd';

function ContestRegistration() {
	const [pendingRegistration, SetPendingRegistration] = useState([]);

	useEffect(() => {
		getPedingRegistration();
	}, [])

	/** 
	 * /api/staff/registration
	 * get peding registration
	 * */
	const getPedingRegistration = async () => {
		try {
			const data = await BaseService.get({ url: '/api/staff/registration' });
			console.log(data.data);
			console.log();
			SetPendingRegistration(data.data);
		} catch (error) {
			console.log(error);
			// toast.error(error);
		}
	}

	const handleAcceptRegistration = async (id: string) => {
		try {
			const response = await BaseService.get({ url: "/api/staff/approve-registration/" + id })
			toast.success(response.message);
			getPedingRegistration();
		} catch (error) {
			console.log(error);
			toast.error(error.message);
		}
	}

	const handleRejectRegistration = async (id: string) => {
		try {
			const response = await BaseService.get({ url: "/api/staff/reject-registration/" + id })
			toast.success(response.message);
			getPedingRegistration();
		} catch (error) {
			console.log(error);
			toast.error(error.Message);
		}
	}

	const columns = [
		{
			title: 'Contest Name',
			dataIndex: 'contestName',
			key: 'contestName',
		},
		{
			title: 'Display Name',
			dataIndex: 'displayName',
			key: 'displayName',
		},
		{
			title: 'Status',
			dataIndex: 'status',
			key: 'status',
		},
		{
			title: 'Action',
			key: 'action',
			render: (id, record) => (
				<div style={{ display: 'flex', gap: '8px' }}>
					<Button
						type="primary"
						onClick={() => handleAcceptRegistration(record.id)}
						disabled={record.status !== 'Pending'}
					>
						Accept
					</Button>
					<Button
						danger
						onClick={() => handleRejectRegistration(record.id)}
						disabled={record.status !== 'Pending'}
					>
						Reject
					</Button>
				</div>
			),
		}
	]

	return (
		<div>
			<Table dataSource={pendingRegistration} columns={columns} />
		</div>
	)
}

export default ContestRegistration
