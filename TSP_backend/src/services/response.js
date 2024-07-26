const sendResponse = (res, status,code, message, data) => {
    res.status(code).send({
        status, message, data
    })
}

module.exports = { sendResponse };