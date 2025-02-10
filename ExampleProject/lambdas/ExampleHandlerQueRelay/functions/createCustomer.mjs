import { createCustomer as saveToDB, getCurrentUserByCustomerId } from '../shared/services/Postgress.mjs'

const createCustomer = async(filteredEvent, client) => {
    const { data, customerId } = filteredEvent

    const user = await getCurrentUserByCustomerId(customerId, client)

    if(!user) {
        try {
            await saveToDB({
                customerId,
                email: data.email,
                name: data.name,
                created: data.created,
                oktaId: data.metadata?.oktaId,
                invoicePrefix: data.invoice_prefix,
                client
            })
        } catch(err) {
            console.log('!!!! Create Customer Failed !!!!')
            console.log('CUSTOMER: ', customerId)
            console.log('Data: ', data)
            console.log('ERROR: ', err)
        }
    }
}

export default createCustomer
