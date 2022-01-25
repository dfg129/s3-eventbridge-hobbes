import { Stack, StackProps, RemovalPolicy } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as iam from 'aws-cdk-lib/aws-iam';

export class CdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // const inventoryBucket = new s3.Bucket(this, 'InventoryBucket');

    const dataBucket = new s3.Bucket(this, 'DataEventBucket', {
      encryption:s3.BucketEncryption.KMS,
      bucketKeyEnabled: true,
      enforceSSL: true,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      /*

       inventories: [
          {
          frequency: s3.InventoryFrequency.DAILY,
          includeObjectVersions: s3.InventoryObjectVersion.CURRENT,
          destination: {
            bucket: inventoryBucket,
          }
        },
      ],
      */
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    const policyResult = dataBucket.addToResourcePolicy(new iam.PolicyStatement({
        actions: [
          's3:Create*',
          's3:Describe*',
          's3:Enable*',
          's3:List*',
          's3:Put*',
        ],
        principals: [new iam.AccountRootPrincipal()],
        resources: ['*'],
    }));

   if (!policyResult.statementAdded) {
     return;
   }
  }
}
