const message = (otp) => {
  return (
    `Dear User,\n` +
    `${otp} is your otp for Phone Number Verification. Please enter the OTP to verify your phone number.\n` +
    `Regards\n` +
    `Ocius Lite`
  );
};

export { message };
