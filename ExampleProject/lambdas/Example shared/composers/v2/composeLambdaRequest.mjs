import createResponseObject from "../../functions/createResponseObject.mjs";

const composeLambdaRequestFormatted = (...functions) => async (event, context, callback) => {
    let state = { event, context, callback, actions: [] }
    // console.log('lambdaRequestComposer: ', state)
    for (const funcion of functions) {
        await funcion(state);
        if(state.error) break
    }
    const response = state.error ? state.error : state.res 
    return createResponseObject(response)
}

const composeLambdaRequest = (...functions) => async (event, context, callback) => {
    let state = { event, context, callback, actions: [] }
    // console.log('lambdaRequestComposer: ', state)
    for (const funcion of functions) {
        await funcion(state);
        if(state.error) break
    }
    return state.error ? state.error : state.res 
}

export {
    composeLambdaRequest,
    composeLambdaRequestFormatted
}
