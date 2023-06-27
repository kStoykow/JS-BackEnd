const Resource = require('../models/Resource');

//TODO: check if await/return/lean is needed. Fix func if needed.

const createResource = (data) => {
    return Resource.create(data);
}

const findAll = async () => await Resource.find({}).lean();

const findResourceById = (id) => {
    return Resource.findById(id).lean();
}


const editResource = (resourceId, data) => {
    return Resource.findByIdAndUpdate(resourceId, data);
}

const deleteResource = (resourceId) => {
    return Resource.findByIdAndDelete(resourceId);
}

module.exports = {
    createResource,
    findAll,
    findResourceById,
    editResource,
    deleteResource
}