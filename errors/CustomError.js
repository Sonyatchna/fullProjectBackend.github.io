module.exports = class CustomError extends Error {
    constructor(message = null, status = "400") {
        super(message);
        this.status = "400";
        this.code = "Custom error";
    }
};