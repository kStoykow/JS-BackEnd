const Resource = require('../models/Resource');

//TODO: check if await/return/lean is needed. Fix func if needed.

const createResource = (data) => Resource.create(data);

const findAll = () => Resource.find({}).lean();

const findFirstThree = () => Resource.find({}).limit(3).lean();

const findResourceById = (id) => Resource.findById(id).populate('creatorId').lean();

const editResource = (resourceId, data) => Resource.findByIdAndUpdate(resourceId, data);

const deleteResource = (resourceId) => Resource.findByIdAndDelete(resourceId);

const apply = async (userId, resourceId) => await Resource.findByIdAndUpdate(resourceId, { $push: { applies: userId } });

module.exports = {
    createResource,
    findAll,
    findResourceById,
    editResource,
    deleteResource,
    apply,
    findFirstThree
}