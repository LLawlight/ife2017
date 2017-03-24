// 'use strict'
//
// var phantom = require('phantom')
// var page = phantom.create();
//
// page.open('https://www.baidu.com/s?wd=phantomjs', (status) => {
//   console.log(11111);
//   if (status !== 'success') {
//     console.log('Unable to access network')
//   } else {
//     console.log(status)
//     let shit = page.evaluate(() => {
//       console.log(document.title);
//       const results = document.querySelector('.result.c-container ')
//       results.map((result) => {
//         const title = result.querySelector('.t').innerText
//         return {
//           title: title
//         }
//       })
//       return results
//     })
//     console.log(shit)
//   }
//   phantom.exit()
// });

const phantom = require('phantom');

let keyword = '233';
let sourchURL = `https://www.baidu.com/s?wd=${keyword}`;

(async function() {
    const instance = await phantom.create();
    const page = await instance.createPage();
    console.log(22222);
    await page.open("https://www.baidu.com/s?wd=phantomjs", function(requestData) {
      console.log(11111111);
        console.info('Requesting', requestData.url)
    });

    const status = await page.open(sourchURL);
    console.log(status);
    //
    // const status = await page.open('https://stackoverflow.com/');
    // console.log(status);
    //
    // const content = await page.property('content');
    // console.log(content);

    await instance.exit();
}());
