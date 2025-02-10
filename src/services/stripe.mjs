import Stripe from 'stripe'
import { getSecretEnvVars } from './secrets.mjs'

export const useStripe = async () => {
    const secretenvs = await getSecretEnvVars();
    const stripe = await new Stripe(secretenvs.STRIPE_SECRET_KEY)
    return stripe
}

export const validateStripeHook = async (body, signature, hookName, secrets) => {
    console.log("Validating Stripe Hook Start")
    let secretenvs = secrets ? secrets : await getSecretEnvVars()
    const stripe = await new Stripe(secretenvs.STRIPE_SECRET_KEY)
    let event 
    try {
        event = stripe.webhooks.constructEvent(body, signature, secretenvs[hookName])
        console.log("Validating Stripe Hook Success")
    } catch(error) {
        console.log('Webhook Error: ', error.message)
    }
    return event
}   

export const filterStripeHookEvent = async (reqBody) => {
    console.log("Filter Stripe Hook Start")
    const { 
        created: eventDate,
        request,
        data,
        type
    } = reqBody
    if(!type || !data || !request) return null
    const { customer } = data.object
    const customerId = customer ? customer : data.object.id

    const response = {
        eventDate,
        request,
        type, 
        data: data.object,
        prev: data.previous_attributes,
        customerId,
        event: reqBody,
        source: 'webhooks',
        paymentProvider: 'stripe'
    }
    console.log('FilteredEvent: ', response)
    console.log("Filter Stripe Hook Success")
    return response
}

export default {
    useStripe,
    validateStripeHook,
    filterStripeHookEvent
}
