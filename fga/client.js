import { CredentialsMethod, OpenFgaClient } from "@openfga/sdk";

// console.log(
//   "[FGA] Token starts with:",
//   process.env.FGA_API_TOKEN?.slice(0, 10) + "..."
// );
export const fgaClient = new OpenFgaClient({
  apiUrl: process.env.FGA_API_URL,
  storeId: process.env.FGA_STORE_ID,
  authorizationModelId: process.env.FGA_AUTHORIZATION_MODEL_ID,
  credentials: {
    method: CredentialsMethod.ClientCredentials,
    config: {
      apiTokenIssuer: process.env.FGA_TOKEN_ISSUER,
      apiAudience: process.env.FGA_API_AUDIENCE,
      clientId: process.env.FGA_CLIENT_ID,
      clientSecret: process.env.FGA_CLIENT_SECRET,
    },
  },
});

// Check for access
const { allowed } = await fgaClient.check({
  user: "user:admin",
  relation: "writer",
  object: process.env.FGA_OBJECT_ID,
});

console.log("[🔍] Admin Access allowed?", allowed);
