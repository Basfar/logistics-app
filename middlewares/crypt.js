import CryptoJS from "crypto-js";

// First we get our unique key to encrypt our object
// var password = process.env.CRYPT_PASSWORD;

// We then get our unique Initialization Vector
// var iv = Buffer.from(process.env.IV);

// To be used as salt in encryption and decryption
// var ivstring = iv.toString("hex");

// Function to find SHA1 Hash of password key
// function sha1(input) {
//   return crypto.createHash("sha1").update(input).digest();
// }

//Function to get secret key for encryption and decryption using the password
// function password_derive_bytes(password, salt, iterations, len) {
//   var key = Buffer.from(password + salt);
//   for (var i = 0; i < iterations; i++) {
//     key = sha1(key);
//   }
//   if (key.length < len) {
//     var hx = password_derive_bytes(password, salt, iterations - 1, 20);
//     for (var counter = 1; key.length < len; ++counter) {
//       key = Buffer.concat([
//         key,
//         sha1(Buffer.concat([Buffer.from(counter.toString()), hx])),
//       ]);
//     }
//   }
//   return Buffer.alloc(len, key);
// }

var key = CryptoJS.enc.Utf8.parse("93wj660t8fok9jws");
// Please parse the your secret key
var iv = CryptoJS.enc.Utf8.parse(CryptoJS.lib.WordArray.random(128 / 8));

// Function to encode the object
function encode(string) {
  // var key = password_derive_bytes(password, "", 100, 32);
  // // Initialize Cipher Object to encrypt using AES-256 Algorithm
  // var cipher = crypto.createCipheriv("aes-256-cbc", key, ivstring);
  // var part1 = cipher.update(string, "utf8");
  // var part2 = cipher.final();
  // const encrypted = Buffer.concat([part1, part2]).toString("base64");
  const encrypted = CryptoJS.AES.encrypt(
    string,
    process.env.CRYPT_PASSWORD
  ).toString();
  // const encrypted = CryptoJS.AES.encrypt(string, key, {
  //   iv: iv,
  //   padding: CryptoJS.pad.Pkcs7,
  //   mode: CryptoJS.mode.CBC,
  // }).ciphertext.toString(CryptoJS.enc.Base64);
  return encrypted;
}

// Function to decode the object
function decode(string) {
  // var key = password_derive_bytes(password, "", 100, 32);
  // // Initialize decipher Object to decrypt using AES-256 Algorithm
  // var decipher = crypto.createDecipheriv("aes-256-cbc", key, ivstring);
  // var decrypted = decipher.update(string, "base64", "utf8");
  // decrypted += decipher.final();
  // let cipherParams = CryptoJS.lib.CipherParams.create({
  //   ciphertext: CryptoJS.enc.Base64.parse(string),
  // });
  const decrypted = CryptoJS.AES.decrypt(string, process.env.CRYPT_PASSWORD);
  // const decrypted = CryptoJS.AES.decrypt(cipherParams, key, {
  //   iv: iv,
  //   padding: CryptoJS.pad.Pkcs7,
  //   mode: CryptoJS.mode.CBC,
  // }).toString(CryptoJS.enc.Utf8);
  return decrypted.toString(CryptoJS.enc.Utf8);
}

export { encode, decode };
