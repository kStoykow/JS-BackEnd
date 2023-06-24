const Resource = require('../models/Resource');

//TODO: check if await/return/lean is needed. Fix func if needed.

const createResource = (data) => {
    return Resource.create(data);
}

const findAll = () => Resource.find({}).lean();

const findResourceById = async (id) => {
    return Resource.findById(id).lean();
}


const editResource = async (resourceId, data) => {
    await Resource.findByIdAndUpdate(resourceId, { ...data });
}

const deleteResource = async (resourceId) => {
    return await Resource.findByIdAndDelete(resourceId);
}

const buyCrypto = async (userId, cryptoId) => {
    const coin = await Resource.findById(cryptoId);
    coin.buyers.push(userId);
    await coin.save();
}
module.exports = {
    createResource,
    findAll,
    findResourceById,
    editResource,
    deleteResource,
    buyCrypto
}