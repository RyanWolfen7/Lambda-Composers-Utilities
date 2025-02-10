import { useOktaJwtVerifier } from "../../services/okta.mjs";
import createResponseObject from "../../functions/createResponseObject.mjs";

const validateAuthorization = async ({ event }, schema) => {
    const { Authorization } = event.headers
    if (!Authorization) throw new Error('You must send an Authorization header');

    const [authType, token] = Authorization.trim().split(' ')
    if (authType !== 'Bearer') throw new Error('Expected a Bearer token')

    let auth = 'Deny';
    const oktaJwtVerifier = await useOktaJwtVerifier()
    try {
        await oktaJwtVerifier.verifyAccessToken(token, 'tbn');
        auth = "Allow"
    }
    catch (err) {
        return { error: createResponseObject({
            status: 500,
            message: err
        }) }
    }

    if (auth === "Deny") return {error: createResponseObject({
        status: 401,
        message: "Your token is not valid"
    })}

    const authResponse = { "principalId": "apigateway.amazonaws.com", "policyDocument": { "Version": "2012-10-17", "Statement": [{ "Action": "execute-api:Invoke", "Resource": ["arn:aws:execute-api:us-west-2:595511454258:542efpj718/*/POST/user/create"], "Effect": auth }] } }
    return { name: 'validateAuthorization', authResponse, schema }
};

export default validateAuthorization
