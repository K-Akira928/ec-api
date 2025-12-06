import { OpenAPIRegistry, OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";

export const registry = new OpenAPIRegistry();

export const generateOpenApiDoc = () => {
  const generator = new OpenApiGeneratorV3(registry.definitions);

  return generator.generateDocument({
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "EC API Documentation",
      description: "ECサイト用APIの仕様書です",
    },
    servers: [{ url: "http://localhost:3000" }],
  });
};
