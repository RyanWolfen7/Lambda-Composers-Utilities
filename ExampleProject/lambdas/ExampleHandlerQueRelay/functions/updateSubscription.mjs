import { 
    updateUserPriceId,
    updateUserSubscriptionStatus,
} from '../shared/services/Postgress.mjs'

const updateSubscription = async (filteredEvent, client) => {
    const { data, customerId, prev } = filteredEvent

    const previousPlanInterval = prev?.plan?.interval;
    const currentPlanInterval = data.plan?.interval;
    const expires = data.current_period_end;
    const priceId = data.plan?.id;
    const isActive = data.plan?.active;
    const isCancellationRequested = data.cancellation_details?.reason === "cancellation_requested"

    if (previousPlanInterval && previousPlanInterval !== currentPlanInterval) {
        await updateUserPriceId({ subscriptionId: data.id, customerId, priceId, expires, client });
    } 
    
    if (isCancellationRequested) {
        await updateUserSubscriptionStatus({ 
            subscriptionId: data.id,
            customerId, 
            expires, 
            status: "Cancel", 
            client 
        });
    }
    if (isActive && !isCancellationRequested) {
        await updateUserSubscriptionStatus({
            subscriptionId: data.id,
            customerId, 
            expires, 
            status: "Active", 
            client 
        });
    }
}

export default updateSubscription
