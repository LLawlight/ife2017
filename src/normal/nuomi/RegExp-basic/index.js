window.onload = function() {
  var reg = new RegExp(/^1(3|4|5|7|8)\d{9}$/);
  var val;
  document.querySelector('#check-phone').addEventListener('click', function() {
    val = document.querySelector('input[name=phone]').value;
    if (reg.test(val)) {
      alert('手机号码输入正确')
    } else {
      alert('手机号码输入错误')
    }
  });

  var reg1 = new RegExp(/(\b\w+)\s+\1\b/g);
  var val1;
  document.querySelector('#check-string').addEventListener('click', function() {
    val1 = document.querySelector('textarea[name=string]').value;
    if (reg1.test(val1)) {
      alert('存在相邻的重复单词')
    } else {
      alert('不存在相邻的重复单词')
    }
  });
}
