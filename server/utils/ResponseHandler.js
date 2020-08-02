class ResponseHandler{
    constructor(status, message, data, error){
        this.status = status; 
        this.message = message; 
        this.data = data, 
        this.error = error;
    } 

    result(){
        const finalRes = {};
        finalRes.status = this.status;
        finalRes.message = this.message; 
        if(this.data  !== null){
            finalRes.data = this.data;
        }else if(this.error !== null){
            finalRes.error = this.error;
        }
        return finalRes;
    }
}


export default ResponseHandler; 