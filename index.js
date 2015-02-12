var fs = require('fs')
var path = require('path')

var med = load(path.join(__dirname, 'med.csv'))
var phrases = load(path.join(__dirname, 'phrases.csv'))
var weather = load(path.join(__dirname, 'weather.csv'))


function load(file) {
  return fs.readFileSync(file,'utf-8').split('\n')
}

function lowercaseFirstLetter(str) {
  return str[0].toLowerCase() + str.substr(1, 81)
}

function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function snowmed () {
  return random(phrases)
    .replace('$med', lowercaseFirstLetter(random(med)))
    .replace('$weather', random(weather))
}

module.exports = snowmed
