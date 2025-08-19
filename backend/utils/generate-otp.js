export const generateOTP = (ttl = 300) => {
  const otp = Array.from({ length: 6 }, () =>
    Math.floor(Math.random() * 10)
  ).join("");
  const expiresAt = new Date(Date.now() + ttl * 1000);
  return { otp, expiresAt };
};
