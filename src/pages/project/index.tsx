import React, { useState, useEffect, createContext } from 'react';

import Login from '@/api/Login/index';
const { GetType, GetProjectStatus } = Login;

import { Input, DatePicker, Select, Button, Pagination } from 'antd';
const { Option } = Select;
const { RangePicker } = DatePicker;

// import base hook
import {
  inputBind,
  dateBind,
  propagationBind,
} from '@/components/searchHooks/antEasyHook';

import TableList from './table/index';

function typeBind(initValue: any) {
  const [typeValue, setTypeValue] = useState(initValue);
  const [typeOptions, setTypeOptionsDom] = useState<any>();

  const typeChange = (value: string) => {
    setTypeValue(value);
  };

  async function GetTypeData(_params?: any) {
    const params = _params || {
      TypeClassification: 'project',
    };
    const _data: any = await GetType(params);
    const { result, data } = _data;
    let _option = null;
    if (result == 1) {
      if (data && data.length > 0) {
        _option = data.map((item: any) => {
          return (
            <Option key={item.value} value={item.value}>
              {item.text}
            </Option>
          );
        });
      }
    }
    setTypeOptionsDom(_option);
  }

  const typeDom = (
    <Select
      className="control"
      placeholder="项目类型"
      value={typeValue}
      onChange={typeChange}
    >
      {typeOptions}
    </Select>
  );

  return { typeValue, typeDom, setTypeValue, GetTypeData };
}

function statusBind(initValue: any) {
  const [status, setStatus] = useState(initValue);
  const [options, setOptions] = useState<any>();

  const onChange = (value: string) => {
    setStatus(value);
  };

  async function getStatusData() {
    const _data: any = await GetProjectStatus();
    const { result, data } = _data;
    let _option = null;
    if (result == 1) {
      if (data && data.length > 0) {
        _option = data.map((item: any) => {
          return (
            <Option key={item.value} value={item.value}>
              {item.text}
            </Option>
          );
        });
      }
    }
    setOptions(_option);
  }

  const statusDom = (
    <Select
      className="control"
      placeholder="项目状态"
      value={status}
      onChange={onChange}
    >
      {options}
    </Select>
  );

  return { status, statusDom, setStatus, getStatusData };
}

export const TableContext = createContext('');

const Project = () => {
  const nameProps = inputBind('');

  const userProps = inputBind('');

  const dateProps = dateBind([]);

  const propagationProps = propagationBind(1);

  const { typeValue, typeDom, setTypeValue, GetTypeData } = typeBind(undefined);

  const { status, statusDom, setStatus, getStatusData } = statusBind(undefined);

  const [resetFlag, setResetFlag] = useState(false);

  const searchInitParams: any = {
    typeValue: '',
    status: '',
    name: '',
    user: '',
    date: [],
  };
  const [searchParams, setSearchParams] = useState(searchInitParams);

  useEffect(() => {
    async function fetchData() {
      await GetTypeData();
      await getStatusData();
    }
    fetchData();
  }, []);

  function resetData() {
    setTypeValue(undefined);
    setStatus(undefined);
    nameProps.setValue('');
    userProps.setValue('');
    dateProps.setValue([]);
    dateProps.setformatValue([]);
    setResetFlag(true);
  }

  useEffect(() => {
    if (resetFlag) {
      search();
    }
  }, [resetFlag]);

  useEffect(() => {
    setTypeValue(searchParams.typeValue);
    setStatus(searchParams.status);
    nameProps.setValue(searchParams.name);
    userProps.setValue(searchParams.user);
    dateProps.setValue(searchParams.date);
    setResetFlag(true);
  }, [propagationProps.value]);

  function search() {
    const params = {
      typeValue: typeValue,
      status: status,
      name: nameProps.value,
      user: userProps.value,
      date: dateProps.value,
    };
    setSearchParams(params);
    setResetFlag(false);
  }

  return (
    <>
      <div className="home-body__inner">
        <div className="home-body__header">
          <div className="home-body__header__left">
            <div className="home-body__row">
              <div className="home-body__label">
                <span>名称</span>
              </div>
              <div className="home-body__control">
                <Input
                  placeholder="请输入"
                  value={nameProps.value}
                  onChange={nameProps.onChange}
                ></Input>
              </div>
            </div>
            <div className="home-body__row">
              <div className="home-body__label">
                <span>客户</span>
              </div>
              <div className="home-body__control">
                <Input
                  placeholder="请输入"
                  value={userProps.value}
                  onChange={userProps.onChange}
                ></Input>
              </div>
            </div>
            <div className="home-body__row">
              <div className="home-body__label">
                <span>签约时间</span>
              </div>
              <div className="home-body__control">
                <RangePicker
                  value={dateProps.value}
                  onChange={dateProps.onChange}
                />
              </div>
            </div>
            <div className="home-body__row">
              <div className="home-body__label"></div>
              <div className="home-body__control">{typeDom}</div>
            </div>
            <div className="home-body__row">
              <div className="home-body__label"></div>
              <div className="home-body__control">{statusDom}</div>
            </div>
          </div>
          <div className="home-body__header__right">
            <div className="home-body__row">
              <Button type="primary" ghost onClick={search}>
                查询
              </Button>
            </div>
            <div className="home-body__row">
              <Button type="primary" ghost onClick={resetData}>
                重置
              </Button>
            </div>
            <div className="home-body__row">
              <Button type="primary" ghost>
                导出
              </Button>
            </div>
          </div>
        </div>
        <div className="home-table">
          <TableContext.Provider value={nameProps.value}>
            <TableList userValue={userProps.value}></TableList>
          </TableContext.Provider>
          <Pagination
            total={85}
            showSizeChanger
            showQuickJumper
            showTotal={(total) => `共 ${total} 条`}
            current={propagationProps.value}
            onChange={propagationProps.onChange}
          />
        </div>
      </div>
    </>
  );
};

export default Project;
