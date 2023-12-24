function errorhandling(err,req,res,next){
    err.statusCode = err.statusCode || process.env.CODE_ISE;

    if(err.code ===11000){
        err.statusCode = 400;
        for(let p in err.keyValue){
            err.message = `${p} have to be unique`;
        }
    }

    if(err.errors){
        err.statusCode = 400;
        err.message = [];
        for(let p in err.errors){
            err.message.push(err.errors[p].properties.message);
        }
    }


    res.status(err.statusCode).json({
        status:'fail',
        message: err.message,
    })
}

module.exports = errorhandling;