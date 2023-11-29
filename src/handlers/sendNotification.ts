import { APIGatewayProxyHandler } from 'aws-lambda';
import { snsService } from '../services/snsService';

export const handler: APIGatewayProxyHandler = async (event) => {
  const { message, phoneNumber } = JSON.parse(event.body);

  try {
    await snsService.publishMessage(message, !!phoneNumber ? undefined:`${process.env.TOPIC_ARN}`,phoneNumber);
    return { statusCode: 200, body: JSON.stringify({ message: 'Notification sent successfully' }) };
  } catch (error) {
    console.error('Error sending notification:', error);
    return { statusCode: 500, body: JSON.stringify({ message: 'Error sending notification' }) };
  }
};
