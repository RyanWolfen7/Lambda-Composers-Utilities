import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs'


const client = new SQSClient({})

export const xSQS = async ({
    args,
    sqsQueueUrl,
    messageId
}) => {
    console.log("======= SENDING TO SQS PORTAL X ========")
    const command = new SendMessageCommand({
        QueueUrl: sqsQueueUrl,
        MessageBody: JSON.stringify({
            event: 'createCustomer',
            data: args
        }),
        MessageGroupId: messageId,
    })
    const response = await client.send(command);
    console.log('SQS Portal: ', response)
    console.log("======= End ========")
    return response
}
