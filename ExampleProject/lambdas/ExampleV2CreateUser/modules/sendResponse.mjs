const sendResponse = async(state) => {
    const { subscription, user } = state
    state.res = {
        status: 200,
        message: 'Success',
        body: {
            subscriptionId: subscription.id,
            start: subscription.current_period_start,
            expires: subscription.current_period_end,
            clientSecret: subscription.latest_invoice.payment_intent.client_secret,
            customerId: user.customerId
        }
    }
}

export default sendResponse
