import { createUserAudit } from '../../services/DDB.mjs'

const updateUserAudit = async (state) => {
    const { user, actions } = state
    const isCreateUser = actions.includes('createUser')
    console.log("Update User Audit Start")
    if(isCreateUser) {
        try {
            await createUserAudit({
                authId: user.id,
                customerId: user.customerId,
                paymentProvider: user.provider,
                source: user.provider,
            })
            console.log("Update User Audit Success")
        } catch(err) {
                console.log("!!!! FAILED TO CREATE USER AUDIT!!!!")
                console.log("Error: ", err)
        }
    }
}

export default updateUserAudit
