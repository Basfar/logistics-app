export default {
  components: {
    schemas: {
      _id: {
        type: "string", // data-type
        description: "Database auto generated id", // desc
        example: "6290b8a117bbcaf8b4df5788", // example
      },
      GetLocation: {
        type: "object",
        properties: {
          _id: {
            type: "string", // data-type
            description: "Database auto generated id", // desc
            example: "6290b8a117bbcaf8b4df5788", // example
          },
        },
      },
      SendOTP: {
        type: "object",
        properties: {
          phone_number: {
            type: "number",
            example: 2348139306230,
            description: "Phone number to send OTP.", // param desc.
          },
        },
      },
      SendOTPResponse: {
        type: "object",
        properties: {
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
      VerifyOTP: {
        type: "object",
        properties: {
          check: {
            type: "number",
            example: 2348139306230,
            description: "Phone number OTP was sent to.", // param desc.
          },
          verification_key: {
            type: "string",
            description: "The encoded String returned from send otp route",
          },
          otp: {
            type: "string",
            example: "1234",
            description: "The otp provided by the user",
          },
        },
      },
      VerifyEmail: {
        type: "object",
        properties: {
          check: {
            type: "string",
            example: "example@gmail.com",
            description: "Email OTP was sent to.", // param desc.
          },
          verification_key: {
            type: "string",
            description:
              "The encoded String returned from add personal details",
          },
          otp: {
            type: "string",
            example: "1234",
            description: "The otp provided by the user",
          },
        },
      },
      SetPassword: {
        type: "object",
        properties: {
          password: {
            type: "string",
            example: "password",
            description: "Password provided.", // param desc.
          },
        },
      },
      SetStatus: {
        type: "object",
        properties: {
          status: {
            type: "boolean",
            example: "status",
            description: "Set status of the rider", // param desc.
          },
        },
      },
      AddCompany: {
        type: "object",
        properties: {
          company_id: {
            type: "string",
            example: "company id",
            description: "Company ID provided", // param desc.
          },
          name: {
            type: "string",
            example: "Company Name",
            description: "Company name provided", // param desc.
          },
          email: {
            type: "string",
            example: "example@gmail.com",
            description: "Company email provided", // param desc.
          },
          password: {
            type: "string",
            example: "password",
            description: "Company password provided", // param desc.
          },
        },
      },
      Login: {
        type: "object",
        properties: {
          email: {
            type: "string",
            example: "example@gmail.com",
            description: "Email provided", // param desc.
          },
          password: {
            type: "String",
            description: "Password provided",
            example: "password",
          },
        },
      },
      LoginResponse: {
        type: "object",
        properties: {
          accessToken: {
            type: "string",
            description:
              "A unique access token, saved in cookies with expiration time 3d",
          },
        },
      },
      LogoutResponse: {
        type: "object",
        properties: {
          message: {
            type: "string",
            example: "Successfully logged out",
          },
        },
      },
      BikeAddDetails: {
        type: "object", // data type
        properties: {
          vehicle_type: {
            type: "string", // data-type
            example: "bike",
            description: "Vehicle type provided", // param desc.
          },
          plate_number: {
            type: "string", // data-type
            example: "aaa-en39ej",
            description: "Plate number provided", // param desc.
          },
        },
      },
      PersonalInfo: {
        type: "object", // data type
        properties: {
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
        },
      },
      RemoveRider: {
        type: "object",
        properties: {
          rider_id: {
            type: "string", // data-type
            description:
              "Database auto generated _id of rider selected by admin to be removed", // desc
            example: "6290b8a117bbcaf8b4df5788", // example
          },
        },
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
      OrderIn: {
        type: "object",
        properties: {
          order_id: {
            type: "string", // data-type
            description: "Order id", // desc
            example: "OO-27253", // example
          },
        },
      },
      ChangeRider: {
        type: "object",
        properties: {
          order_id: {
            type: "string", // data-type
            description: "Order id", // desc
            example: "OO-27253", // example
          },
          rider_id: {
            type: "string", // data-type
            description: "Database auto generated rider id", // desc
            example: "6290b8a117bbcaf8b4df5788", // example
          },
        },
      },
      RiderInput: {
        type: "object", // data type
        properties: {
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
          password: {
            type: "string",
            example: "password",
            description: "Rider Password.", // param desc.
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
      LocationInput: {
        type: "object", // data type
        properties: {
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
            example: "delivery or pickup",
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
      LocationInput: {
        type: "object", // data type
        properties: {
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
          quantity: {
            type: "number", // data-type
            description: "Quantity of package", // desc
            example: 30, // example
          },
          pickup_location: {
            type: "string",
            description: "_id of the location of the package", // desc
            example: "6290b8a117bbcaf8b4df5788", // example
          },
        },
      },
      PackageInput: {
        type: "object", // data type
        properties: {
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
          quantity: {
            type: "number", // data-type
            description: "Quantity of package", // desc
            example: 3, // example
          },
          pickup_location: {
            type: "object",
            $ref: "LocationInput",
            description: "location of the package", // desc
          },
        },
      },
      OrderInput: {
        type: "object", // data type
        properties: {
          description: {
            type: "string", // data-type
            description: "Order description", // desc
            example: "Order description", // example
          },
          price: {
            type: "number", // data-type
            description: "Order price", // desc
            example: 15000, // example
          },
          rider_id: {
            type: "string", // data-type
            description: "The _id of rider that is making the delivery", // desc
            example: "6290b8a117bbcaf8b4df5788", // example
          },
          packages: {
            type: "object", // data-type
            $ref: "PackageInput",
            description: "An array of the packages ordered by the user", // desc
          },
          delivery_location: {
            type: "string",
            description: "The _id of the delivery location", // desc
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
            type: "string", // data-type
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
            type: "string",
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
      WalletBalance: {
        type: "object",
        properties: {
          balance: {
            type: "number",
            description: "Wallet balance",
            example: "15000",
          },
        },
      },
      FundWallet: {
        type: "object",
        properties: {
          email: {
            type: "string",
            example: "example@gmail.com",
            description: "User email: can be gotten from get_user route", // param desc.
          },
          currency: {
            type: "string",
            example: "NGN",
            description: "currency to pay", // param desc.
          },
          amount: {
            type: "number",
            example: "15000",
            description: "Amount to fund wallet", // param desc.
          },
          name: {
            type: "string",
            example: "Oghenero Ologe",
            description: "name of user, can be gotten from get_user route", // param desc.
          },
          phone_number: {
            type: "number",
            example: "09033919392",
            description: "User phone number, can be gotten from get_user route", // param desc.
          },
        },
      },
      PayWithCard: {
        type: "object",
        properties: {
          email: {
            type: "string",
            example: "example@gmail.com",
            description: "User email: can be gotten from get_user route", // param desc.
          },
          currency: {
            type: "string",
            example: "NGN",
            description: "currency to pay", // param desc.
          },
          order_id: {
            type: "string", // data-type
            description: "order id", // desc
            example: "OO-27253", // example
          },
          name: {
            type: "string",
            example: "Oghenero Ologe",
            description: "name of user, can be gotten from get_user route", // param desc.
          },
          phone_number: {
            type: "number",
            example: "09033919392",
            description: "User phone number, can be gotten from get_user route", // param desc.
          },
        },
      },
      PayWithWallet: {
        type: "object",
        properties: {
          email: {
            type: "string",
            example: "example@gmail.com",
            description: "User email: can be gotten from get_user route", // param desc.
          },
          order_id: {
            type: "string", // data-type
            description: "order id", // desc
            example: "OO-27253", // example
          },
          name: {
            type: "string",
            example: "Oghenero Ologe",
            description: "name of user, can be gotten from get_user route", // param desc.
          },
          phone_number: {
            type: "number",
            example: "09033919392",
            description: "User phone number, can be gotten from get_user route", // param desc.
          },
        },
      },
      PaymentLink: {
        type: "object",
        properties: {
          link: {
            type: "string",
            description: "Redirect to this link to let user pay",
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
      Success: {
        type: "object",
        properties: {
          message: {
            type: "string", // data type
            description: "Success message", // desc
            example: "Success", // example of an error message
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
