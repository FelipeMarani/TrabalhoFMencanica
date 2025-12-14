module.exports = {
    secret: process.env.AUTH_SECRET || "trabalhofmencanica-secret",
    expiresIn: process.env.AUTH_EXPIRES || "2h",
};
