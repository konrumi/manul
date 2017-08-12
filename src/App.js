import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    withRouter
} from 'react-router-dom'

import {observable} from 'mobx';
import {observer} from 'mobx-react';

import request from 'superagent';
import {
    Layout,
    BackTop
} from 'antd';

import CHeader from './component/header/header';
import CMenu from './component/menu/menu';
import CBreadcrumb from './component/breadcrumb/breadcrumb';
import CFooter from './component/footer/footer';

import Index from './home/index';
import _400 from './error/400';
import About from './about/about';

import ArticleList from './management/article/list';

import registerServiceWorker from './registerServiceWorker';

import './App.less';

const {Content, Sider} = Layout;

/*
* App Params
*/
class AppRouter {
    @observable routerData = [];
}

let appRouterStore = new AppRouter();

request.get('/')
    .query({})
    .end(function(err, res) {
        appRouterStore.routerData = [
            {
                key: '/',
                name: '首页',
                icon: 'home',
                sub: []
            },
            {
                key: '/management/',
                name: '内容管理',
                icon: 'appstore',
                sub: [
                    {
                        key: '/management/article/',
                        name: '文章管理',
                        icon: 'file-text',
                        sub: []
                    },
                    {
                        key: '/management/image/',
                        name: '图片管理',
                        icon: 'picture',
                        sub: []
                    },
                    {
                        key: '/management/resource/',
                        name: '资源管理',
                        icon: 'cloud-download-o',
                        sub: []
                    }
                ]
            },
            {
                key: '/config/',
                name: '网站配置',
                icon: 'setting',
                sub: [
                    {
                        key: '/config/pages/',
                        name: '页面配置',
                        icon: 'laptop',
                        sub: []
                    },
                    {
                        key: '/config/language/',
                        name: '语言配置',
                        icon: 'global',
                        sub: []
                    },
                    {
                        key: '/config/authority/',
                        name: '权限配置',
                        icon: 'lock',
                        sub: []
                    }
                ]
            },
            {
                key: '/analysis/',
                name: '日志解析',
                icon: 'code-o',
                sub: []
            }
        ]
    });

/*
* App Entry
*/

@observer
class Main extends Component {
    render() {
        return (
            <Layout>
                <CHeader selectedKey={this.props.location.pathname} username="miaouser" />
                <Layout className="page-main">
                    <Sider className="page-sider">
                        <CMenu selectedKey={this.props.location.pathname} routerData={appRouterStore.routerData} />
                    </Sider>
                    <Layout>
                        <Content style={{padding: 24, margin: 0, minHeight: 280}}>
                            <CBreadcrumb routerLocation={this.props.location} routerData={appRouterStore.routerData} />
                            <Switch>
                                <Route exact path='/' component={Index} />
                                <Route path='/about/:number' component={About} />
                                <Route path='/about/' component={About} />

                                <Route path='/management/article/' component={ArticleList} />

                                <Route path='/' component={_400} />
                            </Switch>
                        </Content>
                    </Layout>
                </Layout>
                <CFooter />
                <BackTop />
            </Layout>
        );
    }
}

const App = withRouter((props) => {
    return <Main location={props.location} />;
});

/*
* DOM render
*/
ReactDOM.render((
    <Router>
        <App />
    </Router>
), document.getElementById('root'));

registerServiceWorker();
