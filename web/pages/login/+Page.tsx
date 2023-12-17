export default Page

import CryptoJS from 'crypto-js'
import axios from 'axios'
import { Alert, Card, Flex, Button, Form, Input, notification } from 'antd'

import WaveSvg from './wave.svg?react'
import Logo from '~/assets/images/logo.svg?react'

import './login.less'
import { usePageContext } from '~/renderer/usePageContext'

function Page() {
  return (
    <>
      <div className="login-page">
        <Card bordered={false}>
          <LogoBadge></LogoBadge>
          <LoginForm></LoginForm>
          <Footer></Footer>
        </Card>
      </div>
    </>
  )
}

function LogoBadge() {
  return (
    <>
      <Flex wrap="wrap" gap="middle" align="center">
        <div className="logo-badge">
          <Logo></Logo>
        </div>
        <div className="login-title">MidwayFull</div>
      </Flex>
      <div className="login-subtitle">
        基于 Midwayjs + Vite + Vike + React + Antd 的全栈开发实践
      </div>
    </>
  )
}

function LoginForm() {
  const { csrfToken } = usePageContext()
  const [api, contextHolder] = notification.useNotification()

  const onFinish = async (values: any) => {
    let { username, password } = values
    password = CryptoJS.enc.Base64.stringify(CryptoJS.SHA256(password))
    try {
      await axios.post(
        '/api/login',
        { username, password },
        { headers: { 'x-csrf-token': csrfToken } }
      )
      const { pathname } = new URL(location.href)
      if (pathname === '/login') {
        window.location.replace('/')
      } else {
        window.location.reload()
      }
    } catch (e) {
      api.error({
        message: '登录失败',
        description: '用户名或密码错误！',
        placement: 'topRight'
      })
    }
  }

  return (
    <>
      {contextHolder}
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]}>
          <Input prefix={<i className="iconfont icon-mf-user" />} placeholder="用户名" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
          <Input.Password prefix={<i className="iconfont icon-mf-password" />} placeholder="密码" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录
          </Button>
        </Form.Item>
      </Form>
      <Alert type="info" description="默认登陆凭证: admin/admin123" />
    </>
  )
}

function Footer() {
  return (
    <>
      <div className="footer">
        <WaveSvg></WaveSvg>
      </div>
    </>
  )
}
