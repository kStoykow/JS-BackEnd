const fs = require('fs');

const cubes = JSON.parse(fs.readFileSync('./config/database.json').toString());


function getCubes() {
    return cubes;
}

function getById(id) {
    return cubes.find(e => e.id == id);
}

function saveCube(cube) {
    const cubes = getCubes();
    cubes.push(cube);
    fs.writeFileSync('./config/database.json', JSON.stringify(cubes, null, 2));
}

function searchCube(cubes, search, from, to) {
    if (from == '' && to == '') {
        return cubes.filter(e => e.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
    }

    return cubes.filter(e => e.difficulty >= from && e.difficulty <= to)
        .filter(e => e.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
}
module.exports = { saveCube, getCubes, getById, searchCube };