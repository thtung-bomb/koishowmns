import { Button, Result } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { PATHS } from '@/consts'

const Notfound = () => {
    return (
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<Button type="primary"><Link to={PATHS.HOME}>Back Home</Link></Button>}
        />
    )
}

export default Notfound