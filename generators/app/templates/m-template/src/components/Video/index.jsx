import React from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import '@videojs/themes/dist/forest/index.css';

/**
 * import VideoPlayer from '@/components/VideoPlayer';
 *
 *  const videoJsOptions = {
 * // autoplay: true,
 *   controls: true,
 *   poster: `${GENERAL_PREFIX}place.png?v=2`,
 *  sources: [
 *    {
 *        src: `${GENERAL_PREFIX}video.mp4`,
 *        type: 'video/mp4',
 *      },
 *    ],
 * };
 *
 * <VideoPlayer {...videoJsOptions} />
 */
export default class VideoPlayer extends React.Component {
  componentDidMount() {
    // instantiate Video.js
    this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
      console.log('onPlayerReady', this);
    });
  }

  // destroy player on unmount
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  render() {
    return (
      <div>
        <div data-vjs-player>
          <video
            webkit-playsinline="true" // 这个属性是ios 10中设置可以让视频在小窗内播放，也就是不是全屏播放
            playsinline="true" // IOS微信浏览器支持小窗内播放
            // 如需兼容ios9行内播放则需要引入这个库 https://github.com/fregante/iphone-inline-video
            x5-playsinline="true"
            // x-webkit-airplay="allow" // 设置X5内核为行内播放模式，不能和`x5-video-player-type同时设置会覆盖
            x5-video-player-type="h5" // 启用H5播放器,是wechat安卓版特性
            x5-video-player-fullscreen="true" // 全屏设置，设置为 true 是防止横屏
            x5-video-orientation="portraint" // 播放器支付的方向， landscape横屏，portraint竖屏，默认值为竖屏
            ref={(node) => {
              this.videoNode = node;
            }}
            className="video-js vjs-theme-forest"
          >
            <track kind="captions" />
          </video>
        </div>
      </div>
    );
  }
}
