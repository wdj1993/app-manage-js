import React, { useState } from 'react';
import { Form, Button, Input, InputNumber, Modal, Select } from 'antd';

const FormItem = Form.Item;

const { Option } = Select;
const formLayout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 13,
  },
};

const NewForm = (props) => {
  const [form] = Form.useForm();
  const { onSubmit: handleSubmit, onCancel: handlemodalVisible, modalVisible, values } = props;

  const [formVals, setFormVals] = useState({
    id: values.id,
    platform: values.platform,
    account_name: values.account_name,
    account_id: values.account_id,
    expect_price: values.expect_price,
    usage_rate: values.usage_rate,
    fans_num: values.fans_num,
    issues_num: values.issues_num,
  });

  const handleNext = async () => {
    const fieldsValue = await form.validateFields();
    // setFormVals({ ...formVals, ...fieldsValue });
    handleSubmit({ ...formVals, ...fieldsValue });
  };

  const renderContent = () => {
    return (
      <>
        <FormItem name="platform" label="账号平台">
          <Select
            style={{
              width: '100%',
            }}
            placeholder="请选择平台"
          >
            <Option value={1}>抖音</Option>
            <Option value={2}>微博</Option>
            <Option value={3}>微信</Option>
            <Option value={4}>快手</Option>
            <Option value={5}>今日头条</Option>
            <Option value={6}>西瓜视频</Option>
            <Option value={7}>火山小视频</Option>
            <Option value={8}>腾讯微视</Option>
            <Option value={9}>斗鱼</Option>
            <Option value={10}>虎牙</Option>
            <Option value={11}>小红书</Option>
          </Select>
        </FormItem>
        <FormItem name="account_name" label="账号昵称">
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem name="account_id" label="账号ID">
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem name="expect_price" label="单粉价格">
          <InputNumber
            placeholder="请输入"
            style={{
              width: '100%',
            }}
          />
        </FormItem>
        <FormItem name="usage_rate" label="使用频率">
          <Select
            style={{
              width: '100%',
            }}
            placeholder="请选择账号使用频率"
          >
            <Option value={1}>2小时以下</Option>
            <Option value={2}>2-5小时</Option>
            <Option value={3}>5-8小时</Option>
            <Option value={4}>8-11小时</Option>
            <Option value={5}>11-14小时</Option>
            <Option value={6}>14小时以上</Option>
          </Select>
        </FormItem>
        <FormItem name="fans_num" label="粉丝数">
          <InputNumber
            placeholder="请输入"
            style={{
              width: '100%',
            }}
          />
        </FormItem>
        <FormItem name="issues_num" label="作品数">
          <InputNumber
            placeholder="请输入"
            style={{
              width: '100%',
            }}
          />
        </FormItem>
      </>
    );
  };

  const renderFooter = () => {
    return (
      <>
        <Button onClick={() => form.resetFields()}>重置</Button>
        <Button type="primary" onClick={() => handleNext()}>
          提交
        </Button>
      </>
    );
  };

  return (
    <Modal
      width={640}
      bodyStyle={{
        padding: '32px 40px 48px',
      }}
      destroyOnClose
      title="账号编辑"
      visible={modalVisible}
      footer={renderFooter()}
      onCancel={() => handlemodalVisible()}
    >
      <Form
        {...formLayout}
        form={form}
        initialValues={formVals}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default NewForm;
