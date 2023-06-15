const Resource = require('../models/Resource');

//TODO: check if await/return/lean is needed. Fix func if needed.

const createResource = (data) => {
    return Resource.create(data);
}

const findAll = () => Resource.find({});

const findResourceById = (id) => {
    return Resource.findById(id);
}


const editResource = (resourceId, data) => {
    return Resource.findOneAndUpdate(resourceId, data);
}

const deleteResource = (resourceId) => {
    return Resource.findOneAndDelete(resourceId);
}

module.exports = {
    createResource,
    findAll,
    findResourceById,
    editResource,
    deleteResource
}