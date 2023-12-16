export { Layout }

import React, { useState } from 'react'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TableOutlined,
  FundOutlined,
  FormOutlined
} from '@ant-design/icons'
import { Layout as AntdLayout, Menu, Button, theme, Space } from 'antd'

import './MainLayout.less'
import Logo from '~/assets/images/logo.svg?react'
import { usePageContext } from '~/renderer/usePageContext'

const { Header, Sider, Content } = AntdLayout

function getMenuKeys() {
  const { urlPathname, routeParams = {} } = usePageContext()
  const { view } = routeParams
  const keys = urlPathname.split('/')
  if (!urlPathname.endsWith(view)) {
    keys.push(view)
  }
  return keys.filter((key) => !!key)
}

function Layout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer }
  } = theme.useToken()

  const menuKeys = getMenuKeys()

  return (
    <AntdLayout className="mf-home-layout">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={260}
        style={{ background: colorBgContainer, height: '100vh' }}
      >
        <Space size="middle">
          <div className="logo">
            <Logo></Logo>
          </div>
          <span className="title">Midway Full</span>
        </Space>
        <Menu
          theme="light"
          mode="inline"
          defaultOpenKeys={menuKeys}
          defaultSelectedKeys={menuKeys}
          items={[
            {
              key: 'dashboards',
              icon: <FundOutlined />,
              label: '统计看板',
              children: [
                {
                  key: 'e-commerce',
                  label: (
                    <>
                      <a href="/dashboards/e-commerce">电子商务</a>
                    </>
                  )
                },
                {
                  key: 'sales',
                  label: (
                    <>
                      <a href="/dashboards/sales">销售业绩</a>
                    </>
                  )
                }
              ]
            },
            {
              key: '2',
              icon: <FormOutlined />,
              label: '表单'
            },
            {
              key: '3',
              icon: <TableOutlined />,
              label: '表格'
            }
          ]}
        />
      </Sider>
      <AntdLayout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer
          }}
        >
          {children}
        </Content>
      </AntdLayout>
    </AntdLayout>
  )
}
