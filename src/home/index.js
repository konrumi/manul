import React, {Component} from 'react';
import './index.less';

import {Layout} from 'antd';

const {Content} = Layout;

class Index extends Component {
    render() {
        return (
            <Content style={{background: '#fff', padding: 24, margin: 0, minHeight: 280}}>
                <div>
                    layout
                </div>
            </Content>
        );
    }
}

export default Index;
