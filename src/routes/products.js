const express = require('express');
const router = express.Router();
const productsController = require('../controllers/product');

router.get('/', async function(req, res){
    const data = await productsController.get();
    res.send(data);
})

router.get('/:id', async function(req,res){
    const id = req.params.id;
    const dataById = await productsController.getById(id);
    res.send(dataById);
})

router.post('/', async function(req, res){
    const data = req.body;
    const insertData = await productsController.create(data);
    res.send(insertData);
})

router.put('/:id', async function(req, res){
    const id = req.params.id;
    const data = req.body;
    const updateData = await productsController.update(data, id);
    res.send(updateData);
})

router.delete('/:id', async function(req, res){
    const id = req.params.id;
    const deleteData = await productsController.remove(id);
    res.send(deleteData);
})

module.exports = router;