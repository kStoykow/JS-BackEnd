const Resource = require('../models/Resource');
const mongoose = require('mongoose');

const createResource = (data) => Resource.create(data);

const findAll = () => Resource.find({}).lean();

const findFirstThree = () => Resource.find({}).limit(3).lean();

const findResourceById = (id) => Resource.findById(id).populate('creatorId applies').lean();

const search = async (search) => {
    const ads = await Resource.find({}).populate('creatorId').lean();
    const matches = ads.filter(e => !search ? e : e.creatorId.email.toLowerCase() == search?.toLowerCase());
    return matches;
}

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
    findFirstThree,
    search
}