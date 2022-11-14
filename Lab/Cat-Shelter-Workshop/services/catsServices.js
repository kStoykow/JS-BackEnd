const fs = require('fs');

const cats = JSON.parse(fs.readFileSync('./services/cats.json'));
const breeds = JSON.parse(fs.readFileSync('./services/breeds.json'));


function getCats(search) {
    if (search == undefined || search == '') {
        return cats;
    }
    return cats.filter(e => e.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
}

function getBreeds() {
    return breeds;
}
function getCat(id) {
    return cats.find(cat => cat.id == id);
}

function addBreed(breed) {
    breeds.push(breed);
    fs.writeFileSync('./services/breeds.json', JSON.stringify(breeds, null, 2));
}

function addCat(cat) {
    cats.push(cat);
    fs.writeFileSync('./services/cats.json', JSON.stringify(cats, null, 2));
}

function editCat(id, newCat) {
    const cat = cats.find(e => e.id == id);
    cats.splice(cats.indexOf(cat), 1, newCat);
    fs.writeFileSync('./services/cats.json', JSON.stringify(cats, null, 2));
}

function deleteCat(id) {
    const cat = cats.find(e => e.id == id);
    cats.splice(cats.indexOf(cat), 1);
    fs.writeFileSync('./services/cats.json', JSON.stringify(cats, null, 2));
}

module.exports = { addBreed, getCats, getBreeds, addCat, getCat, editCat, deleteCat };