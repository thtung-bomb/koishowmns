import { Button, Result } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { PATHS } from '@/consts'

const InternalServerError = () => {
    return (
        <Result
            status="500"
            title="500"
            subTitle="Sorry, something went wrong."
            extra={<Button type="primary"><Link to={PATHS.HOME}>Back Home</Link></Button>}
        />
    )
}

export default InternalServerError