// this is to test the initial idea. the final product optimized later.
const useLogger = (state) => {
    return "useLogger"
};
const useResponseObject  = (a, b, c) => {
    console.log('useResponseObject: ', { a, b, c })
    return 'useResponseObject'
};
const generateResponseByAction = (a, b, c) => {
    console.log('generateResponseByAction: ', { a, b, c })
    return 'generateResponseByAction'
};
const validateUser = (state, schema) => {
    console.log('validateUser: ', { state, schema })
    return 'validateUser'
};
const validateAwesomeness = (state, schema) => {
    console.log('validateAwesomeness: ', { state, schema })
    return 'validateAwesomeness'
};
const validateAuthorization = (state, schema) => {
    console.log('validateAuthorization: ', { state, schema })
    return 'validateAuthorization'
};
const validateHeaders = (state, schema) => {
    console.log('validateHeaders: ', { state, schema })
    return 'validateHeaders'
};
const validateRequestBody = (state, schema) => {
    console.log('validateRequestBody: ', { state, schema })
    return 'validateRequestBody'
};

const validateFailes = (state, schema) => {
    console.log('validateFailes: ', { state, schema })
    state.error = true
    return { error: "Failed", code: 500 }
}

const composeValidation = (...functions) => (state, schema) => {
    console.log('composeValidation: ', { state, schema })
    for (const func of functions) {
        const result = func(state, schema);
        if(result.error) {
            state.error = result
            break
        } 
    }
    return state
};

const useValidation = ({ schema, additionalFunctions }) => async (state) => {
    console.log('useValidation: ', state)
    return composeValidation(
        validateAuthorization,
        validateHeaders,
        validateRequestBody,
        ...additionalFunctions
    )(state, schema)
};

const lambdaRequestComposer = (...functions) => async (event, context, callback) => {
    const state = { event, context, callback, logger: "logger" }
    console.log('lambdaRequestComposer: ', state)
    for (const funcion of functions) {
        state.res = await funcion(state);
        if(state.error) break;
    }
    return state.error ? state.error : state.res 
}

const schema = { key: 'value' };

const handler = lambdaRequestComposer(
    useLogger,
    useValidation({
        schema,
        additionalFunctions: [
            validateUser,
            validateFailes,
            validateAwesomeness
        ]
    }),
    generateResponseByAction
)

const handler2 = lambdaRequestComposer(
    useLogger,
    generateResponseByAction
)
const exampleEvent = { event: 'example event' };
const exampleContext = { context: 'example context' };
const exampleCallback = () => { };

handler(exampleEvent, exampleContext, exampleCallback)
    .then((result) => {
        console.log('Result:', result);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
