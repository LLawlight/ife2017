const phantom = require('phantom');
require('../../../libs/jquery-3.2.0.min.js');

const devices = [
  {
    "model": "iPhone5",
    "width": 320,
    "height": 568,
    "userAgent": "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1"
  },
  {
    "model": "iPhone6",
    "width": 375,
    "height": 667,
    "userAgent": "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1"
  },
  {
    "model": "iPad",
    "width": 768,
    "height": 1024,
    "userAgent": "Mozilla/5.0 (iPad; CPU OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1"
  }
]

let keyword = 'phantom';
let code, msg, dataList;
let sourchURL = `https://www.baidu.com/s?wd=${keyword}`;

getPage(devices[Math.floor(Math.random() * 3)]);

async function getPage(device) {
    const instance = await phantom.create();
    const page = await instance.createPage(['--load-images=no']);

    console.log(`正在使用${device.model}浏览`);

    page.setting('userAgent', device.userAgent);

    page.property('viewportSize', {
      width: device.width,
      height: device.height
    })

    let startTime = Date.now();

    const status = await page.open(sourchURL);
    console.log('status:', status);

    if (device.userAgent.indexOf('iPhone') > -1) {
      dataList = await page.evaluate(function() {
          var dataList = $('.result.c-result').map(function() {
            var info = {};
            info.title = $(this).find('.c-title').text() || '';
            info.link = $(this).find('a').eq(0).attr('href') || '';
            info.pic = $(this).find('.c-abstract .c-img img').attr('src') || '';
            info.info = $(this).find('.c-abstract p').text() || '';
            return info;
          }).toArray();
          return dataList;
      })
    } else {
      dataList = await page.evaluate(function() {
          var dataList = $('.result.c-container').map(function() {
            var info = {};
            info.title = $(this).find('.t').text() || '';
            info.link = $(this).find('a').eq(0).attr('href') || '';
            info.pic = $(this).find('.general_image_pic img').attr('src') || '';
            info.info = $(this).find('.c-abstract').text() || '';
            return info;
          }).toArray();
          return dataList;
      })
    }

    if (status == 'success') {
      code = '1'
      msg = '抓取成功'
    } else {
      code = '0'
      msg = '抓取失败'
    }

    let result = {
        code: code,
        msg: msg,
        word: keyword,
        time: Date.now() - startTime,
        dataList: dataList
    }

    console.dir(result);

    await instance.exit();
};
