const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const fs = require('fs');

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

router.get('/profiledata/:accountid/:tempdata?/:pid/:filename', (req, res) => {

  let filePath = '';
  if(!req.params.tempdata) 
  filePath = __dirname + '/resources/profiledata/'+ req.params.accountid +'/' + req.params.pid + '/' + req.params.filename 
  else filePath = __dirname + '/resources/profiledata/'+ req.params.accountid + '/tempdata/'+ req.params.pid + '/' + req.params.filename;

  res.sendFile(filePath);
});

router.post('/mediaupload/:accountid/:pid', (req,res)=> {

  new formidable.IncomingForm({maxFileSize:(2400 * 1024 * 1024)}).parse(req)
    .on('fileBegin', (name, file) => {

        let path = __dirname + '/resources/profiledata/'+ req.params.accountid +'/tempdata/'+ req.params.pid +'/';

        if(fs.existsSync(path)) {
        file.path = path+file.name; 
        } 
        else 
        {
          fs.mkdirSync(path,null);
          file.path = path+file.name;
          
        }
       

        // res.status(200).json({success: 'uploaded successfully1'});

    })
    .on('file', (name, file) => {
      console.log('Uploaded file', name, file);
      res.status(200).json({success: 'uploaded successfully'});
    });


});



router.delete('/deletemedia/:accountid/:pid/:filename', (req, res) => {

  let accountid = req.params.accountid;
  let pid = req.params.pid;
  let fileName = req.params.filename;
  let inTemp = req.query.intemp === 'false' ? false : true;



  let path = __dirname + '/resources/profiledata/'+ accountid + (inTemp ? '/tempdata/' + pid : '/' + pid) + '/' + fileName;
  

  fs.unlink(path, (err) => {
    if (err) throw err;
    res.status(202).json({success: 'belissimo!'});
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
