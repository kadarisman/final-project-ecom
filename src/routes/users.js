var express = require('express');
var router = express.Router();
const userController = require("../controllers/user");
/* GET users listing. */
router.get('/', async function(req, res, next) {
  const getUser = await userController.get();
  res.send(getUser);
})

router.get('/:id', async function(req, res, next){
  const id = req.params.id;
  const data = await userController.getById(id);
  res.send(data);
})

router.post('/', async function(req, res){
  const data = req.body;
  const insertUser = await userController.create(data);
  res.send(insertUser);
})

router.put('/:id', async function(req, res){
  const id = req.params.id;
  const data = req.body;
  const updateUser = await userController.update(data, id);
  res.send(updateUser);
})

router.delete('/:id', async function(req, res){
  const id = req.params.id;
  const userDelete = await userController.remove(id);
  res.send(userDelete);
})

module.exports = router;
