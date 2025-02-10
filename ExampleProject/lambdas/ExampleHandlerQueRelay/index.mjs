import updateSubscription from "./functions/updateSubscription.mjs";
import createSubscription from "./functions/createSubscription.mjs";
import createResponseObject from "./shared/functions/createResponseObject.mjs";
import { filterStripeHookEvent } from "./shared/services/stripe.mjs";             
import pg from 'pg'
import getSecretEnvVars from "./shared/services/secrets.mjs";
import createCustomer from "./functions/createCustomer.mjs";
import deleteSubscription from "./functions/deleteSubscription.mjs";
import invoicePaid from "./functions/invoicePaid.mjs";

const { Pool } = pg;

const handleSupportPortal = async (event, secrets) => {
    const records = event.Records;

    const pool = new Pool({
        host: secrets.PG_CONNECTION_URL,
        user: secrets.PG_CONNECTION_USER,
        password: secrets.PG_CONNECTION_PASS,
        database: 'graphql',
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
    })

    const client = await pool.connect()
    // if (client) console.log("======= Client Connected =======")
    let response = createResponseObject({ status: 200, message: "Stripe Webhook Received!" })

    for (const record of records) {
        const { body } = record;
        const filteredEvent = await filterStripeHookEvent(JSON.parse(body));
        if (!filterStripeHookEvent) return createResponseObject({ status: 400 })
        switch (filteredEvent.type) {
            case "customer.created": await createCustomer(filteredEvent, client); break;
            case "customer.subscription.created": await createSubscription(filteredEvent, client); break;
            case "customer.subscription.updated": await updateSubscription(filteredEvent, client); break;
            case "customer.subscription.deleted": await deleteSubscription(filteredEvent, client); break; 
            case "invoice.paid": await invoicePaid(filteredEvent, client); break;
            default: break;
        }
    }

    await client.end()
    // console.log("======= Client Closed =======")
    return response;
};

export const handler = async (event) => {
    const secretenvs = await getSecretEnvVars();
    const response = await handleSupportPortal(event, secretenvs)
    return response
}
