import { getSubByXID } from "../../services/DDB.mjs";

const getCurrentSubscription = async(state) => {
    const { user: { id } } = state
    console.log('==== Get Current SUB START =====')
    try {
        const currentSubscription = await getSubByXID(id);
        if(currentSubscription) {
            const updatedSub = {
                ...currentSubscription,
                hasSubscription: true
            }
            state.subscription = updatedSub
        }
        console.log('==== Get Current SUB END =====')
    } catch(err) {
        console.log("!!! FAILED !!!", err)
    }
    
}

export default getCurrentSubscription
