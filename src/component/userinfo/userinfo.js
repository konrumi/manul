import React, {Component} from 'react';
import {Link} from 'react-router-dom'

import {Menu, Dropdown, Icon} from 'antd';

const menu = (
    <Menu>
        <Menu.Item>
            <Link to="/config/authority/"><Icon type="lock" /> 用户权限</Link>
        </Menu.Item>
        <Menu.Item>
            <a href="/"><Icon type="logout" /> 退出登录</a>
        </Menu.Item>
    </Menu>
);

function getTalk() {
    let currentHour = (new Date()).getHours(),
        text        = '';

    if (currentHour > 6 && currentHour <= 9) {
        text = '新一天又开始了喵！';
    } else if (currentHour > 9 && currentHour <= 12) {
        text = '是不是已经饿了喵？';
    } else if (currentHour > 12 && currentHour <= 18) {
        text = '有睡午觉吗喵？';
    } else if (currentHour > 18 && currentHour <= 24) {
        text = '有准时下班吗喵？';
    } else {
        text = '再不睡要起不来了喵！';
    }

    return text;
}

class Userinfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: this.props.username
        };
    }

    render() {
        if (this.state.username !== '') {
            // login user
            return (
                <div className="page-userinfo">
                    <Dropdown overlay={menu} placement="bottomCenter">
                        <a className="ant-dropdown-link page-username">
                            <Icon type="user" /> {this.state.username}
                        </a>
                    </Dropdown>
                    <span>，
                        {getTalk()}
                    </span>
                </div>
            );
        } else {
            // guest user
            return (
                <div className="page-userinfo">
                    <Link to="/login/" className="page-username"><Icon type="user" /> 登录</Link>
                </div>
            );
        }

    }
}

export default Userinfo;
