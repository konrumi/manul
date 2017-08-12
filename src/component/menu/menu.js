import React, {Component} from 'react';
import {Link} from 'react-router-dom'

import {Menu, Icon} from 'antd';

const {SubMenu} = Menu;

class CMenu extends Component {
    rednerMenu(data) {
        if (data.sub && data.sub.length) {
            return (
                <SubMenu key={data.key} title={
                    <span>
                    <Icon type={data.icon} />
                    <span>{data.name}</span>
                </span>
                }>
                    {
                        data.sub.map((subdata) => {
                            return this.rednerMenu(subdata);
                        })
                    }
                </SubMenu>
            )
        } else {
            return (
                <Menu.Item key={data.key}>
                    <Link to={data.key || 'miao'}>
                        <Icon type={data.icon} />
                        <span>{data.name}</span>
                    </Link>
                </Menu.Item>
            )
        }
    }

    render() {
        return (
            <Menu
                defaultOpenKeys={(() => (
                    ['/' + this.props.selectedKey.split('/')[1] + '/']
                ))()}
                selectedKeys={[this.props.selectedKey]}
                mode="inline"
                style={{borderRight: 0}}
            >
                {
                    this.props.routerData.map((menuItemData) => {
                        return this.rednerMenu(menuItemData)
                    })
                }
            </Menu>
        );
    }
}

export default CMenu;
