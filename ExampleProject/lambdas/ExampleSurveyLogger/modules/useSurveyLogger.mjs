import createResponseObject from '../shared/functions/createResponseObject.mjs'
import { uploadSurvey } from '../shared/services/DDB.mjs'

const useSurveyLogger = async ({ event }) => {
    const { customerId, userId, reasons = [], surveyType } = event.body

    if (!customerId || !userId) return { error: createResponseObject({ status: 401, message: "No user or customerId" })}
    if (!surveyType) return { error: createResponseObject({ status: 406, message: "No declared survey type"})}
    if (reasons.length == 0) return { error: createResponseObject({ status: 406, message: "Empty Reason Array"})}

    await uploadSurvey(event.body)

    return {
        status: 200,
        message: `User ${userId} Logged`,
    }
}

export default useSurveyLogger
