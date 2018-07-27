(function() {
    'use strict';

    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;

    var BucketSchema = new Schema(
        {
            _id: Number,
            assesed: Boolean,
            lat: String,
            long: String,
            timestamp: Number,
            img: String,
        }, {"collection": "bucket"}
    );

    module.exports = mongoose.model('Bucket', BucketSchema);
})();