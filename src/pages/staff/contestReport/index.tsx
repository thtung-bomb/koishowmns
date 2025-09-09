import React, { useEffect, useState } from 'react'
import { API_PATHS } from '../../../consts'
import axios from 'axios'
import { Table } from 'antd';

function ContestReport() {

	const [checkInList, setCheckInList] = useState([]);

	useEffect(() => {
		handleGetCheckInList();
	}, [])

	const handleGetCheckInList = async () => {
		try {
			const response = await axios.get(`${API_PATHS.STAFF_CHECK_IN_LIST}`);
			const { data } = response;
			console.log(data)
			setCheckInList(data);
		} catch (error) {
			console.error(error)
		}
	}

	const columns = [
		{
			title: 'ID',
			data: 'id',
			key: 'id',
		},
		{
			title: 'Owner Name',
			data: 'ownerName',
			key: 'ownerName',
		},
		{
			title: 'Koi Fish',
			data: 'koiFishName',
			key: 'koiFishName',
		},
		{
			title: 'Contest Name',
			data: 'contestName',
			key: 'contestName',
		},
		{
			title: 'Date',
			data: 'date',
			key: 'date',
			render: (date) => new Date(date).toLocaleString(),
		}
	]

	return (
		<Table dataSource={checkInList} columns={columns} />
	)
}

export default ContestReport
