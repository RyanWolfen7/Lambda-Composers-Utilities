export const actionRequest = async (requestBody, requiredParams) => {
    if (!requestBody.action) return { status: 400, message: "No action" }

    return await requiredParams[requestBody.action].reduce((acc, variable) => {
        if (!requestBody[variable]) {
            acc = { 
                status: 400,
                message: `No ${variable}` 
            };
        }
        return acc;
    }, {})
}

export const defaultRequest = async (requestBody, requiredParams) => await requiredParams.reduce(( acc, variable) => {
    if(!requestBody[variable]) {
        acc = { 
            status: 400,
            message: `No ${variable}`
        }
    } 
    return acc;
}, {}) 

const validateRequestBody = async (state) => {
    const { schema, event: { body: reqBody } } = state
    if (!schema.body) return null
    if (!reqBody) {
        state.error = {
            status: 400,
            message: "No body"
        } 
        return null
    }
    const res = schema.body.length 
        ? await defaultRequest(state, reqBody, schema.body)
        : await actionRequest(state, reqBody, schema.body)
    if(res.status == 400) {
        state.error = res
    }
};

export default validateRequestBody
