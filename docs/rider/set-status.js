export default {
  post: {
    tags: ["Rider operations"], // operation's tag.
    description: "Set Rider Password", // operation's desc.
    operationId: "setStatus", // unique operation id
    parameters: [
      // expected params.
    ],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/SetStatus",
          },
        },
        // param desc.
      },
    },
    // expected responses
    responses: {
      // response code
      200: {
        description: "Status set successfully", // response desc.
        content: {
          // content-type
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Success",
            },
          },
        },
      },
      // response code
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
      500: {
        description: "Error setting status", // response desc.
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
