export default {
  post: {
    tags: ["User operations"], // operation's tag.
    description: "Send an OTP", // operation's desc.
    operationId: "sendOtpUser", // unique operation id
    consumes: ["text/plain"],
    parameters: [
      // expected params.
      {
        name: "phone_number", // name of the param
        in: "body", // location of the param
        "application/json": {
          schema: {
            type: "number",
            example: 2348139306230,
          },
        },
        required: true, // Mandatory param
        description:
          "Phone number to send OTP. Type Number. Example 2348139306230", // param desc.
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
                type: "string",
                example: "success",
              },
              Details: {
                type: "string",
                description:
                  "An encoded JSON String containing the timestamp, phone number and otp id. " +
                  "To be passed as a body parameter when verifying OTP",
              },
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
