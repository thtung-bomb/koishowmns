import React, { useEffect, useState } from 'react';
import { Button, Result, Card, Descriptions, Divider } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { PATHS } from '../../consts';
import { BaseService } from '../../services';

const Success: React.FC = () => {
    const location = useLocation();
    const [registration, setRegistration] = useState(null);
    const navigate = useNavigate();

    // Parse the query parameters
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');

    useEffect(() => {
        if (!id) {
            navigate('/');
            return;
        }
        fetchRegistrationDetail();
    }, [id]);

    const fetchRegistrationDetail = async () => {
        try {
            const response = await BaseService.getById({ url: '/api/member/registration', id });
            setRegistration(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Card style={{ maxWidth: 1200, margin: 'auto', marginTop: 50 }}>
            <Result
                status="success"
                title="Registration Successful!"
                subTitle={`Contest: ${registration?.contestName || 'Loading...'}`}
            />
            {registration && (
                <div>
                    <Divider />
                    <Descriptions title="Registration Details" bordered>
                        <Descriptions.Item label="Order Number">{registration.id}</Descriptions.Item>
                        <Descriptions.Item label="Contest Name">{registration.contestName}</Descriptions.Item>
                        <Descriptions.Item label="Amount">${registration.amount}</Descriptions.Item>
                        <Descriptions.Item label="Payment Status">{registration.paymentStatus}</Descriptions.Item>
                        <Descriptions.Item label="Payment Date">
                            {new Date(registration.paymentDate).toLocaleString()}
                        </Descriptions.Item>
                        <Descriptions.Item label="Note">{registration.note || 'No additional notes'}</Descriptions.Item>
                    </Descriptions>
                    <Divider />
                    <Descriptions title="Fish Details" bordered>
                        <Descriptions.Item label="Name">{registration.fish.name}</Descriptions.Item>
                        <Descriptions.Item label="Variety">{registration.fish.varietyName}</Descriptions.Item>
                        <Descriptions.Item label="Size">{registration.fish.size} cm</Descriptions.Item>
                        <Descriptions.Item label="Description">{registration.fish.description}</Descriptions.Item>
                        <Descriptions.Item label="Date of Birth">
                            {new Date(registration.fish.dateOfBirth).toLocaleDateString()}
                        </Descriptions.Item>
                    </Descriptions>
                    <Divider />
                    <div style={{ textAlign: 'center', marginTop: 20 }}>
                        <Link to={PATHS.USER_HISTORY}>
                            <Button type="primary" style={{ marginRight: 10 }}>View History</Button>
                        </Link>
                        <Link to={PATHS.HOME}>
                            <Button>Back to Home</Button>
                        </Link>
                    </div>
                </div>
            )}
        </Card>
    );
};

export default Success;
