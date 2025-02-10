/* eslint-disable no-unused-vars */
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { QueryCommand, DynamoDBDocumentClient, PutCommand, DeleteCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);


export const ExamplePut = async ({
    ...args
}) => {
    console.log("======= Add Example ========")
    const command = new PutCommand({
        TableName: Example_Table,
        Item: {
            ...args
        },
    })
    const response = await docClient.send(command);
    console.log('DDB Create: ', response)
    console.log("======= End ========")
    return response
}

export const ExampleQuery = async (arg) => {
    console.log("======= Get Example ========")
    const command = new QueryCommand({
        TableName: Example,
        KeyConditionExpression: "example = :example",
        ExpressionAttributeValues: {
            ":example": arg
        },
    });

    const response = await docClient.send(command);
    console.log('DDB Get: ', response)
    console.log("======= End ========")
    return response["Items"][0];
};

export const ExampleDelete = async (arg)=> {
    console.log("======= Remove Example ========")
    const command = new DeleteCommand({
        TableName: Example,
        Key: {
            example: arg
        }
    })
    const response = await docClient.send(command);
    console.log("======= End ========")
    return response;
};


export const ExampleUpdate = async ({
    userId,
    planId,
    priceId,
    expires,
    lastUpdated = parseInt(new Date().getTime() / 1000)
}) => {
    console.log("======= Update User Price Start ========")
    const command = new UpdateCommand({
        TableName: USER_SUBS_TBL,
        Key: {
            user_id: userId,
            plan_id: planId
        },
        UpdateExpression: "set price_id = :price_id , expires = :expires , last_updt = :last_updt",
        ExpressionAttributeValues: {
            ":price_id": priceId,
            ":expires": expires,
            ":last_updt": `${lastUpdated}`,
        },
        ReturnValues: "ALL_NEW",
    })
    const response = await docClient.send(command);
    console.log('DDB Update Price: ', response)
    console.log("======= End ========")
    return response
}

export default {
    ExampleDelete,
    ExamplePut,
    ExampleQuery,
    ExampleUpdate,
    client,
    docClient
}
