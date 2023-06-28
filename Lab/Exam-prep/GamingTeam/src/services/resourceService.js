const Resource = require('../models/Resource');

//TODO: check if await/return/lean is needed. Fix func if needed.

const createResource = (data) => Resource.create(data);

const findAll = () => Resource.find({}).lean();

const findResourceById = (id) => Resource.findById(id).lean();

const editResource = (resourceId, data) => Resource.findByIdAndUpdate(resourceId, data, { runValidators: true });

const deleteResource = (resourceId) => Resource.findByIdAndDelete(resourceId);

const buy = (userId, gameId) => Resource.findByIdAndUpdate(gameId, { $push: { buyers: userId } });

const searchGame = async (game, platform) => {
    // let games = await Resource.find({}).lean();

    // if (game) {
    //     games = games.filter(e => e.name.toLowerCase().includes(game.toLowerCase()));
    // }
    // if (platform) {
    //     games = games.filter(e => e.platform.toLowerCase().includes(platform.toLowerCase()));
    // }
    // return games;
    try {
        let query = {};

        if (game) {
            const regex = new RegExp(game, 'i');
            query.name = { $regex: regex };
        }

        if (platform) {
            query.platform = platform;
        }

        return Resource.find(query).lean();

    } catch (error) {
        throw 'Search error';
    }
}

module.exports = {
    createResource,
    findAll,
    findResourceById,
    editResource,
    deleteResource,
    buy,
    searchGame
}