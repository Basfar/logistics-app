export default {
  post: {
    tags: ["User operations"], // operation's tag.
    description: "Verify OTP", // operation's desc.
    operationId: "verifyOtp", // unique operation id
    parameters: [
      // expected params.
      {
        name: "check", // name of the param
        in: "body", // location of the param
        schema: {
          type: "Number",
          example: "2348139306230",
        },
        required: true, // Mandatory param
        description: "Phone number OTP was sent to", // param desc.
      },
      {
        name: "verification_key", // name of the param
        in: "body", // location of the param
        schema: {
          type: "String",
        },
        required: true, // Mandatory param
        description: "The encoded String returned from send otp route", // param desc.
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
        description: "OTP verified successfully", // response desc.
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
              accessToken: {
                type: "String",
                description:
                  "A unique access token for user, saved in cookies with expiration time 3d",
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
