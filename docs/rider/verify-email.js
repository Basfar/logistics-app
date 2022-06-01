export default {
  post: {
    tags: ["Rider operations"], // operation's tag.
    description: "Verify Email", // operation's desc.
    operationId: "verifyEmail", // unique operation id
    parameters: [
      // expected params.
      {
        name: "check", // name of the param
        in: "body", // location of the param
        schema: {
          type: "String",
          example: "example@gmail.com",
        },
        required: true, // Mandatory param
        description: "Email OTP was sent to", // param desc.
      },
      {
        name: "verification_key", // name of the param
        in: "body", // location of the param
        schema: {
          type: "String",
        },
        required: true, // Mandatory param
        description: "The encoded String returned from add personal info route", // param desc.
      },
      {
        name: "otp", // name of the param
        in: "body", // location of the param
        schema: {
          type: "String",
        },
        required: true, // Mandatory param
        description: "The otp provided by the user", // param desc.
      },
    ],
    // expected responses
    responses: {
      // response code
      200: {
        description: "OTP sent successfully", // response desc.
        content: {
          // content-type
          "application/json": {
            schema: {
              Status: {
                type: "String",
                example: "success",
              },
              Details: {
                type: "String",
                description: "OTP matched",
              },
            },
          },
        },
      },
      // response code
      400: {
        description: "Error verifying OTP", // response desc.
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
