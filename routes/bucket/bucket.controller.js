(function(){
    'use strict'; //prevents the use of faulty implementations in javascript

    var Bucket = require('./bucket.model.js'); //schema for bucket item
    var multer = require('multer');

    

    

    var HardBuckets = [];
    // HardBuckets.push{id : HardBuckets.length + 1, realID : _id}

    module.exports.getById = function(req, res){
        Bucket.find({"_id": req.params.id}, function(err, result){
            if(err){
                console.log(err);
                return res.status(500).send(err);
            } return res.json(result);
        });
    };

    module.exports.getByAssessed = function(req, res) {
        Bucket.find({"assessed": {$eq: req.params.assessed}}, function(err, result){
            if (err) {
                console.log(err);
                return res.status(500).send(err);
            } return res.json(result);
        });
    };

    // module.exports.getByLat = function(req, res){
    //     Bucket.find({"lat": {$eq: req.params.lat}}, function(err, result){
    //         if(err){
    //             console.log(err);
    //             return res.status(500).send(err);
    //         } return res.json(result);
    //     });
    // };

    // module.exports.getByLong = function(req, res){
    //     Bucket.find({"long":{$eq: req.params.long}}, function(err, result){
    //         if(err){
    //             console.log(err);
    //             return res.status(500).send(err);
    //         } return res.json(result);
    //     });
    // };

    // module.exports.getByTime = function(req, res){
    //     Bucket.find({"time" : {$eq : req.params.time}}, function(err, results){
    //         if(err){
    //             console.log(err);
    //             return res.status(500).send(err);
    //         } return res.json(result);
    //     });
    // };

    // module.exports.getByAttr = function(req, res){
    //     Bucket.find({"attr" : {$eq : req.params.attr}}, function(err, results){
    //         if(err){
    //             console.log(err);
    //             return res.status(500).send(err);
    //         } return res.json(result);
    //     });
    // };

    module.exports.getAll = function(req, res){
        Bucket.find({}, function(err, buckets){
            if(err){
                console.log(err);
                return res.status(500).send(err);
            }
            return res.json(buckets);
        });
    };

    // module.exports.getByIsFull = function(req, res){
    //     Bucket.find({"isFull": {$eq: req.params.isFull}}, function(err, result){
    //         if(err){
    //             console.log(err);
    //             return res.status(500).send(err);
    //         } return res.json(result);
    //     });
    // };

    // module.exports.getByLocation = function(req, res){
    //     Bucket.find({"long" : {$eq: req.params.long}, "lat" : {$eq: req.params.lat}}, function(err, result){
    //         if(err){
    //             console.log(err);
    //             return res.status(500).send(err);
    //         }return res.json(result);
    //     });
    // };

    module.exports.welcome = function(req, res){
        return "Welcome to BlueBeluga";
    }

    module.exports.add = function(req, res){
        if(!req.body.lat || !req.body.long || !req.body.volume || !req.body.temp){
            return res.status(400).send("Need a valid latitude, longitude");
        }

        var bucket = new Bucket({
            name: req.body.name,
            lat: req.body.lat,
            long: req.body.long,
            temp: req.body.temp,
            img: req.body.imgName,
            assessed: false
        });

        const spawn = require("child_process").spawn;
        const pyproc = spawn('python', ["../../ImageClassification/sparrow.py"])

        bucket.save(function(err, result){
            if(err){
                console.log(err);
                return res.status(500).send(err);
            }

            return res.json(result);
        });
    };

    module.exports.getImage = function(req, res){
        res.sendFile("images/" + req.params.imageName);
    }

    module.exports.updateLocation = function(req, res){
        console.log()
        if (!req.body.id) {
            return res.status(400).send("No ID present");
        } else if ( typeof(req.body.lat) != 'number' || typeof(req.body.long) != 'number') {
            return res.status(400).send("Location not valid");
        }
        
        Bucket.update({'_id': req.body.id}, {$set: {'lat': req.body.lat, 'long': req.body.long}}, function(err, result){
            if(err){
                console.log(err);
                return res.status(500).send(err);
            } return res.json(result);
        });

    };

    module.exports.updateName = function(req, res){
        if(!req.body.id){
            return res.status(400).send("No ID present");
        } else if (typeof(req.body.name) != 'string'){
            return res.status(400).send("Name not valid type");
        }

        Bucket.update({'_id' : req.body.id}, {$set : {'name' : req.body.name}}, function(err, result){
            if(err){
                console.log(err);
                return res.status(500).send(err);
            } return res.json(result);
        });
    };

    // module.exports.updateTemperature = function(req, res){
    //     if(!req.body.id){
    //         return res.status(400).send("No ID present");
    //     }else if (typeof(req.body.temp) != 'number'){
    //         return res.status(400).send("Temperature not valid");
    //     }
    //     Bucket.update({'_id': req.body.id}, {$set: {'temp': req.body.temp}}, function(err, result){
    //         if(err){
    //             console.log(err);
    //             return res.status(500).send(err);
    //         } return res.json(result);
    //     });
    // };

    // module.exports.updateVolume = function(req, res){

    //     var realID;
    //     for (var i = 0; i < HardBuckets.length; i++){
    //         if(HardBuckets[i]._id == parseInt(req.body.id)){
    //             realID = HardBuckets[i].realID;
    //             break;
    //         }
    //     }
    //     // loop through hardbucket and get realID

    //     Bucket.update({'_id': realID}, {$set: {'volume': req.body.volume}}, function(err, result){
    //         if(err){
    //             console.log(err);
    //             return res.status(500).send(err);
    //         } return res.json(result);
    //     });
    // };

    //Warning - the delete is not reversible; removes from database permanently. Proceed with own risk
    module.exports.delete = function(req, res){
        Bucket.findOneAndRemove({"_id": req.body.id}, function(err, result){
            if(err){
                console.log(err);
                return res.send(500).send(err);
            } return res.json(result);
        });
    };

    
})();