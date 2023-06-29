const Resource = require('../models/Resource');

//TODO: check if await/return/lean is needed. Fix func if needed.

const createResource = (data) => Resource.create(data);

const findAll = () => Resource.find({}).lean();

const findResourceById = (id) => Resource.findById(id).lean();

const editResource = (resourceId, data) => Resource.findByIdAndUpdate(resourceId, data);

const deleteResource = (resourceId) => Resource.findByIdAndDelete(resourceId);

module.exports = {
    createResource,
    findAll,
    findResourceById,
    editResource,
    deleteResource
}