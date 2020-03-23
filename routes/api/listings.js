const express = require('express');
const router = express.Router();
const formidable = require('formidable');

// Load Listing model
const Listing = require('../../models/Listing');

// @route GET api/Listings/test
// @description tests Listings route
// @access Public
router.get('/test', (req, res) => res.send('Listing route testing!'));

// @route GET api/Listings
// @description Get all Listings
// @access Public
router.get('/', (req, res) => {
  Listing.find()
    .then(Listings => res.json(Listings))
    .catch(err => res.status(404).json({ noListingsfound: 'No Listings found' }));
});

// @route GET api/Listings/:id
// @description Get single Listing by id
// @access Public
router.get('/:id', (req, res) => {
  Listing.findById(req.params.id)
    .then(Listing => res.json(Listing))
    .catch(err => res.status(404).json({ noListingfound: 'No Listing found' }));
});

// @route GET api/Listings
// @description add/save Listing
// @access Public
router.post('/', (req, res) => {
  Listing.create(req.body)
    .then(Listing => res.json({ msg: 'Listing added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add this Listing' }));
});



router.post('/imgupload', (req,res)=> {

  new formidable.IncomingForm().parse(req)
    .on('fileBegin', (name, file) => {
        file.path = __dirname + '/uploads/' + file.name
    })
    .on('file', (name, file) => {
      console.log('Uploaded file', name, file)
    });


});

// @route GET api/Listings/:id
// @description Update Listing
// @access Public
router.put('/:id', (req, res) => {
  Listing.findByIdAndUpdate(req.params.id, req.body)
    .then(Listing => res.json({ msg: 'Updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});

// @route GET api/Listings/:id
// @description Delete Listing by id
// @access Public
router.delete('/:id', (req, res) => {
  Listing.findByIdAndRemove(req.params.id, req.body)
    .then(Listing => res.json({ mgs: 'Listing entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such a Listing' }));
});

module.exports = router;
