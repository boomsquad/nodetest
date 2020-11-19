const http = require('http')
const fs = require('fs')
const port = process.env.PORT || 3000

function serverStaticFile(res, path, contentType, responseCode = 200) {
    fs.readFile(__dirname + path, (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain'})
            return res.end('500 - Internal Error')
        }
        res.writeHead(responseCode, { 'Content-Type': contentType})
        res.end(data)
    })
}

const server = http.createServer((req, res) => {
    const path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase()
    switch (path) {
        case '':
            serverStaticFile(res, '/public/home.html', ' text/html')
            break
        case '/shirts':
            serverStaticFile(res, '/public/shirts.html', 'text/html')
            break
        case '/sweaters':
            serverStaticFile(res, '/public/sweaters.html', 'text/html')
            break
        case '/shoes':
            serverStaticFile(res, '/public/shoes.html', 'text/html')
            break
        case '/contact':
            serverStaticFile(res, '/public/contacts.html', 'text/html')
            break
        default:
            serverStaticFile(res, '/public/404.html', 'text/html')
            break
    }
})

server.listen(port, () => console.log('server started on port ${port};' +
    'press Ctrl-C to terminate...'))