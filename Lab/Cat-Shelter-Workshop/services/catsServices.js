const fs = require('fs');

const cats = JSON.parse(fs.readFileSync('./services/cats.json'));
const breeds = JSON.parse(fs.readFileSync('./services/breeds.json'));


function getCats() {
    return cats;
}

function getBreeds() {
    return breeds;
}

function addBreed(breed) {
    breeds.push(breed);
    fs.writeFileSync('./services/breeds.json', JSON.stringify(breeds, null, 2));
}

function addCat(cat) {
    cats.push(cat);
    fs.writeFileSync('./services/cats.json', JSON.stringify(cats, null, 2));

}

module.exports = { addBreed, getCats, getBreeds, addCat };