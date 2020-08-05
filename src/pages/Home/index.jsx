import { Avatar, Card, Col, List, Skeleton, Row, Statistic, Dropdown, Menu, Tag } from 'antd';
import React, { Component, Suspense } from 'react';
import { Link, connect } from 'umi';
import { PageHeaderWrapper, PageLoading } from '@ant-design/pro-layout';
import moment from 'moment';
import {
  EllipsisOutlined,
  LikeTwoTone,
  LikeOutlined,
  StarOutlined,
  MessageOutlined,
} from '@ant-design/icons';
import Radar from './components/Radar';
import EditableLinkGroup from './components/EditableLinkGroup';
import styles from './style.less';
import { getTimeDistance } from './utils/utils';
import ArticleListContent from './components/ArticleListContent';

const IntroduceRow = React.lazy(() => import('./components/IntroduceRow'));
const SalesCard = React.lazy(() => import('./components/SalesCard'));
const TopSearch = React.lazy(() => import('./components/TopSearch'));
const ProportionSales = React.lazy(() => import('./components/ProportionSales'));
const OfflineData = React.lazy(() => import('./components/OfflineData'));

const links = [
  {
    title: '操作一',
    href: '',
  },
  {
    title: '操作二',
    href: '',
  },
  {
    title: '操作三',
    href: '',
  },
  {
    title: '操作四',
    href: '',
  },
  {
    title: '操作五',
    href: '',
  },
  {
    title: '操作六',
    href: '',
  },
];

const PageHeaderContent = ({ currentUser }) => {
  const loading = currentUser && Object.keys(currentUser).length;

  if (!loading) {
    return (
      <Skeleton
        avatar
        paragraph={{
          rows: 1,
        }}
        active
      />
    );
  }

  return (
    <div className={styles.pageHeaderContent}>
      <div className={styles.avatar}>
        <Avatar size="large" src={currentUser.headimg} />
      </div>
      <div className={styles.content}>
        <div className={styles.contentTitle}>
          早安，
          {currentUser.nickname}
          ，祝你开心每一天！
        </div>
        <div>{currentUser.remark}</div>
      </div>
    </div>
  );
};

const ExtraContent = ({ count }) => (
  <div className={styles.extraContent}>
    <div className={styles.statItem}>
      <Statistic title="待完成任务" value={count.assign} />
    </div>
    <div className={styles.statItem}>
      {/* <Statistic title="待分配任务" value={8} suffix="/ 24" /> */}
      <Statistic title="待分配任务" value={count.accept} />
    </div>
    <div className={styles.statItem}>
      <Statistic title="收藏" value={count.collection} />
    </div>
  </div>
);

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
    <span
      style={{ color: '#FF5722' }}
      onClick={() => {
        console.log('点赞');
      }}
    >
      <LikeTwoTone
        twoToneColor="#FF5722"
        style={{
          marginRight: 8,
        }}
      />
      {text}
    </span>
  ) : (
    <span
      onClick={() => {
        console.log('d111');
      }}
    >
      <LikeOutlined
        style={{
          marginRight: 8,
        }}
      />
      {text}
    </span>
  );
};

