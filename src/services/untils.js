const getQueryParams = (object) => {
  const arr = []
  for (let [k, v] of Object.entries(object)) {
    if (typeof v === 'object') {
      throw new Error('Should not contain deep level objects')
    }
    k = encodeURIComponent(k)
    v = encodeURIComponent(v)
    arr.push(k + '=' + v)
  }
  return '?' + arr.join('&')
}

const getDate = (x) => {
  let p = new Date(x * 1000)
  let dateExtention = 'th', date = p.getDate()
  if (date < 11 || 13 < date) {
    if (date % 10 == 1) {
      dateExtention = 'st'
    } else if (date % 10 == 2) {
      dateExtention = 'nd'
    } else if (date % 10 == 3) {
      dateExtention = 'rd'
    }
  }
  return date + dateExtention + ' ' + p.toString().slice(4, 7) + ' ' + p.toString().slice(16, 21)
}

export { getQueryParams, getDate }
