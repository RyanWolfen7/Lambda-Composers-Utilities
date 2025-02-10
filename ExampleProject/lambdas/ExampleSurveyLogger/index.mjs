import buildResponseObject from "./shared/modules/buildResponseObject.mjs";
import useValidation from "./shared/modules/useValidation.mjs";
import validateAuthorization from "./shared/utils/validation/authorization.mjs";
import surveySchema from "./schema/surveySchema.mjs";
import useSurveyLogger from "./modules/useSurveyLogger.mjs";

const composeLambdaRequest = (...functions) => async (event, context, callback) => {
    const state = { event, context, callback }
    // console.log('lambdaRequestComposer: ', state)
    for (const funcion of functions) {
        state.res = await funcion(state);
        if(state.res.error) break
    }
    return state.error ? state.error : state.res 
}

export const handler = composeLambdaRequest(
    useValidation(surveySchema, validateAuthorization),
    useSurveyLogger,
    buildResponseObject
)
