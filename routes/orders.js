const express = require('express');
const router = express.Router();
const orderControllers = require('../controllers/order');

router.get('/', async function(req, res){
    const orderData = await orderControllers.get();
    res.send(orderData);
})

router.get('/:id', async function(req, res){
    const id = req.params.id;
    const orderById = await orderControllers.getById(id);
    res.send(orderById);
})

router.post('/', async function(req, res){
    const data = req.body;
    const orderInsert = await orderControllers.create(data);
    res.send(orderInsert);
})

router.put('/:id', async function(req, res){
    const id = req.params.id;
    const data = req.body;
    const orderUpdate = await orderControllers.update(data, id);
    res.send(orderUpdate);
})

router.delete('/:id', async function(req, res){
    const id = req.params.id;
    const orderDelete = await orderControllers.remove(id);
    res.send(orderDelete);
})

module.exports = router;