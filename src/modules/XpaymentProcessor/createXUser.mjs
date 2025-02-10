import { createUser } from "../../../services/DDB.mjs"

const createStripeUser = async (state) => {
    console.log('Create Stripe User Start')
    const { stripe, user: {  email, name, id, customerId, exists } } = state
    if(customerId || exists) {
     console.log('Existing Stripe User')
     return null
    }
    console.log('STRIPE: ', stripe)
    console.log('Derails: ', {  email, name, id, customerId, exists })
    try {
        const customer = await stripe.customers.create({
            email: email,
            name: name,
            metadata: {
                oktaId: id
            }
        })  
    
        console.log('Stripe Create Customer: ', customer)          
        state.user.customerId = customer?.id
        createUser({ oktaId: id, customerId: customer.id })
        state.actions.push('createUser')
        state.user.provider = 'stripe'
        console.log('state updated', state)
        console.log('Create Stripe User END')
    } catch(err) {
        console.log('!!! failed to create stripe user !!!', err)
        state.error = { status: 500, error: err, message: 'failed to create stripe user'}
    }
    
}

export default createStripeUser
