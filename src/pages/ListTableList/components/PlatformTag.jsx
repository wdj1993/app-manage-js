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
  const plats = {
      1: {
        text: '抖音',
        icon: DouyinSvg,
      },
      2: {
        text: '微博',
        icon: WeiboSvg
      },
      3: {
        text: '微信',
        icon: WeixinSvg
      },
      4: {
        text: '快手',
        icon: KuaishouSvg
      },
      5: {
        text: '今日头条',
        icon: ToutiaoSvg
      },
      6: {
        text: '西瓜视频',
        icon: XiguaSvg
      },
      7: {
        text: '火山小视频',
        icon: HuoshanSvg
      },
      8: {
        text: '腾讯微视',
        icon: WeishiSvg
      },
      9: {
        text: '斗鱼',
        icon: DouyuSvg
      },
      10: {
        text: '虎牙',
        icon: HuyaSvg
      },
      11: {
        text: '小红书',
        icon: XiaoshongshuSvg
      },
    };

  const renderIcon = () => {
    return (
      <>
        <img
          src= {plats[platform].icon}
          style={{
            width: 25,
            height: 25,
          }}
          alt={plats[platform].text}
          title={plats[platform].text}
        />
      </>
    );
  };
  return renderIcon();
};

export default PlatformTag;
