import createResponseObject from "../../functions/createResponseObject.mjs"

export const actionRequest = async (requestBody, requiredParams) => {
    if (!requestBody.action) return { error: createResponseObject({ status: 400, message: "No action" }) }

    return await requiredParams[requestBody.action].reduce((acc, variable) => {
        if (!requestBody[variable]) {
            acc = { 
                error: createResponseObject({ 
                    status: 400,
                    message: `No ${variable}` 
                })
            };
        }
        return acc;
    }, {})
}

export const defaultRequest = async (requestBody, requiredParams) => await requiredParams.reduce(( acc, variable) => {
    if(!requestBody[variable]) {
        acc = { 
            error: createResponseObject({ 
                status: 400,
                message: `No ${variable}`
            })
        };
    } 
    return acc;
}, {}) 

const validateRequestBody = async (state, schema) => {
    if (!schema.body) return null
    const { body: reqBody } = state.event
    if (!reqBody) return { 
        error: createResponseObject({
            status: 400,
            message: "No body"
        })
    }
    return schema.body.length 
        ? await defaultRequest(reqBody, schema.body)
        : await actionRequest(reqBody, schema.body)

};

export default validateRequestBody
