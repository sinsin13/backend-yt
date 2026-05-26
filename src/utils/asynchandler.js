
//wrapper function to handle async errors in controllers


//promise based async handler
const asyncHandler = (requesthandler) => (req, res, next) => {
    Promise.resolve(requesthandler(req, res, next)).catch((err) => next(err));
}

/*
const asyncHandler = (fn) => async (req, res, next) =>{
    try{
        await fn(req, res, next);
    }catch(error){
        res.status(error.code || 500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    } 
}
*/

export default asyncHandler;