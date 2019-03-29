module.exports = {
    handleOk(res, promise) {
        promise
            .then(data => {
                res.send(data);
            })
            .catch(error => {
                console.log('catched error', error.message);
                res.status(error.status);
                res.send(error.message);
            });
    }
};