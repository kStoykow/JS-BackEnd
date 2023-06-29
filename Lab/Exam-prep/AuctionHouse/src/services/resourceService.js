const Resource = require('../models/Resource');

//TODO: check if await/return/lean is needed. Fix func if needed.

const createResource = (data) => Resource.create(data);

const findAll = () => Resource.find({ isClosed: false }).lean();

const closedAuctions = () => Resource.find({ isClosed: true }).populate('bidder').lean();

const findResourceById = (id) => Resource.findById(id).lean();

const editResource = (resourceId, data) => Resource.findByIdAndUpdate(resourceId, data);

const deleteResource = (resourceId) => Resource.findByIdAndDelete(resourceId);

const bidding = (userId, resourceId, bid) => Resource.findByIdAndUpdate(resourceId, { bidder: userId, price: bid });

const close = (resourceId) => Resource.findByIdAndUpdate(resourceId, { isClosed: true });
module.exports = {
    createResource,
    findAll,
    findResourceById,
    editResource,
    deleteResource,
    bidding,
    close,
    closedAuctions
}