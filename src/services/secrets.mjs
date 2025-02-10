/* eslint-disable no-undef */
import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";

const secret_name = process.env.SVOD_PPP_SECRET_ARN;
const client = new SecretsManagerClient({ region: "us-west-2" });

export const getSecretEnvVars = async () => {
    const response = await client.send(
        new GetSecretValueCommand({
            SecretId: secret_name,
            VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
        })
    );
    

    const secret = response.SecretString;
    console.log('Retrieving secrets from:', secret);
    const convSecretenvs = JSON.parse(secret);
    return convSecretenvs;
};

export default getSecretEnvVars;
