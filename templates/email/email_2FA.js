const subject_mail = "OTP: For Login";

const message = (otp) => {
  return (
    `Dear User, \n\n` +
    "OTP for Login is : \n\n" +
    `${otp}\n\n` +
    "This is a auto-generated email. Please do not reply to this email.\n\n" +
    "Regards\n" +
    "Oghenero Ologe\n\n"
  );
};

export { subject_mail, message };
