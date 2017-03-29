const phantom = require('phantom');
require('../../../libs/jquery-3.2.0.min.js');

let keyword = 'phantom';
let code, msg;
let sourchURL = `https://www.baidu.com/s?wd=${keyword}`;

(async function() {
    const instance = await phantom.create();
    const page = await instance.createPage(['--load-images=no']);

    let startTime = Date.now();

    const status = await page.open(sourchURL);
    console.log('status:', status);

    let dataList = await page.evaluate(function() {
        var dataList = $('.result.c-container').map(function() {
          var info = {};
          info.title = $(this).find('.t').text() || '';
          info.link = $(this).find('.t > a').attr('href') || '';
          info.info = $(this).find('.c-abstract').text() || '';
          info.pic = $(this).find('.general_image_pic img').attr('src') || '';
          return info;
        }).toArray();
        return dataList;
    })

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
}());
