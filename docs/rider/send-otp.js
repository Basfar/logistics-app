export default {
  post: {
    tags: ["Rider operations"], // operation's tag.
    description: "Send an OTP", // operation's desc.
    operationId: "sendOtpRider", // unique operation id
    parameters: [
      // expected params.
      {
        name: "phone_number", // name of the param
        in: "body", // location of the param
        schema: {
          type: "Number",
          example: "2348139306230"
        },
        required: true, // Mandatory param
        description: "Phone number to send OTP", // param desc.
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
