import { createSubscription } from '../../services/SQS.mjs'

const updateSupportPortal = async (state) => {
    const { 
        env,
        event: {
            body: {
                ...args
            }
        }, 
        actions, 
        user: {
            id: userId,
        }, 
        userTempData,
        
    } = state
    const isCreateSubscription = actions.includes('createSubscription')
    console.log("Update Support Portal Start")
    const messageId = userTempData ? userTempData.message_id : userId
    const sqsQueueUrl = env.PORTAL_SQS_URL


    if(isCreateSubscription) {
        try {
            await createSubscription({
                userId,
                ...args,
                sqsQueueUrl,
                messageId
            })
            console.log("Update Support Portal Success")
        } catch(err) {
            console.log("!!!! FAILED TO CREATE PORTAL QUE !!!!")
            console.log("Error: ", err)
        }
    }
    return state
}

export default updateSupportPortal
