import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  service: 'serverless-sns-push-notification',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild'],
  provider: {
    name: 'aws',
    runtime: 'nodejs16.x',
    stage: 'dev',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: 'sns:*',
        Resource: '*',
      },
    ],
  },
  functions: {
    sendNotification: {
      handler: 'src/handlers/sendNotification.handler',
      environment: {
        TOPIC_ARN: { Ref: 'MySNSTopicTest' },
      },
      events: [
        {
          http: {
            method: 'post',
            path: 'notification',
          },
        },
      ],
    },
    subscribeNumber: {
      handler: 'src/handlers/subscribeNumber.handler',
      environment: {
        TOPIC_ARN: { Ref: 'MySNSTopicTest' },
      },
      events: [
        {
          http: {
            method: 'post',
            path: 'notification/subscribe',
          },
        },
      ],
    },
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk', 'sharp'],
      target: 'node16',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
  resources: {
    Resources: {
      MySNSTopicTest: {
        Type: 'AWS::SNS::Topic',
        Properties: {
          TopicName: 'MyNotificationTopicTest'
        }
      },
    },
  },
};

module.exports = serverlessConfiguration;
