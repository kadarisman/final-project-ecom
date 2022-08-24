const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categories');
const middlewareVerifyToken = require('../middlewares/verifyToken');

router.get('/', async function(req, res){
    const data = await categoriesController.get();
    res.send(data);
})

router.get('/:id', async function(req, res){
    const id = req.params.id;
    const dataById = await categoriesController.getById(id);
    res.send(dataById);
})

router.post('/', async function(req, res){
    const data = req.body;
    const dataInsert = await categoriesController.create(data);
    res.send(dataInsert);
})

router.put('/:id', async function(req, res){
    const id = req.params.id;
    const data = req.body;
    const updateData = await categoriesController.update(data, id);
    res.send(updateData);
})

router.delete('/:id', middlewareVerifyToken, async function(req, res){
    const id = req.params.id;
    const deleteData = await categoriesController.remove(id);
    res.send(deleteData);
})

module.exports = router;