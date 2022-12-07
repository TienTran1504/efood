const express = require('express')
const router = express.Router()


const { getAllUsers, getUser, deleteUser, updateUser, getAllContacts, getContact, deleteContact } = require('../controllers/admin')
router.get('/contacts', getAllContacts)
router.route('/contacts/:id').get(getContact).delete(deleteContact)
router.route('/').get(getAllUsers)
router.route('/:id').get(getUser).delete(deleteUser).patch(updateUser)

module.exports = router