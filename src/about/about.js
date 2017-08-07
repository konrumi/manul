import React, {Component} from 'react';

import {Layout} from 'antd';

const {Content} = Layout;

class About extends Component {
    render() {
        return (
            <Content style={{background: '#fff', padding: 24, margin: 0, minHeight: 280}}>
                <div>
                    about page: {this.props.match.params.number}
                </div>
            </Content>
        );
    }
}

export default About;
