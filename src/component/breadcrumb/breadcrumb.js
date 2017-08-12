import React, {Component} from 'react';
import {Link} from 'react-router-dom'

import {Breadcrumb} from 'antd';

class CBreadcrumb extends Component {
    get routeMap() {
        let resultRouteMap = {};

        let processRoute = (routeList) => {
            routeList.forEach((route) => {
                resultRouteMap[route.key] = {
                    name: route.name,
                    link: (route.sub.length === 0)
                };
                if (route.sub.length > 0) {
                    processRoute(route.sub);
                }
            });
        };

        processRoute(this.props.routerData);

        return resultRouteMap;
    }

    render() {
        const pathSnippets = this.props.routerLocation.pathname.split('/').filter(i => i);
        const extraBreadcrumbItems = pathSnippets.map((_, index) => {
            const url = `/${pathSnippets.slice(0, index + 1).join('/')}/`;
            if (typeof this.routeMap[url] !== 'undefined') {
                return (
                    <Breadcrumb.Item key={url}>
                        {
                            (() => {
                                if (this.routeMap[url].link) {
                                    return (
                                        <Link to={url}>
                                            {this.routeMap[url].name}
                                        </Link>
                                    );
                                } else {
                                    return (
                                        <span>{this.routeMap[url].name}</span>
                                    )
                                }
                            })()
                        }
                    </Breadcrumb.Item>
                );
            } else {
                return '';
            }
        });

        let breadcrumbItems = [];
        switch (pathSnippets[0]) {
            case 'about' :
                breadcrumbItems.push(
                    <Breadcrumb.Item key="about">
                        <span>关于</span>
                    </Breadcrumb.Item>
                );
                break;

            case 'login' :
                breadcrumbItems.push(
                    <Breadcrumb.Item key="login">
                        <span>登录</span>
                    </Breadcrumb.Item>
                );
                break;

            default :
                breadcrumbItems.push(
                    <Breadcrumb.Item key="home">
                        <span>控制台：</span>
                        <Link to="/">首页</Link>
                    </Breadcrumb.Item>
                );
                breadcrumbItems = breadcrumbItems.concat(extraBreadcrumbItems);
                break;
        }

        return (
            <Breadcrumb className="page-breadcrumb">
                {breadcrumbItems}
            </Breadcrumb>
        );
    }
}

export default CBreadcrumb;
