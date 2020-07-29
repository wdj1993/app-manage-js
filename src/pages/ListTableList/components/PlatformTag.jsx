import React from 'react';
import DouyinSvg from '@/assets/platforms/douyin.svg';
import WeiboSvg from '@/assets/platforms/weibo.svg';
import WeixinSvg from '@/assets/platforms/weixin.svg';
import KuaishouSvg from '@/assets/platforms/kuaishou.svg';
import ToutiaoSvg from '@/assets/platforms/toutiao.svg';
import XiaoshongshuSvg from '@/assets/platforms/xiaohongshu.svg';
import WeishiSvg from '@/assets/platforms/weishi.svg';
import HuoshanSvg from '@/assets/platforms/huoshan.svg';
import HuyaSvg from '@/assets/platforms/huya.svg';
import DouyuSvg from '@/assets/platforms/douyu.svg';
import XiguaSvg from '@/assets/platforms/xigua.svg';

const PlatformTag = (props) => {
  const { platform } = props;
  const renderIcon = () => {
    let src;
    let title;
    switch (platform) {
      case 1:
        src = DouyinSvg;
        title = '抖音';
        break;
      case 2:
        src = WeiboSvg;
        title = '微博';
        break;
      case 3:
        src = WeixinSvg;
        title = '微信';
        break;
      case 4:
        src = KuaishouSvg;
        title = '快手';
        break;
      case 5:
        src = ToutiaoSvg;
        title = '头条';
        break;
      case 6:
        src = XiguaSvg;
        title = '西瓜';
        break;
      case 7:
        src = HuoshanSvg;
        title = '火山小视频';
        break;
      case 8:
        src = WeishiSvg;
        title = '腾讯微视';
        break;
      case 9:
        src = DouyuSvg;
        title = '斗鱼';
        break;
      case 10:
        src = HuyaSvg;
        title = '虎牙';
        break;
      case 11:
        src = XiaoshongshuSvg;
        title = '小红书';
        break;
      default:
        break;
    }

    return (
      <>
        <img
          src={src}
          style={{
            width: 25,
            height: 25,
          }}
          alt={title}
          title={title}
        />
      </>
    );
  };
  return renderIcon();
};

export default PlatformTag;
