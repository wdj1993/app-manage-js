import React from 'react';
import { Row, Col } from 'antd';
import styles from './index.less';

const ArticleListContent = ({ data: { content, pics } }) => (
  <div className={styles.listContent}>
    <div className={styles.description}>{content}</div>
    <div className={styles.pics}>
    <Row gutter={[10,10]}>
      {pics.map((pic) => (
        <Col span={8} key={pic.o_img}>
          <div className={styles.listCircleImg}>
            <img src={pic.o_img} alt="说说图片" object-fit="contain" />
          </div>
        </Col>
      ))}
    </Row>
    </div>
  </div>
);

export default ArticleListContent;
