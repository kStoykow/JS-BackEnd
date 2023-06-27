const Resource = require('../models/Resource');


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

const wishRead = (userId, bookId) => Resource.findByIdAndUpdate(bookId, { $push: { wishList: userId } });

module.exports = {
    createResource,
    findAll,
    findResourceById,
    editResource,
    deleteResource,
    wishRead
}