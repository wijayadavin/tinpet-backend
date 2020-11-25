module.exports = {
  secret: process.env.JWT_SECRET,
  options: {
    algorithm: "HS256",
    expiresIn: "30d", // 👈 extend the expired time if you want to develop features! So you don't need to relogin
    issuer: 'api.tinpet.com',
    audience: 'tinpet.com',
  },
};