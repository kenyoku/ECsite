function writeF(data){
const fs =require('fs');

const hashpass = data.find(user => 'hashedPassword' in user );
if(hashpass){
    fs.writeFile('./db/register.json',JSON.stringify(data,null,' '),function(err){
        if(err)throw err;
        console.log('Registerファイルが正常に書き込まれました。');
});
}
else{
    fs.writeFile('./db/User.json',JSON.stringify(data,null,' '),function(err){
        if(err)throw err;
        console.log('Userファイルが正常に書き込まれました。');
});

}

}

module.exports = writeF;