class Home extends Component {
  state = {
    salesType: 'all',
    currentTabKey: '',
    rangePickerValue: getTimeDistance('year'),
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'home/init',
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'home/clear',
    });
  }

  handleChangeSalesType = (e) => {
    this.setState({
      salesType: e.target.value,
    });
  };

  handleTabChange = (key) => {
    this.setState({
      currentTabKey: key,
    });
  };

  renderActivities = (item, index) => {
    // const events = item.template.split(/@\{([^{}]*)\}/gi).map((key) => {
    //   if (item[key]) {
    //     return (
    //       <a href={item[key].link} key={item[key].name}>
    //         {item[key].name}
    //       </a>
    //     );
    //   }

    //   return key;
    // });
    return (
      <List.Item
        key={item.id}
        actions={[
          <IconText key="star" type="star-o" text={item.star} />,
          <IconText key="message" type="message" text={item.comment} />,
          <IconPraise key="like" text={item.praise} value={item.is_praise} index={index} />,
        ]}
        extra={<div className={styles.listItemExtra} />}
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
      // <List.Item key={item.id}>
      //   <List.Item.Meta
      //     avatar={<Avatar src={item.user.avatar} />}
      //     title={
      //       <span>
      //         <a className={styles.username}>{item.user.name}</a>
      //         &nbsp;
      //         <span className={styles.event}>{events}</span>
      //       </span>
      //     }
      //     description={
      //       <span className={styles.datetime} title={item.updatedAt}>
      //         {moment(item.updatedAt).fromNow()}
      //       </span>
      //     }
      //   />
      // </List.Item>
    );
  };

  render() {
    const { rangePickerValue, salesType, currentTabKey } = this.state;
    const {
      visitData,
      visitData2,
      salesData,
      searchData,
      offlineData,
      offlineChartData,
      salesTypeData,
      salesTypeDataOnline,
      salesTypeDataOffline,
      loading,
      currentUser,
      count,
      activities,
      projectNotice,
      projectLoading,
      activitiesLoading,
      radarData,
    } = this.props;

    let salesPieData;

    if (salesType === 'all') {
      salesPieData = salesTypeData;
    } else {
      salesPieData = salesType === 'online' ? salesTypeDataOnline : salesTypeDataOffline;
    }

    if (!currentUser || !currentUser.id || !count) {
      return null;
    }

    const menu = (
      <Menu>
        <Menu.Item>操作一</Menu.Item>
        <Menu.Item>操作二</Menu.Item>
      </Menu>
    );

    const dropdownGroup = (
      <span className={styles.iconGroup}>
        <Dropdown overlay={menu} placement="bottomRight">
          <EllipsisOutlined />
        </Dropdown>
      </span>
    );

    const activeKey = currentTabKey || (offlineData[0] && offlineData[0].name);
    return (
      <PageHeaderWrapper
        content={<PageHeaderContent currentUser={currentUser} />}
        extraContent={<ExtraContent count={count} />}
      >
        <Suspense fallback={<PageLoading />}>
          <IntroduceRow loading={loading} visitData={visitData} />
        </Suspense>        

        {/* <Suspense fallback={null}>
          <SalesCard
              rangePickerValue={rangePickerValue}
              salesData={salesData}
              isActive={this.isActive}
              handleRangePickerChange={this.handleRangePickerChange}
              loading={loading}
              selectDate={this.selectDate}
            />
        </Suspense> */}
        <Row gutter={24}>
          <Col xl={16} lg={24} md={24} sm={24} xs={24}>
            <Card
              className={styles.projectList}
              style={{
                marginBottom: 24,
              }}
              title="进行中的项目"
              bordered={false}
              extra={<Link to="/">全部项目</Link>}
              loading={projectLoading}
              bodyStyle={{
                padding: 0,
              }}
            >
              {projectNotice.map((item) => (
                <Card.Grid className={styles.projectGrid} key={item.id}>
                  <Card
                    bodyStyle={{
                      padding: 0,
                    }}
                    bordered={false}
                  >
                    <Card.Meta
                      title={
                        <div className={styles.cardTitle}>
                          <Avatar size="small" src={item.logo} />
                          <Link to={item.href}>{item.title}</Link>
                        </div>
                      }
                      description={item.description}
                    />
                    <div className={styles.projectItemContent}>
                      <Link to={item.memberLink}>{item.member || ''}</Link>
                      {item.updatedAt && (
                        <span className={styles.datetime} title={item.updatedAt}>
                          {moment(item.updatedAt).fromNow()}
                        </span>
                      )}
                    </div>
                  </Card>
                </Card.Grid>
              ))}
            </Card>
            {/* <Card
              bodyStyle={{
                padding: 0,
              }}
              bordered={false}
              className={styles.activeCard}
              title="好友动态"
              loading={activitiesLoading}
            >
              <List
                loading={activitiesLoading}
                itemLayout="vertical"
                renderItem={(item, index) => this.renderActivities(item, index)}
                dataSource={activities}
                className={styles.activitiesList}
                size="large"
              />
            </Card> */}
          </Col>
          <Col xl={8} lg={24} md={24} sm={24} xs={24}>
            <Card
              style={{
                marginBottom: 24,
              }}
              title="快速开始 / 便捷导航"
              bordered={false}
              bodyStyle={{
                padding: 0,
              }}
            >
              <EditableLinkGroup onAdd={() => {}} links={links} linkElement={Link} />
            </Card>
            <Card
              style={{
                marginBottom: 24,
              }}
              bordered={false}
              title="XX 指数"
              loading={radarData.length === 0}
            >
              <div className={styles.chart}>
                <Radar hasLegend height={343} data={radarData} />
              </div>
            </Card>
            <Card
              bodyStyle={{
                paddingTop: 12,
                paddingBottom: 12,
              }}
              bordered={false}
              title="团队"
              loading={projectLoading}
            >
              <div className={styles.members}>
                <Row gutter={48}>
                  {projectNotice.map((item) => (
                    <Col span={12} key={`members-item-${item.id}`}>
                      <Link to={item.href}>
                        <Avatar src={item.logo} size="small" />
                        <span className={styles.member}>{item.member}</span>
                      </Link>
                    </Col>
                  ))}
                </Row>
              </div>
            </Card>
          </Col>
        </Row>
        <Row
          gutter={24}
          style={{
            marginTop: 24,
          }}
        >
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Suspense fallback={null}>
              <TopSearch
                loading={loading}
                visitData2={visitData2}
                searchData={searchData}
                dropdownGroup={dropdownGroup}
              />
            </Suspense>
          </Col>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Suspense fallback={null}>
              <ProportionSales
                dropdownGroup={dropdownGroup}
                salesType={salesType}
                loading={loading}
                salesPieData={salesPieData}
                handleChangeSalesType={this.handleChangeSalesType}
              />
            </Suspense>
          </Col>
        </Row>
        <Suspense fallback={null}>
          <OfflineData
            activeKey={activeKey}
            loading={loading}
            offlineData={offlineData}
            offlineChartData={offlineChartData}
            handleTabChange={this.handleTabChange}
          />
        </Suspense>
      </PageHeaderWrapper>
    );
  }
}

export default connect(
  ({
    home: {
      visitData,
      visitData2,
      salesData,
      searchData,
      offlineData,
      offlineChartData,
      salesTypeData,
      salesTypeDataOnline,
      salesTypeDataOffline,
      currentUser,
      count,
      projectNotice,
      activities,
      radarData,
    },
    loading,
  }) => ({
    visitData,
    visitData2,
    salesData,
    searchData,
    offlineData,
    offlineChartData,
    salesTypeData,
    salesTypeDataOnline,
    salesTypeDataOffline,
    currentUser,
    count,
    projectNotice,
    activities,
    radarData,
    loading: loading.effects['dashboardAnalysis/fetch'],
    currentUserLoading: loading.effects['home/fetchUserCurrent'],
    countLoading: loading.effects['home/fetchCount'],
    projectLoading: loading.effects['home/fetchProjectNotice'],
    activitiesLoading: loading.effects['home/fetchActivitiesList'],
  }),
)(Home);
