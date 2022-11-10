const fs = require('fs');

const home = fs.readFileSync('./views/home/index.html');
const addBreed = fs.readFileSync('./views/addBreed.html');
const addCat = fs.readFileSync('./views/addCat.html');

function homeController(req, res) {
    if (req.method == 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(home);
    }
    res.end();
}

function addBreedController(req, res) {
    if (req.method == 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(addBreed);
        console.log('get');
    } else if (req.method == 'POST') {
        // catsDB
        res.writeHead(301, { 'Location': '/' });
        console.log('post');
        const file = fs.readFile('./views/addCat.html', (err, data) => {
            if (err) {
                throw err;
            }

            console.log(data.toString());
        })
        console.log(file);
        // catDB
        res.write(home)
    }
    res.end();
}

function addCatController(req, res) {
    if (req.method == 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(addCat);
    } else if (req.method == 'POST') {
        // catsDB
    }
    res.end();
}

module.exports = {
    homeController,
    addBreedController,
    addCatController
};