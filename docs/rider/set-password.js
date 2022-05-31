export default {
  post: {
    tags: ["Rider operations"], // operation's tag.
    description: "Set Rider Password", // operation's desc.
    operationId: "setPassword", // unique operation id
    parameters: [
      // expected params.
      {
        name: "password", // name of the param
        in: "body", // location of the param
        schema: {
          type: "String",
          example: "password",
        },
        required: true, // Mandatory param
        description: "Password user provided", // param desc.
      },
    ],
    // expected responses
    responses: {
      // response code
      200: {
        description: "Password set successfully", // response desc.
        content: {
          // content-type
          "application/json": {
            schema: {
              message: {
                type: "String",
                example: "Password set successfully",
              },
            },
          },
        },
      },
      // response code
      400: {
        description: "Password already set", // response desc.
        content: {
          // content-type
          "application/json": {
            schema: {
              Message: {
                type: "String",
                content: "You have already set the password",
              },
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
      500: {
        description: "Error setting password", // response desc.
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
