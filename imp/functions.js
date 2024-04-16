function response(sts,msg,aftrows,data = null){
    return{
        status: sts,
        message: msg,
        //informar ou guardar acerca de quantas linhas foram afetadas - armazena info
        affected_rows: aftrows,
        data: data,
        timeStamp: new Date().getTime() 
    }
}

module.exports = {
    response
}