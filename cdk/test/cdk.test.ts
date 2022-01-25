import * as cdk from 'aws-cdk-lib';
import { Template, Match } from 'aws-cdk-lib/assertions';
import * as Cdk from '../lib/cdk-stack';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { BucketEncryption } from 'aws-cdk-lib/aws-s3';
import { RemovalPolicy } from 'aws-cdk-lib';

describe("S3 Bucket Tests", () => {
   const app = new cdk.App();
//     // WHEN
   const stack = new Cdk.CdkStack(app, 's3TestStack');
//     // THEN
   const template = Template.fromStack(stack);

   test('s3 Bucket Created', () => {
       template.hasResource('AWS::S3::Bucket', {
           UpdateReplacePolicy: "Retain",
           DeletionPolicy: "Retain",
       });
    });

    test('s3 Bucket Count', () => {
       template.resourceCountIs('AWS::S3::Bucket', 2);
    });


    test('s3 Bucket Policy', () => {
        let res = template.hasResourceProperties('AWS::S3::Bucket', {
          removalPolicy: RemovalPolicy.DESTROY,
        });
    });
});
