import { updateServiceTracker as sendToServiceTrackerSQS } from '../../../services/SQS.mjs'

const updateServiceTracker = async (state) => {
    console.log("===== UPDATE Tracker START ======")
    const { 
        env, 
        actions,
        user: {
            email,
            id: userId,
            customerId
        }, 
        subscription: {
            expires,
            start,
            paymentProvider = 'examplePaymentService',
            status = 'active'
        },
    } = state
    // Action Listeners
    actions.includes('action')
    const sqsQueueUrl = env.HUBSPOT_SQS_URL

    let action = "New account with Basic"
    let subscription = "premium_monthly"

    //if Logic

    try {
        await sendToServiceTrackerSQS({
            sqsQueueUrl,
            oktaId: userId,
            email,
            customerId,
            provider: paymentProvider,
            subscription,
            status,
            start,
            expires,
            action
        })
    } catch(err) {
        console.log("!!!! FAILED TO SEND TO SQS !!!!", err)
    }

    console.log("===== UPDATE Tracker END ======")
}

export default updateServiceTracker
