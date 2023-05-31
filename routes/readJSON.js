function readUF(){
    const fs =require('fs');
    
     data=fs.readFileSync('./db/User.json', 'utf-8' );
       
        return JSON.parse(data);
    
}
    
function readRF()
{
    const fs =require('fs');
    
     data=fs.readFileSync('./db/register.json', 'utf-8' );
       
        return JSON.parse(data);
    
}

module.exports={

    RF:readRF,
    UF:readUF,

}
