import { SNS } from 'aws-sdk';
import { PublishInput } from 'aws-sdk/clients/sns';

const sns = new SNS();

export const snsService = {
    async publishMessage(message: string, topicArn?: string, phone?: string) {
        const params: PublishInput = {
            Message: message,
            ...(!!topicArn ? {TopicArn: topicArn}:{}),
            ...(!!phone ? {PhoneNumber: phone}:{})
        };

        return sns.publish(params).promise();
    },
    async subscribe (topicArn: string,phoneNumber: string) {
        const params = {
          Protocol: 'sms',
          TopicArn: topicArn,
          Endpoint: phoneNumber,
        };
      
        return sns.subscribe(params).promise();
      }
};
