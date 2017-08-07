import React, {Component} from 'react';

import {Layout, Icon} from 'antd';

const {Footer} = Layout;

class CFooter extends Component {
    render() {
        return (
            <Footer className="page-footer">
                <Icon type="code" /> with <Icon type="heart" /> by CFCA-Dev-Team. © 2017-{(new Date()).getFullYear()} .
            </Footer>
        );
    }
}

export default CFooter;
