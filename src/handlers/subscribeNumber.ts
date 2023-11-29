import { APIGatewayProxyHandler } from 'aws-lambda';
import { snsService } from '../services/snsService';

export const handler: APIGatewayProxyHandler = async (event) => {
  const { phoneNumber } = JSON.parse(event.body);

  try {
    await snsService.subscribe(`${process.env.TOPIC_ARN}`, phoneNumber);
    return { statusCode: 200, body: JSON.stringify({ message: 'Phone subscribed successfully' }) };
  } catch (error) {
    console.error('Error subscribing phone:', error);
    return { statusCode: 500, body: JSON.stringify({ message: 'Error subscribing notification' }) };
  }
};
