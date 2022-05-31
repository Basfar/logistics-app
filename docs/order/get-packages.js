export default {
  get: {
    tags: ["Order operations"], // operation's tag.
    description: "Get Packages", // operation's desc.
    operationId: "getPackages", // unique operation id
    parameters: [],
    // expected responses
    responses: {
      // response code
      200: {
        description: "Packages found", // response desc.
        content: {
          // content-type
          "application/json": {
            schema: {
              type: "Array",
              $ref: "#/components/schemas/Package", // user data model
            },
          },
        },
      },
      401: {
        description: "User not authenticated", // response desc.
        content: {
          // content-type
          "application/json": {
            schema: {
              $ref: "#/components/schemas/NotAuth", // error data model
            },
          },
        },
      },
    },
  },
};
