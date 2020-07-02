import React, { useEffect } from 'react';
import { Button, Card, Col, Form, List, Row, Select, Tag, Avatar, Radio, BackTop } from 'antd';
import {
  LoadingOutlined,
  StarOutlined,
  LikeOutlined,
  MessageOutlined,
  LikeTwoTone,
} from '@ant-design/icons';
import { connect } from 'umi';
import moment from 'moment';
import ArticleListContent from './components/ArticleListContent';
import StandardFormRow from './components/StandardFormRow';
import TagSelect from './components/TagSelect';
import styles from './style.less';

const { Option } = Select;
const FormItem = Form.Item;
const pageSize = 10;
const dataType = 'all';

const ListSearchArticles = ({ dispatch, listSearchArticles: { list, current }, loading }) => {
  const [form] = Form.useForm();
  useEffect(() => {
    dispatch({
      type: 'listSearchArticles/fetch',
      payload: {
        limit: pageSize,
        page: 1,
        filt: dataType,
      },
    });
  }, []);

  const setOwner = () => {
    form.setFieldsValue({
      owner: ['wzj'],
    });
  };

  const fetchMore = () => {
    dispatch({
      type: 'listSearchArticles/appendFetch',
      payload: {
        limit: pageSize,
        page: current,
        filt: dataType,
      },
    });
  };
  const doPraise = (idx) => {
    dispatch({
      type: 'listSearchArticles/doPraise',
      payload: {
        list,
        idx,
        current
      },
    });
  };

  const owners = [
    {
      id: 'wzj',
      name: '我自己',
    },
    {
      id: 'wjh',
      name: '吴家豪',
    },
    {
      id: 'zxx',
      name: '周星星',
    },
    {
      id: 'zly',
      name: '赵丽颖',
    },
    {
      id: 'ym',
      name: '姚明',
    },
  ];

  const IconText = ({ type, text }) => {
    switch (type) {
      case 'star-o':
        return (
          <span>
            <StarOutlined
              style={{
                marginRight: 8,
              }}
            />
            {text}
          </span>
        );
      case 'message':
        return (
          <span>
            <MessageOutlined
              style={{
                marginRight: 8,
              }}
            />
            {text}
          </span>
        );

      default:
        return null;
    }
  };

  const IconPraise = ({ text, value, index }) => {
        return value === 1 ? (
          <span style={{ color: '#FF5722' }} onClick={() => doPraise(index)}>
            <LikeTwoTone
              twoToneColor="#FF5722"
              style={{
                marginRight: 8,
              }}
            />
            {text}
          </span>
        ) : (
          <span onClick={() => doPraise(index)}>
            <LikeOutlined
              style={{
                marginRight: 8,
              }}
            />
            {text}
          </span>
        );
  };

  const formItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 24,
      },
      md: {
        span: 12,
      },
    },
  };
  const loadMore = list.length > 0 && (
    <div
      style={{
        textAlign: 'center',
        marginTop: 16,
      }}
    >
      <Button
        onClick={fetchMore}
        style={{
          paddingLeft: 48,
          paddingRight: 48,
        }}
      >
        {loading ? (
          <span>
            <LoadingOutlined /> 加载中...
          </span>
        ) : (
          '加载更多'
        )}
      </Button>
    </div>
  );

  return (
    <>
      <BackTop />

      <Card bordered={false}>
        <Form
          layout="inline"
          form={form}
          initialValues={{
            owner: ['wjh', 'zxx'],
          }}
          onValuesChange={(e) => {
            // dataType = e.category;
            dispatch({
              type: 'listSearchArticles/fetch',
              payload: {
                limit: pageSize,
                page: 1,
                filt: e.category,
              },
            });
          }}
        >
          <StandardFormRow
            title="所属类目"
            block
            style={{
              paddingBottom: 11,
            }}
          >
            <FormItem name="category">
              <Radio.Group defaultValue="all" buttonStyle="solid">
                <Radio.Button value="all">所有</Radio.Button>
                <Radio.Button value="friend">好友</Radio.Button>
                <Radio.Button value="mime">我的</Radio.Button>
                <Radio.Button value="myPraise">我点赞的</Radio.Button>
                <Radio.Button value="myComment">我评论的</Radio.Button>
              </Radio.Group>
            </FormItem>
          </StandardFormRow>
          {/* <StandardFormRow title="owner" grid>
            <FormItem name="owner" noStyle>
              <Select mode="multiple" placeholder="选择 owner">
                {owners.map(owner => (
                  <Option key={owner.id} value={owner.id}>
                    {owner.name}
                  </Option>
                ))}
              </Select>
            </FormItem>
            <a className={styles.selfTrigger} onClick={setOwner}>
              只看自己的
            </a>
          </StandardFormRow>
          <StandardFormRow title="其它选项" grid last>
            <Row gutter={16}>
              <Col xl={8} lg={10} md={12} sm={24} xs={24}>
                <FormItem {...formItemLayout} label="活跃用户" name="user">
                  <Select
                    placeholder="不限"
                    style={{
                      maxWidth: 200,
                      width: '100%',
                    }}
                  >
                    <Option value="lisa">李三</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col xl={8} lg={10} md={12} sm={24} xs={24}>
                <FormItem {...formItemLayout} label="好评度" name="rate">
                  <Select
                    placeholder="不限"
                    style={{
                      maxWidth: 200,
                      width: '100%',
                    }}
                  >
                    <Option value="good">优秀</Option>
                  </Select>
                </FormItem>
              </Col>
            </Row>
          </StandardFormRow> */}
        </Form>
      </Card>
      <Card
        style={{
          marginTop: 24,
        }}
        bordered={false}
        bodyStyle={{
          padding: '8px 32px 32px 32px',
        }}
      >
        <List
          size="large"
          loading={list.length === 0 ? loading : false}
          rowKey="id"
          itemLayout="vertical"
          loadMore={loadMore}
          dataSource={list}
          renderItem={(item,index) => (
            <List.Item
              key={item.id}
              actions={[
                <IconText key="star" type="star-o" text={item.star} />,
                <IconText key="message" type="message" text={item.comment} />,
                <IconPraise key="like" text={item.praise} value={item.is_praise} index = {index}/>,
              ]}
              // extra={<div className={styles.listItemExtra} />}
            >
              <List.Item.Meta
                avatar={<Avatar src={item.headimg} size={50} />}
                title={
                  <div className={styles.listUserInfo}>
                    <a className={styles.listItemMetaTitle} href={item.href}>
                      {item.nickname}
                    </a>
                    <em>{moment(item.add_time_int * 1000).format('YYYY-MM-DD HH:mm')}</em>
                  </div>
                }
                description={
                  <span>
                    <Tag color="blue" visible={item.direct_editingAuth === 1}>
                      小编认证
                    </Tag>
                    <Tag color="orange" visible={item.salerAuth === 1}>
                      企业认证
                    </Tag>
                  </span>
                }
              />
              <ArticleListContent data={item} />
            </List.Item>
          )}
        />
      </Card>
    </>
  );
};

export default connect(({ listSearchArticles, loading }) => ({
  listSearchArticles,
  loading: loading.models.listSearchArticles,
}))(ListSearchArticles);
