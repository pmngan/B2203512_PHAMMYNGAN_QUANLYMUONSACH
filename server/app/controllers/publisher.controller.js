const PublisherService = require("../services/publisher.service");

const PublisherController = {
    createPublisher: async (req, res) => {
        const { tenNXB, diaChi } = req.body;
        try {
            const publisher = await PublisherService.createPublisher({ tenNXB, diaChi });
            res.status(200).json(publisher);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    findAll: async (req, res) => {
        try {
            const publishers = await PublisherService.findAllPublishers();
            res.status(200).json(publishers);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    findOne: async (req, res) => {
        const { id } = req.params;
        try {
            const publisher = await PublisherService.findOnePublisher(id);
            res.status(200).json(publisher);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    update: async (req, res) => {
        const { id } = req.params;
        const updatedData = req.body;
        try {
            const updatedPublisher = await PublisherService.updatePublisher(id, updatedData);
            res.status(200).json({ message: "Publisher updated!", data: updatedPublisher });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    delete: async (req, res) => {
        const { id } = req.params;
        try {
            await PublisherService.deletePublisher(id);
            res.status(200).json({ message: "Publisher deleted!" });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
};

module.exports = PublisherController;