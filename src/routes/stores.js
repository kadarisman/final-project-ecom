var express = require('express');
var router = express.Router();
const storeController = require("../controllers/store");

router.get('/', async function(req, res){
    const data = await storeController.get();
    res.send(data); 
})

router.put('/:id', async function(req, res){
    const id = req.params.id;
    const data = req.body;
    const updateStore = await storeController.update(data, id);
    res.send(updateStore);
})

router.get('/:id', async function(req, res){
    const id = req.params.id;
    const storeById = await storeController.getById(id);
    res.send(storeById);
})

module.exports = router;