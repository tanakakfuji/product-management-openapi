import { defineConfig } from "orval";
export default defineConfig({
  petstore: {
    input: "../api/build/openapi.json",
    output: {
      target: "./src/api/client.ts",
      schemas: "./src/api/model",
      client: "axios",
      baseUrl: "http://localhost:8080/api",
      httpClient: "axios",
    },
  },
});
