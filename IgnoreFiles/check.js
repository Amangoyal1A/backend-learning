class student{

    constructor(){

    }

    home(type)
    {
        let data = this.getInfo(type,1)
        return data+5;
    }

    getInfo(type,status){
        return 10;
    }
    userId(){
        return 5;
    }

    finalmarks(type){

        let internal = this.getinternal(type);
        let external = this.getexternal(type);
        let finalmark = internal + external
return finalmark
    }

    getinternal(type)
    {
        return type+1;
    }


    getexternal(type)
    {
        return type-1;
    }


}
module.exports= student