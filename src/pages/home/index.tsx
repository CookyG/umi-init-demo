import React, { useState, useEffect } from 'react';
import { useLocation, history } from 'umi';

import { Menu } from 'antd';

import './home.scss';

function menuBind() {
  const _route = useLocation();
  const [current, setCurrent] = useState('');
  const menuItem = '';

  const menuChange = (_params: {}) => {
    console.log(_params);
  };

  useEffect(() => {
    const { pathname } = _route;
    setCurrent(pathname);
  }, []);

  const menuDom = (
    <Menu onClick={menuChange} selectedKeys={[current]} mode="horizontal">
      <Menu.Item key="/home/list">项目登记</Menu.Item>
      <Menu.Item key="2">成本登记</Menu.Item>
      <Menu.Item key="3">收支登记</Menu.Item>
    </Menu>
  );

  return { setCurrent, menuDom };
}

export default (props: any) => {
  const { setCurrent, menuDom } = menuBind();

  return (
    <div className="home">
      <div className="home-header">
        <div className="home-header__title">名称</div>
        <div className="home-nav">{menuDom}</div>
        <div className="home-btn"></div>
      </div>
      <div className="home-body">{props.children}</div>
    </div>
  );
};
