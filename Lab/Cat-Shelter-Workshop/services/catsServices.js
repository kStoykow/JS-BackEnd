const getBreeds = () => require('../services/breeds.json');
const getCats = () => require('../services/cats.json');

const addBreed = (breed) => {
    const breeds = getBreeds().push(breed);
    // breeds.push(breed);
    return breeds;
}


module.exports = { addBreed, getCats, getBreeds };