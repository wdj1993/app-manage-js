import React ,{useState} from 'react';
import { Modal } from 'antd';

const CreateForm = (props) => {
  const { modalVisible, onCancel } = props;
  const [formVals, setFormVals] = useState({
    platform: props.values.platform,
    account_id: props.values.account_id,
    account_name: props.values.account_name,
    expect_price: props.values.expect_price,
    usage_rate: props.values.usage_rate,
    fans_num: props.values.fans_num,
    issues_num: props.values.issues_num,
  });

  return (
    <Modal
      destroyOnClose
      title="账号编辑"
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      {props.children}
    </Modal>
  );
};

export default CreateForm;
