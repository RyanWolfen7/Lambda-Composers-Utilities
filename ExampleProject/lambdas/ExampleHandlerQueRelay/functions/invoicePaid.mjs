import { createPayment } from '../shared/services/Postgress.mjs'

const invoicePaid = async (filteredEvent, client) => {
    const { data, customerId } = filteredEvent
    const lineLength = data.lines.data.length

    try {
        await createPayment({
            customerId,
            subscriptionId: data.subscription,
            planId: data.lines.data[0].plan.product,
            priceId: data.lines.data[lineLength - 1].price.id,
            description: data.lines.data[lineLength - 1].price.nickname,
            invoiceId: data.id,
            chargeId: data.charge,
            currency: data.currency,
            created: data.created,
            status: data.status,
            amount: data.amount_paid,
            refunded: data.post_payment_credit_notes_amount > 0,
            refundedAmount: data.post_payment_credit_notes_amount,
            paymentProvider: 'stripe',
            client
        })
    } catch (err) {
        console.log('!!!! Invoice Paid Failed !!!!')
        console.log('CUSTOMER: ', customerId)
        console.log('Data: ', data)
        console.log('ERROR: ', err)
    }
    
}

export default invoicePaid
