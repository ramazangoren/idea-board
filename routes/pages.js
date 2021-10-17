const express = require('express');
const controller = require('../controllers/pagescontroller')
const router = express.Router();


// all ideas
router.get('/', controller.ideas)

// serch in all ideas
router.post('/', controller.search)

// sort all ideas by created date
router.get('/created', controller.sortbycreate)

// sort all ideas by updated date
router.get('/updated', controller.sortbyupdate)

//new idea
router.get('/new', controller.newidea)
//save the new idea
router.post('/new/save', controller.savenewidea)

// see ideas by their id
router.get('/edit/:id', controller.editidea)

// update ideas by their id
router.post('/edit/:id', controller.updateidea)


//delete
router.get('/:id', controller.deleteideabyid)


module.exports = router;

