import React, { useState } from 'react';
import { Form, Button, Input, InputNumber, Modal,  Select, Steps } from 'antd';

const FormItem = Form.Item;
const { Step } = Steps;
const { Option } = Select;
const formLayout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 13,
  },
};

const CreateForm = props => {
  const [formVals, setFormVals] = useState({
    name: props.values.name,
    desc: props.values.desc,
    key: props.values.key,
    target: '0',
    template: '0',
    type: '1',
    time: '',
    frequency: 'month',
  });
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const {
    onSubmit: handleUpdate,
    onCancel: handleUpdateModalVisible,
    updateModalVisible,
    values,
  } = props;

  const forward = () => setCurrentStep(currentStep + 1);

  const backward = () => setCurrentStep(currentStep - 1);

  const handleNext = async () => {
    const fieldsValue = await form.validateFields();
    setFormVals({ ...formVals, ...fieldsValue });

    if (currentStep < 2) {
      forward();
    } else {
      handleUpdate({ ...formVals, ...fieldsValue });
    }
  };

  const renderContent = () => {
    if (currentStep === 1) {
      return (
        <>
          <FormItem name="frequence" label="使用频率">
          <Select
              style={{
                width: '100%',
              }}
              placeholder="请选择账号使用频率"
            >
              <Option value="1">2小时以下</Option>
              <Option value="2">2-5小时</Option>
              <Option value="3">5-8小时</Option>
              <Option value="4">8-11小时</Option>
              <Option value="5">11-14小时</Option>
              <Option value="6">14小时以上</Option>
            </Select>
          </FormItem>
          <FormItem
          name="fans_num"
          label="粉丝数"
        >
          <InputNumber placeholder="请输入" style={{
                width: '100%',
              }} />
        </FormItem>
        <FormItem
          name="issue_num"
          label="作品数"
        >
          <InputNumber placeholder="请输入" style={{
                width: '100%',
              }} />
        </FormItem>
        </>
      );
    }

    if (currentStep === 2) {
      return (
        <>
          <FormItem
            name="expect_price"
            label="单粉价格"
          >
            <Input placeholder="请输入" />
          </FormItem>
        </>
      );
    }

    return (
      <>
        <FormItem name="platform" label="账号平台"
        rules={[
          {
            required: true,
            message: '请选择账户所属平台',
          },
        ]}>
            <Select
              style={{
                width: '100%',
              }}
              placeholder="请选择平台"
            >
              <Option value="1">抖音</Option>
              <Option value="2">微博</Option>
              <Option value="3">微信</Option>
              <Option value="4">快手</Option>
              <Option value="5">今日头条</Option>
              <Option value="6">西瓜视频</Option>
              <Option value="7">火山小视频</Option>
              <Option value="8">腾讯微视</Option>
              <Option value="9">斗鱼</Option>
              <Option value="10">虎牙</Option>
              <Option value="11">小红书</Option>
            </Select>
        </FormItem>
        <FormItem
          name="account_name"
          label="账号昵称"
          rules={[
            {
              required: true,
              message: '请输入账号昵称',
            },
          ]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          name="account_id"
          label="账号ID"
          rules={[
            {
              required: true,
              message: '请输入账号ID',
            },
          ]}
        >
          <Input placeholder="请输入" />
        </FormItem>
      </>
    );
  };

  const renderFooter = () => {
    if (currentStep === 1) {
      return (
        <>
          <Button
            style={{
              float: 'left',
            }}
            onClick={backward}
          >
            上一步
          </Button>
          <Button onClick={() => handleUpdateModalVisible(false, values)}>取消</Button>
          <Button type="primary" onClick={() => handleNext()}>
            下一步
          </Button>
        </>
      );
    }

    if (currentStep === 2) {
      return (
        <>
          <Button
            style={{
              float: 'left',
            }}
            onClick={backward}
          >
            上一步
          </Button>
          <Button onClick={() => handleUpdateModalVisible(false, values)}>取消</Button>
          <Button type="primary" onClick={() => handleNext()}>
            完成
          </Button>
        </>
      );
    }

    return (
      <>
        <Button onClick={() => handleUpdateModalVisible(false, values)}>取消</Button>
        <Button type="primary" onClick={() => handleNext()}>
          下一步
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
      title="规则配置"
      visible={updateModalVisible}
      footer={renderFooter()}
      onCancel={() => handleUpdateModalVisible()}
    >
      <Steps
        style={{
          marginBottom: 28,
        }}
        size="small"
        current={currentStep}
      >
        <Step title="基本资料" />
        <Step title="账号信息" />
        <Step title="价格设置" />
      </Steps>
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          target: formVals.target,
          template: formVals.template,
          type: formVals.type,
          frequency: formVals.frequency,
          name: formVals.name,
          desc: formVals.desc,
        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default CreateForm;
