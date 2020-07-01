import React from 'react';
import styles from './index.less';

const ArticleListContent = ({ data: { content } }) => (
  <div className={styles.listContent}>
    <div className={styles.description}>{content}</div>
  </div>
);

export default ArticleListContent;
