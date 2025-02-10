const composeValidation = (...functions) => async (state, schema) => {
    // console.log('composeValidation: ', { state, schema })
    for (const func of functions) {
        state.res = await func(state, schema);
        // console.log("compose validation",state)
        if (state?.res?.error) {
            state.error = state.res.error
            break;
        }
    }
    return state;
};

export default composeValidation;
