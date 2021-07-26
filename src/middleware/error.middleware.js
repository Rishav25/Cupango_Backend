function errorMiddleware(error, req, res, next) {
    let { status = 500, message, data } = error;

    console.log(`[Error] ${error}`);

    // If status code is 500 - change the message to Intrnal server error
    //message = status === 500 || !message ? 'Internal server error also, please check foreign Key Constraints. Check if the data that you are trying to edit exists in the database.' : message;

    error = {
        type: 'error',
        status,
        message,
        ...(data) && data
    }

    res.status(status).send(error);
}

module.exports = errorMiddleware;
/*
{
    type: 'error',
    status: 404,
    message: 'Not Found'
    data: {...} // optional
}
*/
