import * as wx from 'weixin-js-sdk'
import { jsSdkConfig } from '@/api/user'

export default {
  /* 判断是否在微信中 */
  isWechat() {
    const ua = window.navigator.userAgent.toLowerCase();
    console.log(ua);
    if (ua.match(/micromessenger/i) == 'micromessenger') {
      // console.log('是微信客户端')
      return true;
    }
    else {
      // console.log('不是微信客户端')
      // 以下是我项目中所需要的操作其他，可以自定义
      uni.showModal({
        title: '提示',
        content: '请在微信浏览器中打开',
        showCancel: false,
        confirmColor: '#00875a',
        success(res) {
          if (res.confirm) {
            // console.log('用户点击确定');
          }
          else if (res.cancel) {
            // console.log('用户点击取消');
          }
        },
      });
      return false;
    }
  },
  /* 获取sdk初始化配置 */
  async initJssdk(callback) {
    // 获取当前url然后传递给后台获取授权和签名信息
    const url = encodeURIComponent(window.location.href.split('#')[0]); // 当前网页的URL，不包含#及其后面部分
    console.log(window.location.href.split('#')[0]);
    const res = await jsSdkConfig({ url }) // 这里调用的是后端的接口，后端去获取签名以及config里面所需的信息
    // 返回需要的参数appId,timestamp,noncestr,signature等
    // 注入config权限配置
    const { appId, timestamp, nonceStr, signature } = res;
    wx.config({
      debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      // beta: true, // 文档没有这个参数，这个参数需设为true，才能调用那些微信还没有正式开放的新接口比如wx.invoke
      appId, // 必填，公众号的唯一标识
      timestamp, // 必填，生成签名的时间戳
      nonceStr, // 必填，生成签名的随机串
      signature, // 必填，签名
      jsApiList: [ // 必填，需要使用的JS接口列表
        // 'checkJsApi', //判断当前客户端版本是否支持指定JS接口
        // 'updateAppMessageShareData', //分享朋友
        // 'updateTimelineShareData', //分享朋友圈
        // 'getLocation', //获取位置
        // 'openLocation', //打开位置
        'scanQRCode', // 扫一扫接口
        // 'chooseWXPay', //微信支付
        // 'chooseImage', //拍照或从手机相册中选图接口
        // 'previewImage', //预览图片接口
        // 'uploadImage' //上传图片
      ],
    });
    // 本地环境测试使用，里面信息是测试号的appid和签名
    // wx.config({
    // 	debug: true,
    // 	appId: 'wx451eff21c6c0d938',
    // 	timestamp: 1659065946,
    // 	nonceStr: 'dzklsf',
    // 	signature: 'd2ada1c92409e14c9e720ed58056dcd3800ab0a7',
    // 	jsApiList: ['scanQRCode']
    // })
    // 本地环境测试结束

    if (callback) {
      callback(res.content);
    }
  },
  // 微信扫码
  scanQRCode(callback) {
    if (!this.isWechat()) {
      // console.log('不是微信客户端')
      return;
    }
    this.initJssdk((res) => {
      wx.ready(() => {
        wx.scanQRCode({
          needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
          scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
          success(res) {
            // console.log(res);
            callback(res);
          },
          fail(res) {
            callback(res)
          },
        });
      });
    });
  },
  // 在需要定位页面调用
  getlocation(callback) {
    if (!this.isWechat()) {
      // console.log('不是微信客户端')
      return;
    }
    this.initJssdk((res) => {
      wx.ready(() => {
        wx.getLocation({
          type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
          success(res) {
            // console.log(res);
            callback(res)
          },
          fail(res) {
            console.log(res)
          },
        });
      });
    });
  },
  // 打开位置
  openlocation(data, callback) {
    if (!this.isWechat()) {
      // console.log('不是微信客户端')
      return;
    }
    this.initJssdk((res) => {
      wx.ready(() => {
        wx.openLocation({ // 根据传入的坐标打开地图
          latitude: data.latitude,
          longitude: data.longitude,
        });
      });
    });
  },
  // 选择图片
  chooseImage(callback) {
    if (!this.isWechat()) {
      // console.log('不是微信客户端')
      return;
    }
    // console.log(data);
    this.initJssdk((res) => {
      wx.ready(() => {
        wx.chooseImage({
          count: 1,
          sizeType: ['compressed'],
          sourceType: ['album'],
          success(rs) {
            callback(rs)
          },
        })
      });
    });
  },
  // 微信支付
  wxpay(data, callback) {
    if (!this.isWechat()) {
      // console.log('不是微信客户端')
      return;
    }
    this.initJssdk((res) => {
      wx.ready(() => {
        wx.chooseWXPay({
          timestamp: data.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
          nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位
          package: data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
          signType: data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
          paySign: data.paysign, // 支付签名
          success(res) {
            // console.log(res);
            callback(res)
          },
          fail(res) {
            callback(res)
          },
        });
      });
    });
  },

  // 自定义分享  这里我统一调用了分享到朋友和朋友圈，可以自行定义
  share(callback) {
    if (!this.isWechat()) {
      // console.log('不是微信客户端')
      return;
    }
    this.initJssdk((res) => {
      wx.ready(() => {
        // 我的分享配置由后台返回，可以自定义
        // http.get({
        //   url: 'getShareInfo',
        // }).then((res) => {
        //   const { shareInfo } = res.data;
        //   wx.updateAppMessageShareData({ // 分享给朋友
        //     title: shareInfo.title,
        //     desc: shareInfo.description,
        //     imgUrl: shareInfo.image,
        //     link: shareInfo.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        //     success() {
        //       // 用户确认分享后执行的回调函数
        //       callback(res);
        //     },
        //   });
        //   wx.updateTimelineShareData({ // 分享到朋友圈
        //     title: shareInfo.title,
        //     desc: shareInfo.description,
        //     imgUrl: shareInfo.image,
        //     link: shareInfo.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        //     success() {
        //       // 用户确认分享后执行的回调函数
        //       callback(res);
        //     },
        //   });
        // });
      });
    });
  },
}
