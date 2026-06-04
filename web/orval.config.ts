import { defineConfig } from "orval";
export default defineConfig({
  petstore: {
    input: "../api/build/openapi.json",
    output: {
      target: "./src/api/api.ts",
      schemas: "./src/api/model",
      client: "react-query",
      baseUrl: "http://localhost:8080",
      httpClient: "axios",
    },
  },
});
