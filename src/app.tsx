import React, { Suspense, lazy, useEffect } from 'react'
import { Row, Col, Spin } from 'antd'
import 'tailwindcss/tailwind.css'
import http from '@/services/http'
import { v4 as uuid } from 'uuid'

const Settings = lazy(() => import('./components/settings'))
const List = lazy(() => import('./components/list'))
const Detail = lazy(() => import('./components/detail'))

const App = () => {
  useEffect(() => {
    // http.get('https://github.com/login/oauth/authorize', {
    //   params: {
    //     client_id: process.env.GITHUB_CLIENTID,
    //     redirect_uri: 'http://localhost:3060',
    //     login: 'true',
    //     scope: 'user',
    //     state: uuid(),
    //     allow_signup: true,
    //   },
    // @https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps#troubleshooting
    //   withCredentials: false,
    // })
  })

  return (
    <Row align='middle' className='h-full'>
      <Col span={4} className='bg-green-100 h-full overflow-y-auto'>
        <Suspense fallback={<Spin size='large' delay={100} />}>
          <Settings />
        </Suspense>
      </Col>
      <Col span={6} className='bg-yellow-100 h-full overflow-y-auto'>
        <Suspense fallback={<Spin size='large' delay={100} />}>
          <List />
        </Suspense>
      </Col>
      <Col span={14} className='bg-blue-100 h-full overflow-y-auto'>
        <Suspense fallback={<Spin size='large' delay={100} />}>
          <Detail />
        </Suspense>
      </Col>
    </Row>
  )
}

export default App
