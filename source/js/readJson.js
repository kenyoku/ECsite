const fs =require('fs');


const jsonObject = JSON.parse(fs.readFileSync('../../db/register.js', 'utf8'));
const result = {};

jsonObject.User.forEach((obj) => {
    result[obj.date] = obj;
    console.log(obj.Name, obj.age ,obj.weight )
});