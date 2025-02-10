export const getExample = async (customerId, client) => {
    console.log("=======getExample=========")
    const query = {
        text: 'SELECT * FROM portal."Customers"  where "customerId" = $1',
        values: [customerId]
    }

    const data = await client.query(query.text, query.values)
    const user = data.rows[0]
    console.log('DB Response: ', data)
    console.log("======= End =========")
    return user

};


export const updateExample = async ({
    customerId,
    status,
    client
}) => {
    console.log("=======updateExample=========")
    const query = {
        text: 'UPDATE portal."Example" SET "status" = $1 WHERE "customerId" = $2 RETURNING *',
        values: [status, customerId]
    }
    const response = await client.query(query.text, query.values)
    console.log('DB Response: ', response)
    console.log("======= End =========")
    return response
};

export const removeExample = async (customerId, client) => {
    console.log("=======removeExample=========")
    const query = {
        text: 'DELETE from portal."Example" WHERE "customerId" = $1',
        values: [customerId]
    }
    const response = await client.query(query.text, query.values)
    console.log('DB Response: ', response)
    console.log("======= End =========")
    return response
}

export const createExample = async ({
    customerId,
    created,
    authId,
    client,
    tenantId = 'example'
}) => {
    console.log("=======createRecord=========")
    const query = {
        text: 'insert into portal."RokuTransactions"("customerId", "authId", "tenantId", "created") VALUES ($1, $2, $3, $4)',
        values: [customerId, transactionId , authId, tenantId, created]
    }
    const response = await client.query(query.text, query.values)
    console.log('DB Response: ', response)
    console.log("======= End =========")
    return response
}

export default {
    createExample,
    getExample,
    updateExample,
    removeExample
}
