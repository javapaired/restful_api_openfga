import { CredentialsMethod, OpenFgaClient } from "@openfga/sdk";

export const fgaClient = new OpenFgaClient({
  apiUrl: "https://api.us1.fga.dev",
  storeId: "01JWJHWHB9V1W763XFX3J1R6T9",
  authorizationModelId: "01JWJMNYJF10ZTD1NFR0F7FHBB",
  credentials: {
    method: CredentialsMethod.ClientCredentials,
    config: {
      apiTokenIssuer: "auth.fga.dev",
      apiAudience: "https://api.us1.fga.dev/",
      clientId: "FPlUdZnYLUfDBuzwaIRYCpbpSFejncLE",
      clientSecret:
        "CRfvIqjalGDMoMOjsDLu0S5M6qqzhY7cFPsDBuK-_uD8DUy9XSOwT93sxmQoou0s",
    },
  },
});


const object = `user_resource:01JWJHWHB9V1W763XFX3J1R6T9`;
const run = async () => {
  try {
    await fgaClient.write({
      writes: [
        {
          user: "user:admin",
          relation: "writer",
          object: "user_resource:01JWJHWHB9V1W763XFX3J1R6T9",
        },
        {
          user: "user:admin",
          relation: "viewer",
          object: "user_resource:01JWJHWHB9V1W763XFX3J1R6T9",
        },
      ],
    });

    console.log("[✔] Tuple written.");

    const { allowed } = await fgaClient.check({
      user: "user:admin",
      relation: "writer",
      object: object,
    });

    console.log("[🔍] Access allowed?", allowed);
  } catch (err) {
    console.error("[❌] Error:", err.response?.data || err.message);
  }
};

run();
