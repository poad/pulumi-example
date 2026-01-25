// oxlint-disable-next-line no-unused-vars
import * as pulumi from '@pulumi/pulumi';
import * as aws from '@pulumi/aws';
// oxlint-disable-next-line no-unused-vars
import * as awsx from '@pulumi/awsx';

// Create an AWS resource (S3 Bucket)
const bucket = new aws.s3.Bucket('pulumi-start-aws-my-bucket');

// Export the name of the bucket
export const bucketName = bucket.id;
