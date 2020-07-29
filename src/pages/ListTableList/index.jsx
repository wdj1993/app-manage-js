import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown, Menu, message, Input } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import { queryRule, updateRule, addRule, removeRule } from './service';
import PlatformTag from './components/PlatformTag';
/**
 * 添加节点
 * @param fields
 */

const handleAdd = async (fields) => {
  const hide = message.loading('正在添加');

  try {
    await addRule({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};
/**
 * 更新节点
 * @param fields
 */

const handleUpdate = async (fields) => {
  const hide = message.loading('正在配置');

  try {
    await updateRule({
      name: fields.name,
      desc: fields.desc,
      key: fields.key,
    });
    hide();
    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};
/**
 *  删除节点
 * @param selectedRows
 */

const handleRemove = async (selectedRows) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;

  try {
    await removeRule({
      key: selectedRows.map((row) => row.key),
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const TableList = () => {
  const [createModalVisible, handleModalVisible] = useState(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef();
  const columns = [
    {
      title: '平台',
      align: 'center',
      dataIndex: 'platform',
      hideInForm: true,
      render: (text) => {
        return  (
        <PlatformTag platform = {text} />
      )
    },
      // valueEnum: {
      //   1: {
      //     text: '抖音',
      //   },
      //   2: {
      //     text: '微博',
      //   },
      //   3: {
      //     text: '微信',
      //   },
      //   4: {
      //     text: '快手',
      //   },
      //   5: {
      //     text: '今日头条',
      //   },
      //   6: {
      //     text: '西瓜视频',
      //   },
      //   7: {
      //     text: '火山小视频',
      //   },
      //   8: {
      //     text: '腾讯微视',
      //   },
      //   9: {
      //     text: '斗鱼',
      //   },
      //   10: {
      //     text: '虎牙',
      //   },
      //   11: {
      //     text: '小红书',
      //   },
      // },
    },
    {
      title: '昵称',
      dataIndex: 'account_name',
      valueType: 'textarea',
      align: 'center'
    },
    {
      title: '账号ID',
      dataIndex: 'account_id',
      valueType: 'textarea',
      responsive: ['md'],
      render: (text) => (
        <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>{text}</div>
      ),
    },
    {
      title: '单价',
      dataIndex: 'expect_price',
      valueType: 'textarea',
      align: 'center',
      renderText: (val) => `${val} 元`,
    },
    {
      title: '频率',
      dataIndex: 'usage_rate_str',
      valueType: 'textarea',
      align: 'center',
      responsive: ['md'],
    },
    {
      title: '粉丝数',
      dataIndex: 'fans_num',
      sorter: true,
      hideInForm: true,
      align: 'center',
      responsive: ['md'],
    },
    {
      title: '作品数',
      dataIndex: 'issues_num',
      sorter: true,
      hideInForm: true,
      align: 'center',
      responsive: ['md'],
    },
    {
      title: '添加时间',
      dataIndex: 'created_at',
      hideInForm: true,
      align: 'center',
      responsive: ['lg'],
      renderFormItem: (item, { defaultRender, ...rest }, form) => {
        const status = form.getFieldValue('status');

        if (`${status}` === '0') {
          return false;
        }

        if (`${status}` === '3') {
          return <Input {...rest} placeholder="请输入异常原因！" />;
        }

        return defaultRender(item);
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      fixed: 'right',
      align: 'center',
      ellipse: true,
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              handleUpdateModalVisible(true);
              setStepFormValues(record);
            }}
          >
            编辑
          </a>
          <Divider type="vertical" />
          <a
            onClick={() => {
              handleUpdateModalVisible(true);
              setStepFormValues(record);
            }}
          >
            删除
          </a>
        </>
      ),
    },
  ];
  return (
    <PageHeaderWrapper>
      <ProTable
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="id"
        bordered
        toolBarRender={(action, { selectedRows }) => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> 新建
          </Button>,
          selectedRows && selectedRows.length > 0 && (
            <Dropdown
              overlay={
                <Menu
                  onClick={async (e) => {
                    if (e.key === 'remove') {
                      await handleRemove(selectedRows);
                      action.reload();
                    }
                  }}
                  selectedKeys={[]}
                >
                  <Menu.Item key="remove">批量删除</Menu.Item>
                </Menu>
              }
            >
              <Button>
                批量操作 <DownOutlined />
              </Button>
            </Dropdown>
          ),
        ]}
        tableAlertRender={({ selectedRowKeys, selectedRows }) => (
          <div>
            已选择{' '}
            <a
              style={{
                fontWeight: 600,
              }}
            >
              {selectedRowKeys.length}
            </a>{' '}
            项&nbsp;&nbsp;
            {/* <span>
              服务调用次数总计 {selectedRows.reduce((pre, item) => pre + item.callNo, 0)} 万
            </span> */}
          </div>
        )}
        request={(params, sorter, filter) => queryRule({ ...params, sorter, filter })}
        columns={columns}
        // scroll={{ y: 800 }}
        rowSelection={{}}
      />
      <CreateForm onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible}>
        <ProTable
          onSubmit={async (value) => {
            const success = await handleAdd(value);

            if (success) {
              handleModalVisible(false);

              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          rowKey="id"
          type="form"
          columns={columns}
          rowSelection={{}}
        />
      </CreateForm>
      {stepFormValues && Object.keys(stepFormValues).length ? (
        <UpdateForm
          onSubmit={async (value) => {
            const success = await handleUpdate(value);

            if (success) {
              handleUpdateModalVisible(false);
              setStepFormValues({});

              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setStepFormValues({});
          }}
          updateModalVisible={updateModalVisible}
          // values={stepFormValues}
        />
      ) : null}
    </PageHeaderWrapper>
  );
};

export default TableList;
