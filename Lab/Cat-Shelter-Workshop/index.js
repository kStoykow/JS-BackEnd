const http = require('http');
const fs = require('fs');
const port = 3000;
const catsDB = require('./data/cats.json');

const controllers = require('./controllers/controllers');


const paths = {
    '/': (req, res) => controllers.homeController(req, res),
    '/cats/add-cat': (req, res) => controllers.addCatController(req, res),
    '/cats/add-breed': (req, res) => controllers.addBreedController(req, res),
}


function reqHandler(req, res) {
    const url = new URL(req.url, `http://${req.headers.host}`);
    console.log(url.pathname);
    if (typeof paths[url.pathname] == 'function') {
        paths[url.pathname](req, res);

    } else if (url.pathname == '/content/styles/site.css') {
        res.writeHead(200, { 'Content-Type': 'text/css' });
        res.write(fs.readFileSync('./content/styles/site.css'));
        res.end();

    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('404 not found.');
    }

    res.end();

}

const server = http.createServer(reqHandler)

server.listen(port);