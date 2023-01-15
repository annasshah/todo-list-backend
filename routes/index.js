const express = require('express')
const { signUp, login } = require('../controllers/auth')
const { fetch_user_details } = require('../controllers/auth/fetch_user_details')
const { add_todo, update_todo, delete_todo, get_todos } = require('../controllers/todo_controller')
const {check_auth} = require('../middlewares/check_auth')
const router = express.Router()


router.post('/signup', signUp)
router.post('/login', login)
router.get('/check-auth', check_auth, fetch_user_details)

router.post('/todo', check_auth, add_todo)
router.get('/todo', check_auth, get_todos)
router.put('/todo/:id', check_auth, update_todo)
router.delete('/todo/:id', check_auth, delete_todo)


module.exports = router