import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";

// Create an AWS resource (S3 Bucket)
const bucket = new aws.s3.Bucket("my-bucket", {
    bucket: 'tinder-furever',
    website: {
        indexDocument: "index.html",
    },
    acl: "public-read",
    corsRules: [{
        allowedHeaders: ["*"],
        allowedMethods: [
            "GET",
            "PUT",
            "POST",
        ],
        allowedOrigins: ["https://api.petfinder.com/v2/*"],
        exposeHeaders: ["ETag"],
        maxAgeSeconds: 3000,
    }]
});

const bucketObject = new aws.s3.BucketObject("index.html", {
    acl: "public-read",
    contentType: "text/html",
    bucket: bucket,
    source: new pulumi.asset.FileAsset("src/index.html")
});
const bucketObject1 = new aws.s3.BucketObject("index.css", {
    acl: "public-read",
    contentType: "text/css",
    bucket: bucket,
    source: new pulumi.asset.FileAsset("src/index.css")
});
const bucketObject2 = new aws.s3.BucketObject("index.js", {
    acl: "public-read",
    contentType: "text/javascript",
    bucket: bucket,
    source: new pulumi.asset.FileAsset("src/index.js")
});

// Export the name of the bucket
export const bucketName = bucket.id;
export const bucketEndpoint = pulumi.interpolate`http://${bucket.websiteEndpoint}`;

