const express = require('express');
const { signup, login, auth, userById, todoById, createTodo, TodosByUser, updateTodo, deleteTodo, deleteUser } = require('./controller');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.delete('/deleteUser/:userId', auth, deleteUser);
router.post('/createTodo/:userId', auth, createTodo);
router.get('/getTodo/:userId', auth, TodosByUser);
router.put('/updateTodo/:userId/:todoId', auth, updateTodo);
router.delete('/deleteTodo/:userId/:todoId', auth, deleteTodo);

router.param('userId', userById);
router.param('todoId', todoById);

module.exports = router;