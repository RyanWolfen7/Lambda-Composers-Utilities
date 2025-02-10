import { createSubscriptionAudit } from '../../services/DDB.mjs'

const updateSubscriptionAudit = async (state) => {
    console.log("Update Sub Audit Start")
    const { user, actions, subscription } = state

    const isCreateSubscription = actions.includes('createSubscription')
    if(isCreateSubscription) {
        try {
            await createSubscriptionAudit({
                customerId: user.customerId,
                auth: user.id,
                priceId: subscription.priceId,
                planId: subscription.planId,
                paymentProvider: user.provider,
                source: user.provider,
            })
            console.log("Update Sub Audit Success")
        } catch(err) {
                console.log("!!!! FAILED TO CREATE SUBSCRIPTION AUDIT!!!!")
                console.log("Error: ", err)
        }
    }
}

export default updateSubscriptionAudit
