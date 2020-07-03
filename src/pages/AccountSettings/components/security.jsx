import { FormattedMessage, formatMessage,connect } from 'umi';
import React, { Component } from 'react';
import { List } from 'antd';

const passwordStrength = {
  strong: (
    <span className="strong">
      <FormattedMessage id="accountsettings.security.strong" defaultMessage="Strong" />
    </span>
  ),
  medium: (
    <span className="medium">
      <FormattedMessage id="accountsettings.security.medium" defaultMessage="Medium" />
    </span>
  ),
  weak: (
    <span className="weak">
      <FormattedMessage id="accountsettings.security.weak" defaultMessage="Weak" />
    </span>
  ),
};

class SecurityView extends Component {
  getData = (currentUser) => [
    {
      title: formatMessage(
        {
          id: 'accountsettings.security.password',
        },
        {},
      ),
      description: (
        <>
          {formatMessage({
            id: 'accountsettings.security.password-description',
          })}
          {passwordStrength.weak}
        </>
      ),
      actions: [
        <a key="Modify">
          <FormattedMessage id="accountsettings.security.modify" defaultMessage="Modify" />
        </a>,
      ],
    },
    {
      title: formatMessage(
        {
          id: 'accountsettings.security.phone',
        },
        {},
      ),
      description: `${formatMessage(
        {
          id: 'accountsettings.security.phone-description',
        },
        {},
      )}${currentUser.mobile}`,
      actions: [
        <a key="Modify">
          <FormattedMessage id="accountsettings.security.modify" defaultMessage="Modify" />
        </a>,
      ],
    },
    {
      title: formatMessage(
        {
          id: 'accountsettings.security.question',
        },
        {},
      ),
      description: formatMessage(
        {
          id: 'accountsettings.security.question-description',
        },
        {},
      ),
      actions: [
        <a key="Set">
          <FormattedMessage id="accountsettings.security.set" defaultMessage="Set" />
        </a>,
      ],
    },
    {
      title: formatMessage(
        {
          id: 'accountsettings.security.email',
        },
        {},
      ),
      description: `${formatMessage(
        {
          id: 'accountsettings.security.email-description',
        },
        {},
      )}${currentUser.email}`,
      actions: [
        <a key="Modify">
          <FormattedMessage id="accountsettings.security.modify" defaultMessage="Modify" />
        </a>,
      ],
    },
    {
      title: formatMessage(
        {
          id: 'accountsettings.security.mfa',
        },
        {},
      ),
      description: formatMessage(
        {
          id: 'accountsettings.security.mfa-description',
        },
        {},
      ),
      actions: [
        <a key="bind">
          <FormattedMessage id="accountsettings.security.bind" defaultMessage="Bind" />
        </a>,
      ],
    },
  ];

  render() {
    const { currentUser } = this.props;
    const data = this.getData(currentUser);
    return (
      <>
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={item => (
            <List.Item actions={item.actions}>
              <List.Item.Meta title={item.title} description={item.description} />
            </List.Item>
          )}
        />
      </>
    );
  }
}

// export default SecurityView;

export default connect(({ accountSettings }) => ({
  currentUser: accountSettings.currentUser,
}))(SecurityView);
