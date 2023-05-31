const router = require("express").Router();
const express = require('express');
const { body, validationResult } = require("express-validator");
const  writeF   = require("./writeJSON.js");
const  readF   = require("./readJSON.js");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const path =require('path');
const fs=require('fs');
const {writeFile, writeFileSync } =require("fs");


const rootpath = path.resolve(__dirname + '../../source/html');



// static built-in middleware
router.use(express.urlencoded({
  extended: true
}));




//ユーザー新規登録
router.post(
  "/register",
  body("email").isEmail(),
  body("password").matches(/^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,20}$/i)  ,
  async (req, res) => {

    const { email, password } = req.body;
    console.log(email, password);
    //入力欄のバリデーションチェック。
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("validationエラー");
      res.redirect(302,"/validationfalse");

      //res.status(400).json({ errors: errors.array() });
    }
    else{

    //DBにユーザーが存在するかのチェック。存在したらエラーを吐かせる。
    const Userstr=readF.UF();
    const user = Userstr.find((user) => user.email === email);
    if (user) {
      console.log("そのユーザーは使用されています");
      res.redirect(302,"/userused");
      
    }
    else{

     //パスワードのハッシュ化(ランダムな文字列。復号するのは非常に困難)
    let hashedPassword = await bcrypt.hash(password, 10);
    Userstr.push({
      email,
      password: password,
    });
     writeF(Userstr)

     const Regstr=readF.RF();
     Regstr.push({
      
        email: email,
        hashedPassword: hashedPassword,
      });
    
     writeF(Regstr)


    //トークンの発行(JWT)->セッションIDみたいなもの。トークン=許可証を渡す。
    const token = await JWT.sign(
      {
        email,
      },
      "SECRET_KEY",
      { expiresIn: 60 }
    );

    console.log(email, password);
    // return res.send("auth ok");
    res.redirect(302,"/myaccount");
    /*
    return res.json({
      token: token,
    });
    */


    }
    
  } 
  }
);

router.post("/login", async (req, res ) => {
  const { email, password } = req.body;

  const User=readF.UF();
  const user = User.find(user => (user.email === email) );



  if (!user||user===undefined) {
    
    res.redirect(302,"/loginfalse");


   

    
  }
  else 
  {
    const hashedPassword = await bcrypt.hash(password, 10);
    const isMatch = await bcrypt.compare(user.password,hashedPassword);

  
    if(!isMatch){
     
      res.redirect(302,"/loginfalse");


    }
    else{
   
      const token = await JWT.sign(
        {
          email,
        },
        "SECRET_KEY",
        { expiresIn: 60 }
      );
      res.redirect(302,"/index/homepage");


    }
   

  }


 

});

router.get("/allUsers", (req, res) => {
  return res.json(User);
});





module.exports = router;

