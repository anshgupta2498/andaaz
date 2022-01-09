const Item = require('./../models/itemModel');
const mongoose = require('mongoose')

exports.getItemById = async(req, res, next) => {
    console.log(req.params.id);
    try {
        const item = await Item.findById(mongoose.Types.ObjectId(req.params.id));
        console.log(item);
        if (item)
            return res.status(200).json({
                message: `Item with id: ${req.params.id} found`,
                item
            });
        return res.status(404).json({
            message: 'Item not found'
        })
    } catch (e) {
        res.status(404).json({ message: 'Item not found' });
    }
}

exports.getAllItems = async(req, res, next) => {
    try {
        const items = await Item.find({})
        return res.status(200).json({ message: 'Items found', items })
    } catch (e) {
        res.status(404).json({ message: 'No Items found' });
    }
}

exports.getCategorizedItems = async(req, res, next) => {
    if (!req.body.category)
        return res.status(404)
    const category = req.body.category
    try {
        const items = await Item.find({ item_category: category })
        console.log(items);
        res.status(200).json({ message: `Items for category ${category} found`, items })
    } catch (e) {
        res.status(404).json({ message: 'Category not found' });
    }
}

exports.createItem = async(req, res, next) => {
    if (!req.body) {
        return res.status(404)
    }
    let item = {}
    item.item_category = req.body.item_category
    item.item_brand = req.body.item_brand
    item.item_title = req.body.item_title
    item.item_price = req.body.item_price
    item.item_description = req.body.item_description
    item.item_image = req.body.item_image
    item.item_gender = req.body.item_gender
    try {
        const createItem = await Item.create(item);

        if (!createItem) {
            return res.status(400);
        }
        console.log("saved");
        return res.status(200).json({ status: 'Saved', item: createItem });
    } catch (e) {
        res.status(400).json({ message: 'Err.. there was some error saving the item' })
    }
}