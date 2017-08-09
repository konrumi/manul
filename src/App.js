import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link,
    withRouter
} from 'react-router-dom'

import {observable, computed} from 'mobx';

import request from 'superagent';
import {
    Layout,
    Breadcrumb,
    BackTop
} from 'antd';

import CHeader from './component/header/header';
import CMenu from './component/menu/menu';
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
class SiderRouter {
    @observable data = [];

    @computed
    get routeTitle() {
        let resultRouteTitle = {};

        let processRoute = function(routeList) {
            routeList.forEach((route) => {
                resultRouteTitle[route.key] = route.name;
                if (route.sub.length > 0) {
                    processRoute(route.sub);
                }
            });
        };

        processRoute(this.data);

        console.log(resultRouteTitle);

        return resultRouteTitle;
    }
}

let pageRouter = new SiderRouter();

request.get('/')
    .query({})
    .end(function(err, res) {
        pageRouter.data = [
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
const App = withRouter((props) => {
    const {location} = props;
    const pathSnippets = location.pathname.split('/').filter(i => i);
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}/`;
        return (
            <Breadcrumb.Item key={url}>
                <Link to={url}>
                    {pageRouter.routeTitle[url]}
                </Link>
            </Breadcrumb.Item>
        );
    });

    const breadcrumbItems = [(
        <Breadcrumb.Item key="home">
            <span>控制台：</span>
            <Link to="/">首页</Link>
        </Breadcrumb.Item>
    )].concat(extraBreadcrumbItems);

    console.log(location.pathname);

    return (
        <Layout>
            <CHeader selectedKey={location.pathname} username="" />
            <Layout className="page-main">
                <Sider className="page-sider">
                    <CMenu selectedKey={location.pathname} pageRouter={pageRouter} />
                </Sider>
                <Layout>
                    <Content style={{padding: 24, margin: 0, minHeight: 280}}>
                        <Breadcrumb style={{margin: '12px 0'}}>
                            {breadcrumbItems}
                        </Breadcrumb>
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
