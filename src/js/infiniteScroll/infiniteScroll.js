var isLoading = false;
var index = 1;
var scrollTop, scrollHeight, clientHeight;

window.onload = function() {
  getItem();
  window.onscroll = function() {
    scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    scrollHeight = document.documentElement.scrollHeight;
    clientHeight = document.body.clientHeight;

    if ((scrollHeight - scrollTop - clientHeight) < 200) {
      getItem();
    }
  }
}

var getItem = function() {
  if (isLoading == true) {
    return;
  }
  isLoading = true;
  showLoading();

  setTimeout(function() {
    for (var i = 0; i < 20; i++) {
      document.querySelector('#main').innerHTML += '<div class="item">item' + index++ + '</div>';
    }

    isLoading = false;
    hideLoading();
  }, 2000);
}

var showLoading = function() {
  document.querySelector('#loading').style.display = 'block';
}

var hideLoading = function() {
  document.querySelector('#loading').style.display = 'none';
}
