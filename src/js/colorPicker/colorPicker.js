let mainColor,
    h, s, l,
    colorPicker, colorPickerTx, colorPickerTxGrd,
    mainColorPicker, mainColorPickerTx, mainColorPickerTxGrd;

window.onload = () => {
  init()

  const picker = document.querySelector(".picker")
  const pickerMain = document.querySelector(".picker-main")
  let mOffsetTop, mOffsetLeft, mClientX, mClientY;

  function changeY(e) {
    let top = e.clientY - mClientY + mOffsetTop

    if (top < -10) {
      top = -10
    } else if (top > 290) {
      top = 290
    }

    pickerMain.style.top = top + 'px'

    h = document.querySelector('#H').value = Math.round((290 - parseInt(pickerMain.style.top)) / 300 * 360)
    mainColor = 'hsl(' + h + ', ' + s * 100 + '%,' + l * 100 + '%)'

    resetColorPicker()

    const rgb = HSLtoRGB(h, s, l)
    document.querySelector('#R').value = Math.round(rgb.r)
    document.querySelector('#G').value = Math.round(rgb.g)
    document.querySelector('#B').value = Math.round(rgb.b)
  }

  pickerMain.addEventListener('mousedown', (e) => {
    mOffsetTop = pickerMain.offsetTop
    mOffsetLeft = pickerMain.offsetLeft
    mClientX = e.clientX
    mClientY = e.clientY

    document.addEventListener('mousemove', changeY)
  })

  document.addEventListener('mouseup', () => {
    document.removeEventListener('mousemove', changeY)
  })
}

const init = () => {
  h = document.querySelector('#H').value
  s = document.querySelector('#S').value / 100
  l = document.querySelector('#L').value / 100
  const rgb = HSLtoRGB(h, s, l)
  document.querySelector('#R').value = rgb.r
  document.querySelector('#G').value = rgb.g
  document.querySelector('#B').value = rgb.b

  mainColor = 'hsl(' + h + ', ' + s * 100 + '%,' + l * 100 + '%)'

  createMainColorPicker()
  createColorPicker()
}

const createColorPicker = () => {
  colorPicker = document.getElementById("color-picker");
  colorPickerTx = colorPicker.getContext("2d");
  resetColorPicker()
}

const resetColorPicker = () => {
  colorPickerTxGrd = colorPickerTx.createLinearGradient(0, 0, 300, 300);
  colorPickerTxGrd.addColorStop(0, 'white');
  colorPickerTxGrd.addColorStop(0.5, mainColor);
  colorPickerTxGrd.addColorStop(1, 'black');

  colorPickerTx.fillStyle = colorPickerTxGrd;
  colorPickerTx.fillRect(0, 0, 300, 300);
}

const createMainColorPicker = () => {
  mainColorPicker = document.getElementById("main-color-picker");
  mainColorPickerTx = mainColorPicker.getContext("2d");
  mainColorPickerTxGrd = mainColorPickerTx.createLinearGradient(0, 0, 0, 300);

  for (var i = 0; i < 360; i++) {
    mainColorPickerTxGrd.addColorStop(i / 360, 'hsl(' + (360 - i) + ', 100%, 50%)');
  };

  mainColorPickerTx.fillStyle = mainColorPickerTxGrd;
  mainColorPickerTx.fillRect(0, 0, 20, 300);

  var asd = mainColorPickerTx.getImageData(0, 0, 1, 1).data;
  console.log(mainColorPickerTx.getImageData(0, 0, 1, 1).data);
  console.log(RGBtoHSL(asd[0], asd[1], asd[2]));
  // for (var i = 0; i < 301; i++) {
  //   console.log(i, ctx.getImageData(0, i, 1, 1).data);
  // }
}

function RGBtoHSL(r, g, b) {
  r = r / 255
  g = g / 255
  b = b / 255
  const max = Math.max(r, g, b),
        min = Math.min(r, g, b);
  let h, l, s;

  if (max === min) {
    h = 0
  } else if ((max === r) && (g >= b)) {
    h = 60 * ( g - b ) / ( max - min ) + 0
  } else if ((max === r) && (g < b)) {
    h = 60 * ( g - b ) / ( max - min ) + 360
  } else if (max === g) {
    h = 60 * ( b - r ) / ( max - min ) + 120
  } else if (max === b) {
    h = 60 * ( r - g ) / ( max - min ) + 240
  }

  l = ( max + min ) / 2

  if ((l === 0) || (max === min)) {
    s = 0
  } else if ((l > 0) && (l <= 0.5)) {
    s =  (max - min) / (max + min)
  } else if (l > 0.5) {
    s = (max - min) / (2 - (max + min))
  }

  return {
    h: h,
    l: l,
    s: s
  }
}

function HSLtoRGB(h, s, l) {
  let q, p, t, r, g, b;

  if (s === 0) {
    r = g = b = l
  } else {

    if (l < 0.5) {
      q = l * (1 + s)
    } else if (l >= 0.5) {
      q = l + s - l * s
    }

    p = 2 * l - q

    const _h = h / 360;

    let tR = _h + 1 / 3,
        tG = _h,
        tB = _h - 1 / 3;

    if (tR < 0) {
      tR = tR + 1
    } else if (tR > 1) {
      tR = tR - 1
    }

    if (tG < 0) {
      tG = tG + 1
    } else if (tG > 1) {
      tG = tG - 1
    }

    if (tB < 0) {
      tB = tB + 1
    } else if (tB > 1) {
      tB = tB - 1
    }

    if (tR < (1 / 6)) {
      r = p + ((q - p) * 6 * tR)
    } else if ((tR >= (1 / 6)) && (tR < 0.5)) {
      r = q
    } else if ((tR >= 0.5) && (tR < (2 / 3))) {
      r = p + ((q - p) * 6 * ((2 / 3) - tR))
    } else {
      r = p
    }

    if (tG < (1 / 6)) {
      g = p + ((q - p) * 6 * tG)
    } else if ((tG >= (1 / 6)) && (tG < 0.5)) {
      g = q
    } else if ((tG >= 0.5) && (tG < (2 / 3))) {
      g = p + ((q - p) * 6 * ((2 / 3) - tG))
    } else {
      g = p
    }

    if (tB < (1 / 6)) {
      b = p + ((q - p) * 6 * tB)
    } else if ((tB >= (1 / 6)) && (tB < 0.5)) {
      b = q
    } else if ((tB >= 0.5) && (tB < (2 / 3))) {
      b = p + ((q - p) * 6 * ((2 / 3) - tB))
    } else {
      b = p
    }
  }

  return {
    r: r * 255,
    g: g * 255,
    b: b * 255
  }
}
