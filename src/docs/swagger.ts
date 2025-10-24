import swaggerAutogen from "swagger-autogen";

const outputFile = "./swagger.json"; // Where the generated JSON will be saved
const endpointsFiles = ["../routes/*.ts", "../routes/*/*.ts"]; // Path to your Express route files

const config = {
  info: {
    title: "Boilerbuzz Backend",
    description: "API documentation for my Express application",
    version: "1.0.0",
  },
  host: "localhost:3000/api", // INFO: Base API URL
  schemes: ["http", "https"],
  // You can add more configurations here like tags, security definitions, etc.
};

swaggerAutogen(outputFile, endpointsFiles, config);
