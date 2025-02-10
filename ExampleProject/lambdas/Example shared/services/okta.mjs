import OktaJwtVerifier from "@okta/jwt-verifier";
import getSecretEnvVars from "./secrets.mjs";

export const  useOktaJwtVerifier = async () => {
    const env = await getSecretEnvVars()
    const { OKTA_ISSUER, OKTA_CLIENT_ID } = env
    const verifier = new OktaJwtVerifier({
        issuer: OKTA_ISSUER,
        clientId: OKTA_CLIENT_ID
    })
    return verifier
} 
