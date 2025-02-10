const createXSub
 = async (state) => {
    const { xSub, user, subscription } = state
    const { priceId, hasSubscription } = subscription
    console.log('==== CREATE SUB START =====')
    const { cust_status } = subscription
    if(hasSubscription && cust_status != 'incomplete') {
        console.log('!!! already subscribed !!!')
        return null
    }
    console.log('USER: ', user)

    try {
        const xSubSubscription = await xSub.subscriptions.create({
            customer: user.customerId,
            items: [
                { price: priceId }
            ],
            payment_behavior: "default_incomplete",
            payment_settings: { save_default_payment_method: 'on_subscription' },
            expand: ['latest_invoice.payment_intent']
        })
        console.log('xSub Create Sub: ', xSubSubscription)    
        state.provider = 'xSub'
        state.subscription = xSubSubscription
        console.log("state updated", state)
        console.log('==== CREATE SUB END =====')
    } catch(err) {
        state.error = {
            status: 500,
            error: err
        }
    }
}

export default createXSub

