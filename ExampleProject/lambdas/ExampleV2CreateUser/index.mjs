import createUserSchema from "./schema/createUser.mjs";
import useCreateUser from "./modules/useCreateUser.mjs";
import sendResponse from "./modules/sendResponse.mjs";

import setValidationSchema from "./shared/modules/v2/setValidationSchema.mjs";
import validateRequestBody from "./shared/utils/validation/v2/validateRequestBody.mjs";
import isExistingUser from "./shared/modules/v2/isExistingUser.mjs";
import { composeLambdaRequestFormatted }from "./shared/composers/v2/composeLambdaRequest.mjs";
import updateUserAudit from "./shared/modules/v2/updateUserAudit.mjs";
import getCurrentSubscription from "./shared/modules/v2/getCurrentSubscription.mjs";
import createXUser from "./shared/modules/v2/XpaymentProcessor/createXUser.mjs";
import creatXSub from "./shared/modules/v2/XpaymentProcessor/creatXSub.mjs";



export const handler = composeLambdaRequestFormatted(
    setValidationSchema(createUserSchema),
    validateRequestBody,
    useCreateUser,
    isExistingUser,
    createXUser,
    getCurrentSubscription,
    creatXSub,
    updateUserAudit,
    sendResponse
)
