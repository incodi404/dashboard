const asynchandler = (func) => async(req, res, next) => {
    try {
        return await func(req,res,next)
    } catch (error) {
        return res.status(500).json({ERROR: `ERROR :: ${error}`})
    }
}

export {asynchandler}