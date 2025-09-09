import { Button, Result } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { PATHS } from '@/consts'

const NotAuthorized = () => {
    return (
        <Result
            status="403"
            title="403"
            subTitle="Sorry, you are not authorized to access this page."
            extra={<Button type="primary"><Link to={PATHS.HOME}>Back Home</Link></Button>}
        />
    )
}

export default NotAuthorized