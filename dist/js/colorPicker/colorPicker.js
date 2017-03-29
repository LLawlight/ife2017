"use strict";function RGBtoHSL(o,e,r){o/=255,e/=255,r/=255;var i=Math.max(o,e,r),t=Math.min(o,e,r),c=void 0,l=void 0,n=void 0;return i===t?c=0:i===o&&e>=r?c=60*(e-r)/(i-t)+0:i===o&&e<r?c=60*(e-r)/(i-t)+360:i===e?c=60*(r-o)/(i-t)+120:i===r&&(c=60*(o-e)/(i-t)+240),l=(i+t)/2,0===l||i===t?n=0:l>0&&l<=.5?n=(i-t)/(i+t):l>.5&&(n=(i-t)/(2-(i+t))),{h:c,l:l,s:n}}function HSLtoRGB(o,e,r){var i=void 0,t=void 0,c=void 0,l=void 0,n=void 0;if(0===e)c=l=n=r;else{r<.5?i=r*(1+e):r>=.5&&(i=r+e-r*e),t=2*r-i;var a=o/360,d=a+1/3,u=a,m=a-1/3;d<0?d+=1:d>1&&(d-=1),u<0?u+=1:u>1&&(u-=1),m<0?m+=1:m>1&&(m-=1),c=d<1/6?t+6*(i-t)*d:d>=1/6&&d<.5?i:d>=.5&&d<2/3?t+6*(i-t)*(2/3-d):t,l=u<1/6?t+6*(i-t)*u:u>=1/6&&u<.5?i:u>=.5&&u<2/3?t+6*(i-t)*(2/3-u):t,n=m<1/6?t+6*(i-t)*m:m>=1/6&&m<.5?i:m>=.5&&m<2/3?t+6*(i-t)*(2/3-m):t}return{r:255*c,g:255*l,b:255*n}}var mainColor=void 0,h=void 0,s=void 0,l=void 0,colorPicker=void 0,colorPickerTx=void 0,colorPickerTxGrd=void 0,mainColorPicker=void 0,mainColorPickerTx=void 0,mainColorPickerTxGrd=void 0;window.onload=function(){function o(o){var i=o.clientY-c+r;i<-10?i=-10:i>290&&(i=290),e.style.top=i+"px",h=document.querySelector("#H").value=Math.round((290-parseInt(e.style.top))/300*360),mainColor="hsl("+h+", "+100*s+"%,"+100*l+"%)",resetColorPicker();var t=HSLtoRGB(h,s,l);document.querySelector("#R").value=Math.round(t.r),document.querySelector("#G").value=Math.round(t.g),document.querySelector("#B").value=Math.round(t.b)}init();var e=(document.querySelector(".picker"),document.querySelector(".picker-main")),r=void 0,i=void 0,t=void 0,c=void 0;e.addEventListener("mousedown",function(l){r=e.offsetTop,i=e.offsetLeft,t=l.clientX,c=l.clientY,document.addEventListener("mousemove",o)}),document.addEventListener("mouseup",function(){document.removeEventListener("mousemove",o)})};var init=function(){h=document.querySelector("#H").value,s=document.querySelector("#S").value/100,l=document.querySelector("#L").value/100;var o=HSLtoRGB(h,s,l);document.querySelector("#R").value=o.r,document.querySelector("#G").value=o.g,document.querySelector("#B").value=o.b,mainColor="hsl("+h+", "+100*s+"%,"+100*l+"%)",createMainColorPicker(),createColorPicker()},createColorPicker=function(){colorPicker=document.getElementById("color-picker"),colorPickerTx=colorPicker.getContext("2d"),resetColorPicker()},resetColorPicker=function(){colorPickerTxGrd=colorPickerTx.createLinearGradient(0,0,300,300),colorPickerTxGrd.addColorStop(0,"white"),colorPickerTxGrd.addColorStop(.5,mainColor),colorPickerTxGrd.addColorStop(1,"black"),colorPickerTx.fillStyle=colorPickerTxGrd,colorPickerTx.fillRect(0,0,300,300)},createMainColorPicker=function(){mainColorPicker=document.getElementById("main-color-picker"),mainColorPickerTx=mainColorPicker.getContext("2d"),mainColorPickerTxGrd=mainColorPickerTx.createLinearGradient(0,0,0,300);for(var o=0;o<360;o++)mainColorPickerTxGrd.addColorStop(o/360,"hsl("+(360-o)+", 100%, 50%)");mainColorPickerTx.fillStyle=mainColorPickerTxGrd,mainColorPickerTx.fillRect(0,0,20,300);var e=mainColorPickerTx.getImageData(0,0,1,1).data;console.log(mainColorPickerTx.getImageData(0,0,1,1).data),console.log(RGBtoHSL(e[0],e[1],e[2]))};