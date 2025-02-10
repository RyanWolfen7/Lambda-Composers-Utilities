import { createSubscription as addToDB } from '../shared/services/Postgress.mjs'
import { getSecretEnvVars } from '../shared/services/secrets.mjs'

const createSubscription = async (filteredEvent, client) => {
    const { data, customerId } = filteredEvent
    const env =  await getSecretEnvVars()
    const { STRIPE_YEARLY_PRICE_ID } = env 
    try {
        await addToDB({
            customerId,
            subscriptionId: data.id,
            planId: data.plan.product,
            priceId: data.plan.id,
            paymentProvider: "stripe",
            created: data.created,
            status: "Incomplete",
            expireDate: data.current_period_end,
            subscriptionTitle: data.plan.id == STRIPE_YEARLY_PRICE_ID ? "Yearly Premium Plan Subscription" : "Monthly Premium Plan Subscription",
            client
        })
    } catch(err) {
        console.log('!!!! Create Subscriptions Failed !!!!')
        console.log('CUSTOMER: ', customerId)
        console.log('Data: ', data)
        console.log('ERROR: ', err)
    }
}

export default createSubscription
