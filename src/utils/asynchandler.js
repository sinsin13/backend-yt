
//wrapper function to handle async errors in controllers


//promise based async handler
const asyncHandler = (requesthandler) => (req, res, next) => {
    Promise.resolve(requesthandler(req, res, next)).catch((err) => next(err));
}


export {asyncHandler};