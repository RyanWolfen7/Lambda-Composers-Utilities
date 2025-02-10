import { useStripe } from '../shared/services/stripe.mjs'

// make its own composer when other tenants/payment processors are added
const useCreateUser = async (state) => {
    console.log('Use Create User Start')
    const { email, name, priceId, oktaId, customerId } = state.event.body
    console.log('CustomerID: ', customerId)
    console.log('Body', state.event.body)

    const stripe = await useStripe()
    state.stripe = stripe
    
    console.log('stripe configured')
    const updatedUser = {
        id: oktaId,
        customerId,
        name,
        email,
    }
    state.user = updatedUser
    const updatedSub = {
        priceId
    }
    state.subscription = updatedSub
    console.log('state updated', state)
}

export default useCreateUser
