export default {
  post: {
    tags: ["Admin operations"], // operation's tag.
    description: "Admin Login", // operation's desc.
    operationId: "loginAdmin", // unique operation id
    parameters: [
      // expected params.
    ],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/Login",
          },
        },
        // param desc.
      },
    },
    // expected responses
    responses: {
      // response code
      200: {
        description: "Login successful", // response desc.
        content: {
          // content-type
          "application/json": {
            schema: {
              $ref: "#/components/schemas/LoginResponse",
            },
          },
        },
      },
      401: {
        description: "Wrong password", // response desc.
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
      500: {
        description: "Error logging in", // response desc.
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
