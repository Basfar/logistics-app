export default {
  components: {
    schemas: {
      _id: {
        type: "string", // data-type
        description: "Database auto generated id", // desc
        example: "6290b8a117bbcaf8b4df5788", // example
      },
      // user model
      User: {
        type: "object", // data type
        properties: {
          _id: {
            type: "string", // data-type
            description: "Database auto generated user id", // desc
            example: "6290b8a117bbcaf8b4df5788", // example
          },
          first_name: {
            type: "string", // data-type
            description: "User first name", // desc
            example: "Oghenero", // example
          },
          last_name: {
            type: "string", // data-type
            description: "User last name", // desc
            example: "Ologe", // example
          },
          email: {
            type: "string", // data-type
            description: "User email", // desc
            example: "example@gmail.com", // example
          },
          phone_number: {
            type: "string", // data-type
            description: "User phone number _id", // desc
            example: "string", // example
          },
          otp_verified: {
            type: "boolean", // data-type
            description: "The status of user phone number", // desc
            example: true, // example
          },
          current_location: {
            type: "string", // data-type
            description: "The _id of user location, ref: Location", // desc
            example: "6290b8a117bbcaf8b4df5788", // example
          },
        },
      },
      // rider model
      Rider: {
        type: "object", // data type
        properties: {
          _id: {
            type: "string", // data-type
            description: "Database auto generated rider id", // desc
            example: "6290b8a117bbcaf8b4df5788", // example
          },
          first_name: {
            type: "string", // data-type
            description: "Rider first name", // desc
            example: "Oghenero", // example
          },
          last_name: {
            type: "string", // data-type
            description: "Rider last name", // desc
            example: "Ologe", // example
          },
          email: {
            type: "string", // data-type
            description: "Rider email", // desc
            example: "example@gmail.com", // example
          },
          phone_number: {
            type: "string", // data-type
            description: "Rider phone number _id", // desc
            example: "6290b8a117bbcaf8b4df5788", // example
          },
          otp_verified: {
            type: "boolean", // data-type
            description: "The status of rider phone number", // desc
            example: true, // example
          },
          vehicle_type: {
            type: "string", // data-type
            description: "The vehicle type of rider", // desc
            example: "bike", // example
          },
          plate_number: {
            type: "string", // data-type
            description: "The plate number of rider", // desc
            example: "aaa-jkw392", // example
          },
          current_location: {
            type: "string", // data-type
            description: "The id of rider location, ref: Location", // desc
            example: "6290b8a117bbcaf8b4df5788", // example
          },
        },
      },
      Location: {
        type: "object", // data type
        properties: {
          _id: {
            type: "string", // data-type
            description: "Database auto generated location id", // desc
            example: "6290b8a117bbcaf8b4df5788", // example
          },
          location_id: {
            type: "string", // data-type
            description: "Location id created by user", // desc
            example: "home", // example
          },
          name: {
            type: "string", // data-type
            description: "Location name created by user", // desc
            example: "Home", // example
          },
          type: {
            type: "string",
            description: "Type of location object: delivery or pickup",
            example: "delivery, pickup",
          },
          longitude: {
            type: "double", // data-type
            description: "Location longitude", // desc
            example: 3.439202, // example
          },
          latitude: {
            type: "double", // data-type
            description: "Location latitude", // desc
            example: 6.103408, // example
          },
        },
      },
      // order model
      Package: {
        type: "object", // data type
        properties: {
          _id: {
            type: "string", // data-type
            description: "Database auto generated package id", // desc
            example: "6290b8a117bbcaf8b4df5788", // example
          },
          package_id: {
            type: "string", // data-type
            description: "Random unique package id", // desc
            example: "OO-27253", // example
          },
          package_name: {
            type: "string", // data-type
            description: "Package name", // desc
            example: "Package name", // example
          },
          description: {
            type: "string", // data-type
            description: "Package description", // desc
            example: "Package description", // example
          },
          price: {
            type: "number", // data-type
            description: "Package price", // desc
            example: 10000, // example
          },
          quantity: {
            type: "number", // data-type
            description: "Quantity of package available", // desc
            example: 30, // example
          },
          pickup_location: {
            type: "string",
            description: "_id of the location of the package", // desc
            example: "6290b8a117bbcaf8b4df5788", // example
          },
        },
      },
      Order: {
        type: "object", // data type
        properties: {
          _id: {
            type: "string", // data-type
            description: "Database auto generated order id", // desc
            example: "6290b8a117bbcaf8b4df5788", // example
          },
          order_id: {
            type: "string", // data-type
            description: "Random unique order id", // desc
            example: "OO-27253", // example
          },
          description: {
            type: "string", // data-type
            description: "Order description", // desc
            example: "Order description", // example
          },
          distance: {
            type: "string", // data-type
            description:
              "Distance from rider location to user delivery location", // desc
            example: "2km", // example
          },
          price: {
            type: "number", // data-type
            description: "Order price", // desc
            example: 15000, // example
          },
          eta_pickup: {
            type: "string", // data-type
            description: "Time to pickup order", // desc
            example: "30m", // example
          },
          eta_delivery: {
            type: "string", // data-type
            description: "Time to deliver order", // desc
            example: "40m", // example
          },
          picked_up: {
            type: "boolean", // data-type
            description: "The picked up status of the order", // desc
            example: true, // example
          },
          delivered: {
            type: "boolean", // data-type
            description: "The delivered status of the order", // desc
            example: false, // example
          },
          user_id: {
            type: "string", // data-type
            description: "The _id of user that made the order", // desc
            example: "6290b8a117bbcaf8b4df5788", // example
          },
          rider_id: {
            type: "string", // data-type
            description: "The _id of rider that is making the delivery", // desc
            example: "6290b8a117bbcaf8b4df5788", // example
          },
          packages: {
            type: "[string]", // data-type
            description: "An array of _id of the packages ordered by the user", // desc
            example: "[6290b8a117bbcaf8b4df5788, 6290c277e3bbd3c0de26c41e]", // example
          },
          order_status: {
            type: "string",
            description: "The status of the order", // desc
            enum: ["completed", "pending", "canceled"],
            example: "pending", // example
          },
          paid: {
            type: "boolean",
            description: "The paid status of the order",
            example: false,
          },
          pickup_locations: {
            type: "[string]",
            description:
              "An array of _id of the locations of the packages ordered by the user", // desc
            example: "[6290b8a117bbcaf8b4df5788, 6290c277e3bbd3c0de26c41e]", // example
          },
          delivery_location: {
            type: "string",
            description: "The _id of the delivery location", // desc
            example: "6290b8a117bbcaf8b4df5788", // example
          },
        },
      },
      NotificationUser: {
        type: "object",
        properties: {
          user_id: {
            type: "string", // data-type
            description: "The _id of user that will receive the notification", // desc
            example: "6290b8a117bbcaf8b4df5788", // example
          },
          title: {
            type: "string",
            description: "The title of the notification",
            example: "Notification title",
          },
          content: {
            type: "string",
            description: "The content of the notification",
            example: "Notification content",
          },
          notification_type: {
            type: "string",
            description: "The type of the notification",
            example: "order",
          },
          order_id: {
            type: "string",
            description:
              "The order id of the notification for order type notifications",
            example: "6290b8a117bbcaf8b4df5788",
          },
        },
      },
      NotificationRider: {
        type: "object",
        properties: {
          rider_id: {
            type: "string", // data-type
            description: "The _id of rider that will receive the notification", // desc
            example: "6290b8a117bbcaf8b4df5788", // example
          },
          title: {
            type: "string",
            description: "The title of the notification",
            example: "Notification title",
          },
          content: {
            type: "string",
            description: "The content of the notification",
            example: "Notification content",
          },
          notification_type: {
            type: "string",
            description: "The type of the notification",
            example: "order",
          },
          order_id: {
            type: "string",
            description:
              "The order id of the notification for order type notifications",
            example: "6290b8a117bbcaf8b4df5788",
          },
        },
      },
      // error model
      Error: {
        type: "object", //data type
        properties: {
          message: {
            type: "string", // data type
            description: "Error message", // desc
            example: "Not found", // example of an error message
          },
          internal_code: {
            type: "string", // data type
            description: "Error internal code", // desc
            example: "Invalid parameters", // example of an error internal code
          },
        },
      },
      NotAuth: {
        type: "object", //data type
        properties: {
          message: {
            type: "string", // data type
            description: "Error message", // desc
            example: "User not authenticated", // example of an error message
          },
        },
      },
    },
  },
};
