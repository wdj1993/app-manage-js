import { DownOutlined, PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown, Menu, message, Modal, Switch } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';
import CreateForm from './components/CreateForm';
import { queryAccount, updateAccount, addAccount, delAccount, switchMode } from './service';
import PlatformTag from './components/PlatformTag';
import EditForm from './components/EditForm';
import styles from './style.less';

/**
 * 添加账号
 * @param fields
 */

const handleAdd = async (fields) => {
  const hide = message.loading('正在添加');

  try {
    await addAccount({ ...fields });
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
 * 更新账号
 * @param fields
 */

const handleUpdate = async (fields) => {
  const hide = message.loading('提交中');

  try {
    await updateAccount({ ...fields });
    hide();
    message.success('账号修改成功');
    return true;
  } catch (error) {
    hide();
    message.error('账号修改失败请重试！');
    return false;
  }
};
/**
 *  删除账号
 * @param selectedRows
 */
const handleRemove = async (id) => {
  const hide = message.loading('正在删除');

  if (!id) return true;
  try {
    await delAccount({
      id,
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

/**
 *  粉丝模式切换
 * @param type:1-开启 2-关闭
 */
const changeFansMode = async (type) => {
  const hide = message.loading('切换中');
  if (!type) return true;
  try {
    await switchMode({
      type,
    });
    hide();
    message.success(type === 1 ? '粉丝模式已开启' : '粉丝模式已关闭');    
    return true;
  } catch (error) {
    hide();
    message.error('切换失败，请重试');
    return false;
  }
};

const TableList = (props) => {
  console.log(props);
  const [createModalVisible, handleModalVisible] = useState(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const [editFormValues, setEditFormValues] = useState({});
  const [fansMode, setFansMode] = useState(props.currentUser.fans_mode===1);
  const actionRef = useRef();
  const columns = [
    {
      title: '平台',
      align: 'center',
      dataIndex: 'platform',
      render: (_, record) => {
        return <PlatformTag platform={record.platform} />;
      },
      filters: false,
      valueEnum: {
        1: {
          text: '抖音',
        },
        2: {
          text: '微博',
        },
        3: {
          text: '微信',
        },
        4: {
          text: '快手',
        },
        5: {
          text: '今日头条',
        },
        6: {
          text: '西瓜视频',
        },
        7: {
          text: '火山小视频',
        },
        8: {
          text: '腾讯微视',
        },
        9: {
          text: '斗鱼',
        },
        10: {
          text: '虎牙',
        },
        11: {
          text: '小红书',
        },
      },
    },
    {
      title: '昵称',
      dataIndex: 'account_name',
      hideInSearch: true,
      align: 'center',
    },
    {
      title: '账号ID',
      dataIndex: 'account_id',
      hideInSearch: true,
      responsive: ['md'],
      render: (text) => (
        <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>{text}</div>
      ),
    },
    {
      title: '单价',
      dataIndex: 'expect_price',
      align: 'center',
      hideInSearch: true,
      valueType: 'money',
    },
    {
      title: '频率',
      dataIndex: 'usage_rate',
      align: 'center',
      hideInSearch: true,
      filters: false,
      responsive: ['md'],
      valueEnum: {
        1: {
          text: '2小时以下',
        },
        2: {
          text: '2-5小时',
        },
        3: {
          text: '5-8小时',
        },
        4: {
          text: '8-11小时',
        },
        5: {
          text: '11-14小时',
        },
        6: {
          text: '14小时以上',
        },
      },
    },
    {
      title: '粉丝数',
      dataIndex: 'fans_num',
      align: 'center',
      hideInSearch: true,
      valueType: 'digit',
      responsive: ['md'],
    },
    {
      title: '作品数',
      dataIndex: 'issues_num',
      align: 'center',
      valueType: 'digit',
      hideInSearch: true,
      responsive: ['md'],
    },
    {
      title: '添加时间',
      dataIndex: 'created_at',
      hideInForm: true,
      hideInSearch: true,
      align: 'center',
      responsive: ['lg'],
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      fixed: 'right',
      align: 'center',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              setStepFormValues(record);
              handleModalVisible(true);
            }}
          >
            编辑
          </a>
          <Divider type="vertical" />
          <a
            onClick={() => {
              Modal.confirm({
                title: '确定删除该账号吗？',
                content: '账号删除后无法恢复...',
                icon: <ExclamationCircleOutlined />,
                okType: 'danger',
                onOk: async () => {
                  await handleRemove(record.id);
                  if (actionRef.current) {
                    actionRef.current.reload();
                  }
                },
              });
            }}
          >
            删除
          </a>
        </>
      ),
    },
  ];
  const onChange = (e) => {
    const type = e ? 1 : 2;
    Modal.confirm({
      title: e ? '确定开启粉丝模式吗？' : '确定关闭粉丝模式吗？',
      content: e
        ? '切换为粉丝模式后，您的所有账号将成为粉丝账号...'
        : '关闭粉丝模式后，您的账号将无法【领取】新的增粉任务...',
      icon: <ExclamationCircleOutlined />,
      okType: e ? 'default' : 'danger',
      onOk: async () => {
        await changeFansMode(type);
        setFansMode(e);

      },
    });
  };

  const content = (
    <div className={styles.pageHeaderContent}>
      <p>发布或领取增粉任务前须添加对应平台账号，发布任务还必须开启粉丝模式。</p>
      <p>
        当前粉丝模式：
        <Switch checked={fansMode} onChange={onChange} />{' '}
        {fansMode ? '已开启' : '已关闭'}
      </p>
    </div>
  );
  const extraContent = (
    <div className={styles.extraImg}>
      <img
        alt="粉丝账号"
        src="https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png"
      />
    </div>
  );

  return (
    <PageHeaderWrapper content={content} extraContent={extraContent}>
      <ProTable
        // headerTitle={content}
        headerTitle="我的账号"
        actionRef={actionRef}
        rowKey="id"
        bordered
        toolBarRender={(action, { selectedRows }) => [
          <Button type="primary" onClick={() => handleUpdateModalVisible(true)}>
            <PlusOutlined /> 新建
          </Button>,
          selectedRows && selectedRows.length > 0 && (
            <Dropdown
              overlay={
                <Menu
                  onClick={async (e) => {
                    if (e.key === 'removeSelect') {
                      message.error('批量删除');
                      // await handleRemove(selectedRows);
                      action.reload();
                    }
                  }}
                  selectedKeys={[]}
                >
                  <Menu.Item key="removeSelect">批量删除</Menu.Item>
                </Menu>
              }
            >
              <Button>
                批量操作 <DownOutlined />
              </Button>
            </Dropdown>
          ),
        ]}
        tableAlertRender={({ selectedRowKeys }) =>
          selectedRowKeys.length > 0 ? (
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
          ) : (
            false
          )
        }
        request={(params) => queryAccount({ ...params })}
        columns={columns}
        rowSelection={{}}
      />
      {stepFormValues && Object.keys(stepFormValues).length ? (
        <EditForm
          onSubmit={async (value) => {
            const success = await handleUpdate(value);
            if (success) {
              handleModalVisible(false);
              setStepFormValues({});
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleModalVisible(false);
            setStepFormValues({});
          }}
          modalVisible={createModalVisible}
          values={stepFormValues}
        />
      ) : null}
      <CreateForm
        onSubmit={async (value) => {
          const success = await handleAdd(value);

          if (success) {
            handleUpdateModalVisible(false);
            setEditFormValues({});

            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalVisible(false);
          setEditFormValues({});
        }}
        updateModalVisible={updateModalVisible}
        values={editFormValues}
      />
    </PageHeaderWrapper>
  );
};

export default connect(({ user }) => ({
  currentUser: user.currentUser,
}))(TableList);
