export default {
  get: {
    tags: ["Rider operations"], // operation's tag.
    description: "Get Rider", // operation's desc.
    operationId: "getRider", // unique operation id
    parameters: [],
    // expected responses
    responses: {
      // response code
      200: {
        description: "Rider found", // response desc.
        content: {
          // content-type
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Rider", // user data model
            },
          },
        },
      },
      401: {
        description: "Rider not authenticated", // response desc.
        content: {
          // content-type
          "application/json": {
            schema: {
              $ref: "#/components/schemas/NotAuth", // error data model
            },
          },
        },
      },
      // response code
      404: {
        description: "Rider not found", // response desc.
        content: {
          // content-type
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Error", // error data model
            },
          },
        },
      },
    },
  },
};
