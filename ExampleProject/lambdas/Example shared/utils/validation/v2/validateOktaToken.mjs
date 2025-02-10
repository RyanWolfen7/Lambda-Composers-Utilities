import { useOktaJwtVerifier } from "../../../services/okta.mjs"

const validateOktaToken = async (state) => {
    const { user: { token } } = state
    const oktaJwtVerifier = await useOktaJwtVerifier()

    console.log("======= AUTHORIZE JWT START ========")
    try {
        const jwtVerifyResponse = await oktaJwtVerifier.verifyAccessToken(token, 'tbn')
        const { lastName, firstName } = jwtVerifyResponse.claims

        state.user.firstName = firstName
        state.user.lastName = lastName
    } catch(err) {
        console.log('!!!!! ERR !!!!!!', err)
        state.error({ status: 401, message: err, error: "Unauthorized"})
    }
    console.log("======= AUTHORIZE JWT End ========")
}

export default validateOktaToken
