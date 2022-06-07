export default {
  post: {
    tags: ["User operations"], // operation's tag.
    description: "Send an OTP", // operation's desc.
    operationId: "sendOtpUser", // unique operation id
    parameters: [
      // expected params.
    ],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/SendOTP",
          },
        },
        // param desc.
      },
    },
    // expected responses
    responses: {
      // response code
      200: {
        description:
          "OTP sent successfully. " +
          "Details contains an encoded JSON String containing the timestamp, " +
          "phone number and otp id. This is to be passed as a body parameter when verifying OTP", // response desc.
        content: {
          // content-type
          "application/json": {
            schema: {
              $ref: "#/components/schemas/SendOTPResponse",
            },
          },
        },
      },
      // response code
      400: {
        description: "Error sending OTP", // response desc.
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
