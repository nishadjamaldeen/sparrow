(function() {
    'use strict';

    var express = require('express');
    var multer = require('multer');
    var controller = require('./bucket.controller.js');

    var router = express.Router();

    var Storage = multer.diskStorage({
        destination: 'images/', 
        filename: function(req, file, cb){
            cb(null, file.originalname);
        }
    });

    var upload = multer({
        storage: Storage
    }).array("imgUploader", 3);

    

    router.get('/:id', controller.getById);
    router.get('/assessed/:assessed', controller.getByAssessed)
//    router.get('/lat/:lat', controller.getByLat);
//    router.get('/long/:long', controller.getByLong);
//    router.get('/time/:time', controller.getByTime);
    router.get('/location/:lat/:long', controller.getByLocation);
//    router.get('/attr/:attr', controller.getByAttr)
    router.get('/getAll/getAll', controller.getAll);
    router.get('/images/:imageName', controller.getImage);

    router.post('/', upload.single('avatar'), controller.add);
//    router.post('/update/temp/', controller.updateTemperature);
    router.post('/update/name/', controller.updateName);
//    router.post('/update/volume/', controller.updateVolume);
    router.post('/update/location/', controller.updateLocation);
    router.post('/update/items/', controller.updateItems);

    router.delete('/:id', controller.delete);

    module.exports = router;
})();