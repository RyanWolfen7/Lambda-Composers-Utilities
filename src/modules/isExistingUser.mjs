import { getCurrentUserByAuthID } from "../../services/DDB.mjs";

const isExistingUser = async(state) => {
    const { id, user } = state.user
    state.user.exists = false

    const currentUser = await getCurrentUserByAuthID(id, "0");
    if(currentUser) {
        const updatedUser = {
            ...user,
            customerId: currentUser.customer_id,
            exists: true
        }
        state.user = updatedUser
        console.log('state updated', state)
    }
}

export default isExistingUser
