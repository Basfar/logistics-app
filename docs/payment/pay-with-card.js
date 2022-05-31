export default {
  post: {
    tags: ["Payment operations"], // operation's tag.
    description: "Pay With Card", // operation's desc.
    operationId: "payWithCard", // unique operation id
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
        description: "User email: can be gotten from get_user route", // param desc.
      },
      {
        name: "currency", // name of the param
        in: "body", // location of the param
        schema: {
          type: "String",
          example: "NGN",
        },
        required: true, // Mandatory param
        description: "currency to pay", // param desc.
      },
      {
        name: "order_id", // name of the param
        in: "body", // location of the param
        schema: {
          type: "String",
          example: "OO-27253",
        },
        required: true, // Mandatory param
        description: "Order id that is being paid for", // param desc.
      },
      {
        name: "name", // name of the param
        in: "body", // location of the param
        schema: {
          type: "String",
          example: "Oghenero Ologe",
        },
        required: true, // Mandatory param
        description: "name of user, can be gotten from get_user route", // param desc.
      },
      {
        name: "phone_number", // name of the param
        in: "body", // location of the param
        schema: {
          type: "Number",
          example: "09033919392",
        },
        required: true, // Mandatory param
        description: "User phone number, can be gotten from get_user route", // param desc.
      },
    ],
    // expected responses
    responses: {
      // response code
      200: {
        description: "Flutterwave payment link", // response desc.
        content: {
          // content-type
          "application/json": {
            schema: {
              link: {
                type: "String",
                description: "Redirect to this link to let user pay",
              },
            },
          },
        },
      },
      401: {
        description: "User not authenticated", // response desc.
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
        description: "Error getting payment link", // response desc.
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
