let express = require('express');
let app = express();
require('dotenv').config()

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${req.ip}`)
    next()
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
})

app.get('/now', (req, res, next) => {
    req.time = new Date().toString()
    next()
},
(req, res, next) => {
    res.send({time : req.time})
}
)

app.get('/json', (req, res) => {
    res.json({
        "message" : process.env.MESSAGE_STYLE === "uppercase" ? "HELLO JSON" : "Hello json"
    })
})

app.use('/public', express.static(__dirname + '/public'))

app.get('/:word/echo', (req, res) => {
    res.send({echo : req.params.word})
})

module.exports = app;
