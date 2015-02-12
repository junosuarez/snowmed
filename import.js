var fs = require('fs')
var path = require('path')
var Transform = require('stream').Transform
var tuttle = require('tuttle')

var distPath = 'c:/Users/Jason/Downloads/snomedCT_Release_US1000124_20140901/SnomedCT_Release_US1000124_20140901'
var terms = path.join(distPath, '/RF2Release/Snapshot/Terminology/sct2_Description_Snapshot-en_US1000124_20140901.txt')

var m = 0

fs.createReadStream(terms, 'utf-8')
  .pipe(tuttle.read({json:false, separator:'\t'}))
  .pipe(t(function (x, skip) {
    // console.log('$', typeof x.term, x.term)
    // m = Math.max(m, x.term.length)
    if (x.term.length > 80) {
      return skip()
      // console.log(x)
      // process.exit()
    }
    // console.log(m)
    return x.term + '\n'
  }))
  .pipe(t(function (str) {
    return str.replace(/\(.+\)\n/,'')
  }))
  // .pipe(t(function (term) {
  //   return term.trim().length + '\n'
  // }))
  // .on('data', function(){})
  .pipe(process.stdout)
  // .pipe(t(console.log))


function t(exp) {
  return Transform({
    transform: function (data, enc, next) {
      var skip = false
      var out = exp(data, function () { skip = true })
      if (!skip) {
        this.push(out)
      }
      next()
    },
    writableObjectMode: true,
    readableObjectMode: true
  })
}

function snowmed () {
  
}

module.exports = snowmed