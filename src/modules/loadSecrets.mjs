import getSecretEnvVars from '../../services/secrets.mjs'

const loadSecrets = async(state) => {
    state.env =  await getSecretEnvVars()
}

export default loadSecrets
