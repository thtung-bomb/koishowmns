import React from 'react';
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';

const Cancel: React.FC = () => (
    <Result
        status="warning"
        title="You are cancel to checkout."
        extra={
            <Link to='/'>
                <Button type="primary" key="console">
                    Back to Home
                </Button>
            </Link>
        }
    />
);

export default Cancel;