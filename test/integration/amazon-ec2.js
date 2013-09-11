// --------------------------------------------------------------------------------------------------------------------
//
// integration/amazon-ec2.js - integration tests for Amazon EC2
//
// Copyright (c) 2012 AppsAttic Ltd - http://www.appsattic.com/
// Written by Andrew Chilton <chilts@appsattic.com>
//
// License: http://opensource.org/licenses/MIT
//
// --------------------------------------------------------------------------------------------------------------------
// requires

// npm
var test = require('tape');

// local
var amazonEc2 = require('../../awssum-amazon-ec2.js');
var Ec2 = amazonEc2.Ec2;

// --------------------------------------------------------------------------------------------------------------------

var env = process.env;
var ec2;
try {
    ec2 = new Ec2({
        'accessKeyId'     : env.ACCESS_KEY_ID,
        'secretAccessKey' : env.SECRET_ACCESS_KEY,
        'region'          : amazonEc2.US_EAST_1,
    });
}
catch(e) {
    // env vars aren't set, so skip these integration tests
    console.log('Skipping test : ' + e);
    process.exit();
}

// --------------------------------------------------------------------------------------------------------------------
// Amazon:Ec2 operations

// this test just checks that the initial parameter checking passed
test('Ec2:CreateTags - (1) Standard', function(t) {
    var opts = {
        ResourceId : 'i-cafebabe',
        Tag : {
            Key : 'stack', Value : 'production',
        },
    };
    ec2.CreateTags(opts, function(err, data) {
        t.equal(
            err.Body.Response.Errors.Error.Code,
            'InvalidInstanceID.NotFound',
            'Ec2:CreateTags - Standard : got an error (invalid instance)'
        );
        t.notOk(data, 'Ec2:CreateTags - Standard : data not given');
        t.end();
    });
});

// this test just checks that the initial parameter checking passed
test('Ec2:CreateTags - (2) Standard', function(t) {
    var opts = {
        ResourceId : [ 'i-cafebabe' ],
        Tag : {
            Key : 'stack', Value : 'production',
        },
    };
    ec2.CreateTags(opts, function(err, data) {
        t.equal(
            err.Body.Response.Errors.Error.Code,
            'InvalidInstanceID.NotFound',
            'Ec2:CreateTags - Standard : got an error (invalid instance)'
        );
        t.notOk(data, 'Ec2:CreateTags - Standard : data not given');
        t.end();
    });
});

// this test just checks that the initial parameter checking passed
test('Ec2:CreateTags - (3) Standard', function(t) {
    var opts = {
        ResourceId : [ 'i-cafebabe', 'i-deadbeef' ],
        Tag : [
            { Key : 'stack', Value : 'testing', },
            { Key : 'stack', Value : 'staging', },
        ],
    };
    ec2.CreateTags(opts, function(err, data) {
        t.equal(
            err.Body.Response.Errors.Error.Code,
            'InvalidInstanceID.NotFound',
            'Ec2:CreateTags - Standard : got an error (invalid instance)'
        );
        t.notOk(data, 'Ec2:CreateTags - Standard : data not given');
        t.end();
    });
});

// --------------------------------------------------------------------------------------------------------------------
