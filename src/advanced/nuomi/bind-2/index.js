function Observer(data) {
  this.data = data
  this.walk(data)
}

Observer.prototype.walk = function (obj) {
  let val
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      val = obj[key]
      if (typeof val === 'object') {
        new Observer(val)
      }

      this.convert(key, val)
    }
  }
}

Observer.prototype.convert = function (key, val) {
  Object.defineProperty(this.data, key, {
    get: function () {
      console.log('你访问了' + key)
      return val
    },
    set: function(newVal) {
      if (newVal === val) {
        console.log('值并没有改变哦~')
        return
      }
      else {
        val = newVal
        if(typeof newVal === 'object'){
          new Observer(val);
        }
        console.log('你设置了' + key + '新的值为' + newVal)
      }
    }
  })
}

let app = new Observer({
  name: 'z',
  age: '18',
  sex: 'male',
  birth: '1993.06.06',
  family: {
    father: {
      name: 'Z',
      age: '35',
      sex: 'male'
    },
    mother: {
      name: 'T',
      age: '36',
      sex: 'female'
    }
  }
})

console.log(app)
