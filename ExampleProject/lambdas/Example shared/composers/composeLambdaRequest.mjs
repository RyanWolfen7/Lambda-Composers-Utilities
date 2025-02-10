/**
 * Composes Multiple functions into an unbroken chain
 * @param  {...any} funcs 
 * @returns 
 */

import { DefaultLogger } from "../utils/logging/index.mjs";

const composeLambdaRequest = (...functions) => async (event, context, callback) => {
    const state = { event, context, callback, logger: new DefaultLogger }
    // console.log('lambdaRequestComposer: ', state)
    for (const funcion of functions) {
        state.res = await funcion(state);
        if(state.res.error) break
    }
    return state.error ? state.error : state.res 
}

export default composeLambdaRequest
