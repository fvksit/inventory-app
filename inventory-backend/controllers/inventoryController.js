const db = require('../models');
const Inventory = db.Inventory;
const Category = db.Category;

exports.getAllItems = async (req, res) => {
    try {
        const items = await Inventory.findAll({
            include: {
                model: Category,
                attributes: ['name'],
            }
        });
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addItem = async (req, res) => {
    const { name, quantity, price, categoryId } = req.body;
    try {
        const item = await Inventory.create({ name, quantity, price, categoryId });
        res.status(201).json(item);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateItem = async (req, res) => {
    const { id } = req.params;
    const { name, quantity, price, categoryId } = req.body;
    try {
        const item = await Inventory.findByPk(id);
        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }
        await item.update({ name, quantity, price, categoryId });
        res.json(item);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteItem = async (req, res) => {
    const { id } = req.params;
    try {
        const item = await Inventory.findByPk(id);
        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }
        await item.destroy();
        res.json({ message: "Item deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
