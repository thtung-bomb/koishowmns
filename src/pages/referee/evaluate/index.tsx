import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Table, InputNumber, Typography, Image } from 'antd';
import { BaseService, evaluate } from '../../../services';
import { getUserFromLocalStorage } from '../../../utils';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const { Title } = Typography;

const EvaluateKoi = () => {
    const [form] = Form.useForm();
    const [averageScore, setAverageScore] = useState(0);
    const user = getUserFromLocalStorage();
    const [koi, setKoi] = useState<any>({});
    const { id, roundId } = useParams<{ id: string, roundId: string }>();
    useEffect(() => {
        const fetchKoi = async () => {
            try {
                const koi = await BaseService.getById({ url: '/api/KoiFish', id })
                // toast.success('Evaluated Koi successfully')
                setKoi(koi);
            } catch (error) {
                console.log(error)
            }
        }
        fetchKoi();
    }, [])



    const handleFinish = async (values) => {
        const dataToSend = {
            ...values,
            averageScore: averageScore.toFixed(2),
            fishId: id,
            refereeId: user.id,
            roundId: roundId
        };
        console.log(dataToSend);

        console.log('Submit Data:', dataToSend);
        try {
            await evaluate(dataToSend);
        } catch (error) {
            console.log(error.message);
        }
    };

    const columns = [
        {
            title: 'Criteria',
            dataIndex: 'criteria',
            key: 'criteria'
        },
        {
            title: 'Score',
            dataIndex: 'score',
            key: 'score',
            render: (text, record) => (
                <Form.Item
                    name={record.key}
                    rules={[
                        { required: true, message: `Please enter score for ${record.criteria}` },
                        { type: 'number', min: 0, max: 100, message: 'Score must be between 0 and 100' }
                    ]}
                >
                    <InputNumber min={0} max={100} onChange={(value) => updateScore(record.key, value)} />
                </Form.Item>
            )
        }
    ];

    const criteriaData = [
        { key: 'color', criteria: 'Color' },
        { key: 'pattern', criteria: 'Pattern' },
        { key: 'bodyShape', criteria: 'Body Shape' }
    ];

    const updateScore = (key, value) => {
        form.setFieldsValue({ [key]: value });
        const scores = criteriaData.map((item) => form.getFieldValue(item.key) || 0);
        const total = scores.reduce((acc, curr) => acc + curr, 0);
        setAverageScore(total / criteriaData.length);
    };

    return (
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
            {/* Koi Information */}
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '30px' }}>
                <div>
                    <Title level={3}>{koi.name}</Title>
                    <p>{koi.description}</p>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    {koi.koiImages?.map((image, index) => (
                        <Image
                            key={index}
                            width={100}
                            height={100}
                            src={image.imageUrl}
                            alt={`Koi image ${index + 1}`}
                            style={{ borderRadius: '8px' }}
                        />
                    ))}
                </div>
            </div>

            {/* Evaluation Form */}
            <div>
                <Title level={4}>Evaluate Koi</Title>
                <Form form={form} layout="vertical" onFinish={handleFinish}>
                    <Table
                        columns={columns}
                        dataSource={criteriaData}
                        pagination={false}
                        rowKey="key"
                        style={{ marginBottom: '20px' }}
                    />
                    <Form.Item label="Average Score">
                        <InputNumber value={averageScore.toFixed(2)} disabled />
                    </Form.Item>
                    <Form.Item label="Comments" name="comment" rules={[{ required: true, message: 'Please enter your comments' }]}>
                        <Input.TextArea rows={4} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Submit</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default EvaluateKoi;
