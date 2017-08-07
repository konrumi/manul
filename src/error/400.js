import React, {Component} from 'react';

import {Layout, Icon} from 'antd';

const {Content} = Layout;

class About extends Component {
    render() {
        return (
            <Content style={{background: '#fff', padding: 24, margin: 0, minHeight: 280}}>
                <h1>
                    <Icon type="frown" /> 模块未找到。
                </h1>
            </Content>
        );
    }
}

export default About;
