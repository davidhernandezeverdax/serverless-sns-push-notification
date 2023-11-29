# Serverless SNS Push Notification Service

## Description

This Serverless SNS Push Notification Service is a Node.js and TypeScript-based backend application that utilizes AWS Simple Notification Service (SNS). It offers two main functionalities: direct SMS notifications to specified phone numbers and topic-based notifications where users can subscribe their phone numbers to receive updates.

## Features

- **Direct SMS Notifications**: Send SMS notifications directly to specified phone numbers.
- **Topic-Based Subscriptions**: Allows phone numbers to subscribe to a notification topic, enabling them to receive messages sent to this topic.
- **Flexible Notification System**: Combines the benefits of direct SMS and topic-based messaging for a versatile notification system.

## Installation

Before you begin, ensure you have Node.js, npm, and the Serverless Framework installed. Additionally, you should have the AWS CLI configured with your AWS credentials.

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/serverless-sns-push-notification.git

2. **Navigate to the Project Directory**:
   ```bash
   cd serverless-sns-push-notification

3. **Install dependencies**:
   ```bash
   npm install


### Deployment
Deploy the service using the Serverless Framework. Make sure your AWS credentials are set up.

   ```bash
   serverless deploy
   ```

### Usage
**Sending a Direct SMS**
- Endpoint: POST /notification
- Payload:
   ```bash
   {
   "message": "Your SMS message here",
   "phoneNumber": "+1234567890"
   }
- Send a POST request to this endpoint to directly send an SMS to the specified phone number.

**Subscribing a Phone Number to the Topic**
- Endpoint: POST /notification/subscribe
- Payload:
   ```bash
   {
   "phoneNumber": "+1234567890"
   }
- Send a POST request to this endpoint to subscribe the phone number to the notification topic.

**Sending a Message to the Subscribed Topic
- Endpoint: POST /notification
- Payload:
   ```bash
   {
   "message": "Message to all subscribed phones",
   "phoneNumber": null
   }
- Send a POST request without a phoneNumber to send a message to all subscribed phone numbers.
  
