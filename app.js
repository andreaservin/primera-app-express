const express = require('express')
const app = express()
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args))
const cheerio = require('cheerio')

app.get('/', (req, res) => {
  let secretText = 'holaaa'
  fetch('https://blog.makeitreal.camp/')
    .then(function (response) {
      return response.text()
    })
    .then(function (html) {
      // This is the HTML from our response as a text string
      const $ = cheerio.load(html)
      // extract the text
      secretText = $('div.secret').text()
      res.send(`<h1>${secretText}</h1>`)
    })
    .catch(function (err) {
      // There was an error
      console.warn('Something went wrong.', err)
    })
})

app.listen(3000, () => console.log('Listening on port 3000!'))
