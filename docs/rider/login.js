export default {
  post: {
    tags: ["Rider operations"], // operation's tag.
    description: "Rider Login", // operation's desc.
    operationId: "loginRider", // unique operation id
    parameters: [
      // expected params.
      {
        name: "email", // name of the param
        in: "body", // location of the param
        schema: {
          type: "String",
          example: "example@gmail.com",
        },
        required: true, // Mandatory param
        description: "Email provided by rider", // param desc.
      },
      {
        name: "password", // name of the param
        in: "body", // location of the param
        schema: {
          type: "String",
          example: "password",
        },
        required: true, // Mandatory param
        description: "Password provided by rider", // param desc.
      },
    ],
    // expected responses
    responses: {
      // response code
      200: {
        description: "Login successful", // response desc.
        content: {
          // content-type
          "application/json": {
            schema: {
              accessToken: {
                type: "String",
                description:
                  "A unique access token for rider, saved in cookies with expiration time 3d",
              },
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
