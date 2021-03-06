import { UploadOutlined } from '@ant-design/icons';
import { Button, Input, Select, Upload, Form, message, DatePicker } from 'antd';
import { connect, FormattedMessage, formatMessage } from 'umi';
import React, { Component } from 'react';
import moment from 'moment';
import GeographicView from './GeographicView';
import styles from './BaseView.less';

const { Option } = Select; // 头像组件 方便以后独立，增加裁剪之类的功能

const AvatarView = ({ avatar }) => (
  <>
    <div className={styles.avatar_title}>
      <FormattedMessage id="accountsettings.basic.avatar" defaultMessage="Avatar" />
    </div>
    <div className={styles.avatar}>
      <img src={avatar} alt="avatar" />
    </div>
    <Upload showUploadList={false}>
      <div className={styles.button_view}>
        <Button>
          <UploadOutlined />
          <FormattedMessage
            id="accountsettings.basic.change-avatar"
            defaultMessage="Change avatar"
          />
        </Button>
      </div>
    </Upload>
  </>
);

const validatorGeographic = (_, value, callback) => {
  const { province, city } = value;

  if (!province.key) {
    callback('Please input your province!');
  }

  if (!city.key) {
    callback('Please input your city!');
  }

  callback();
};

const validatorPhone = (rule, value, callback) => {
  const values = value.split('-');

  if (!values[0]) {
    callback('Please input your area code!');
  }

  if (!values[1]) {
    callback('Please input your phone number!');
  }

  callback();
};

class BaseView extends Component {
  view = undefined;

  getAvatarURL() {
    const { currentUser } = this.props;

    if (currentUser) {
      if (currentUser.headimg) {
        return currentUser.headimg;
      }

      const url = 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png';
      return url;
    }

    return '';
  }

  getBirthday() {
    const { currentUser } = this.props;
    const birthday = moment(1569204512).format("YYYY-MM-DD HH:mm:ss")
    return birthday;
  }

  getPhone() {
    const { currentUser } = this.props;
    console.log(currentUser);
    if (currentUser) {
      if (currentUser.mobile) {
        return currentUser.mobile;
      }
      const mobile = '';
      return mobile;
    }

    return '';
  }

  onChange = (date, dateString) => {
    console.log(date, dateString);
  }

  getViewDom = ref => {
    this.view = ref;
  };

  handleFinish = () => {
    message.success(
      formatMessage({
        id: 'accountsettings.basic.update.success',
      }),
    );
  };

  render() {
    const { currentUser } = this.props;
    return (
      <div className={styles.baseView} ref={this.getViewDom}>
        <div className={styles.left}>
          <Form
            layout="vertical"
            onFinish={this.handleFinish}
            initialValues={currentUser}
            hideRequiredMark
          >
            {/* <Form.Item
              name="email"
              label={formatMessage({
                id: 'accountsettings.basic.email',
              })}
              rules={[
                {
                  required: true,
                  message: formatMessage(
                    {
                      id: 'accountsettings.basic.email-message',
                    },
                    {},
                  ),
                },
              ]}
            >
              <Input />
            </Form.Item> */}
            <Form.Item
              name="nickname"
              label={formatMessage({
                id: 'accountsettings.basic.nickname',
              })}
              rules={[
                {
                  required: true,
                  message: formatMessage(
                    {
                      id: 'accountsettings.basic.nickname-message',
                    },
                    {},
                  ),
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="remark"
              label={formatMessage({
                id: 'accountsettings.basic.profile',
              })}
              rules={[
                {
                  required: true,
                  message: formatMessage(
                    {
                      id: 'accountsettings.basic.profile-message',
                    },
                    {},
                  ),
                },
              ]}
            >
              <Input.TextArea
                placeholder={formatMessage({
                  id: 'accountsettings.basic.profile-placeholder',
                })}
                rows={4}
              />
            </Form.Item>
            <Form.Item
              // name="birthday"
              label={formatMessage({
                id: 'accountsettings.basic.birthday',
              })}              
            >
              <DatePicker onChange={this.onChange} defaultValue={moment(1569204512).format("YYYY-MM-DD HH:mm:ss")} />
            </Form.Item>
            {/* <Form.Item
              name="country"
              label={formatMessage({
                id: 'accountsettings.basic.country',
              })}
              rules={[
                {
                  required: true,
                  message: formatMessage(
                    {
                      id: 'accountsettings.basic.country-message',
                    },
                    {},
                  ),
                },
              ]}
            >
              <Select
                style={{
                  maxWidth: 220,
                }}
              >
                <Option value="China">中国</Option>
              </Select>
            </Form.Item> */}
            <Form.Item
              name="geographic"
              label={formatMessage({
                id: 'accountsettings.basic.geographic',
              })}
              rules={[
                {
                  required: true,
                  message: formatMessage(
                    {
                      id: 'accountsettings.basic.geographic-message',
                    },
                    {},
                  ),
                },
                {
                  validator: validatorGeographic,
                },
              ]}
            >
              <GeographicView />
            </Form.Item>
            {/* <Form.Item
              name="address"
              label={formatMessage({
                id: 'accountsettings.basic.address',
              })}
              rules={[
                {
                  required: true,
                  message: formatMessage(
                    {
                      id: 'accountsettings.basic.address-message',
                    },
                    {},
                  ),
                },
              ]}
            >
              <Input />
            </Form.Item> */}
            <Form.Item
              name="mobile"
              label={formatMessage({
                id: 'accountsettings.basic.phone',
              })}
              rules={[
                {
                  required: true,
                  pattern: /^(?:(?:\+|00)86)?1\d{10}$/,
                  // message: formatMessage(
                  //   {
                  //     id: 'accountsettings.basic.phone-message',
                  //   },
                  //   {
                  //     id: 'accountsettings.basic.phone-validator'
                  //   },
                  // ),
                },
                // {
                //   validator: validatorPhone,
                // },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" type="primary">
                <FormattedMessage
                  id="accountsettings.basic.update"
                  defaultMessage="Update Information"
                />
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className={styles.right}>
          <AvatarView avatar={this.getAvatarURL()} />
        </div>
      </div>
    );
  }
}

export default connect(({ accountSettings }) => ({
  currentUser: accountSettings.currentUser,
}))(BaseView);
