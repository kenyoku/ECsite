var fs = require('fs');

const Data=[];



let UserData=JSON.stringify({User:Data},null,'')
fs.writeFileSync('../../db/register.json',UserData)