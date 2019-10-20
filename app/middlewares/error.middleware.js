module.exports = (err, req, res, next) => {
    if (!err) return next();
    if (res.headersSent) {
        return next(err);
    }

    let status;
    let message;
    if (/ValidationError:/.test(err.message)) {
        status = 200;
        message = err.message;
    } else if (/Unauthorized|invalid signature/.test(err.message)) {
        status = 201;
        message = `${err.name}: ${err.message}`;
    } else {
        status = 500;
        message = err.message;
    }

    res.status(status).json({ message });
};
