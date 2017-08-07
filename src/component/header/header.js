import React, {Component} from 'react';
import {Link} from 'react-router-dom'

import {Layout, Menu, Row, Col} from 'antd';

import Userinfo from '../userinfo/userinfo';

const {Header} = Layout;

class CHeaderMenu extends Component {
    render() {
        return (
            <Menu
                theme="dark"
                mode="horizontal"
                selectedKeys={(() => {
                    return (this.props.selectedKey === '/about/') ? [this.props.selectedKey] : ['/']
                })()}
                style={{lineHeight: '64px'}}
            >
                <Menu.Item key="/"><Link to="/">控制台</Link></Menu.Item>
                <Menu.Item key="/about/"><Link to="/about/">关于</Link></Menu.Item>
            </Menu>
        );
    }
}

class CHeader extends Component {
    render() {
        return (
            <Header className="page-header">
                <Row>
                    <Col span={3}>
                        <div className="page-brand">猫盟·带豹回家CMS</div>
                    </Col>
                    <Col span={18}>
                        <CHeaderMenu selectedKey={this.props.selectedKey} />
                    </Col>
                    <Col span={3}>
                        <Userinfo username={this.props.username} />
                    </Col>
                </Row>
            </Header>
        );
    }
}

export default CHeader;
