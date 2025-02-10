import { updateUserSubscriptionStatus } from '../shared/services/Postgress.mjs'

const deleteSubscription = async (filteredEvent, client) => {
    const { customerId, eventDate, data } = filteredEvent

    try {
        await updateUserSubscriptionStatus({
            customerId, 
            subscriptionId: data.id,
            expires: eventDate, 
            status: "Cancelled", 
            client
        });
    } catch(err) {
        console.log('!!!! Update Subs Failed !!!!')
        console.log('CUSTOMER: ', customerId)
        console.log('Data: ', data)
        console.log('ERROR: ', err)
    }
}

export default deleteSubscription
