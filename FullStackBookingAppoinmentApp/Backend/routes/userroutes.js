const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');

router.post('/add-user', userController.addUser);
router.get('/get-user', userController.getAllUsers);
router.put('/update-user/:id', userController.updateUser);
router.delete('/delete-user/:id', userController.deleteUser);

module.exports = router;
