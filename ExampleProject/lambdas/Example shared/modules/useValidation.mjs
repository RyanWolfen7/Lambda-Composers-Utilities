import composeValidation from "../composers/composeValidation.mjs";
import validateHeaders from "../utils/validation/headers.mjs";
import validateRequestBody from "../utils/validation/requestBody.mjs";

const useValidation = (schema, ...funcs) => async (state) => {
    if (!schema) return state  
    return composeValidation(
        validateHeaders,
        validateRequestBody,
        ...funcs,
    )(state, schema);
}
    
export default useValidation;
