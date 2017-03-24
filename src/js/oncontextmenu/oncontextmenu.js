window.onload = function() {
  bind();
}

function bind() {
  var cm = document.querySelector('#contextmenu');
  var viewWidth, viewHeight, cmWidth, cmHeight, x, y;

  cm.addEventListener('click', function(e) {
    e.stopPropagation();
    cm.style.display = 'none';
  });
  cm.addEventListener('contextmenu', function(e) {
    cm.style.display = 'none';
    e.target.click();
    e.stopPropagation();
    e.preventDefault();
  });

  document.querySelector('html').oncontextmenu = function(e) {
    cm.style.display = 'block';

    viewWidth = window.innerWidth;
    viewHeight = window.innerHeight;
    cmWidth = parseInt(window.getComputedStyle(cm).width);
    cmHeight = parseInt(window.getComputedStyle(cm).height);
    x = e.pageX;
    y = e.pageY;

    if ((viewWidth - cmWidth) < x) {
      cm.style.left = (e.pageX - cmWidth) + 'px';
    } else {
      cm.style.left = e.pageX + 'px';
    }

    if ((viewHeight - cmHeight) < y) {
      cm.style.top = (e.pageY - cmHeight) + 'px';
    } else {
      cm.style.top = e.pageY + 'px';
    }

    return false
  };

  document.querySelector('html').addEventListener('click', function() {
    cm.style.display = 'none';
  });
}
