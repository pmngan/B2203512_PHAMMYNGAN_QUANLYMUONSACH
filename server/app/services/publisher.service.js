const PublisherModel = require("../models/publisher.model");


//create a publisher
const createPublisher = async ({ tenNXB, diaChi }) => {
    try {
        const publisher = await PublisherModel.create({
            tenNXB,
            diaChi,
        });
        return publisher;
    } catch (err) {
        throw new Error(`Failed to create publisher: ${err.message}`);
    }
};

//display all publishers
const findAllPublishers = async () => {
    try {
        const publishers = await PublisherModel.find();
        return publishers;
    } catch (err) {
        throw new Error(`Failed to fetch all publishers: ${err.message}`);
    }
};

//display 1 publisher
const findOnePublisher = async (id) => {
    try {
        const publisher = await PublisherModel.findById(id);
        if (!publisher) {
            throw new Error(`Unable to find this publisher!`);
        }
        return publisher;
    } catch (err) {
        throw new Error(`Failed to fetch publisher: ${err.message}`);
    }
};

//find and update publisher by id
const updatePublisher = async (id, updatedData) => {
    try {
        const updatedPublisher = await PublisherModel.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });
        if (!updatedPublisher) {
            throw new Error("Unable to find this publisher");
        }
        return updatedPublisher;
    } catch (err) {
        throw new Error(`Operation failed: updatePublisher ${err.message}`);
    }
};

//find and delete book by id 
const deletePublisher = async (id) => {
    try {
        await PublisherModel.deleteOne({ _id: id });
    } catch (err) {
        throw new Error(`Operation failed: deletePublisher ${err.message}`);
    }
};

module.exports = {
    createPublisher,
    findAllPublishers,
    findOnePublisher,
    updatePublisher,
    deletePublisher
}
