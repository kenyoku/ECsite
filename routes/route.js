const express = require("express");
const router = express.Router();
const path =require('path');
const rootpath = path.resolve(__dirname + '../../source/html');







  router.get("/", (req, res ) => {
    res.sendFile(rootpath+'/index.html');
  });
  router.get("/index.html", (req, res) => {
    res.sendFile(rootpath+'/index.html');
  });

router.get("/register.html", (req, res) => {
    res.sendFile(rootpath+'/register.html');
  });

  router.get("/login.html", (req, res) => {
    res.sendFile(rootpath+'/login.html');
  });
 
  router.get("/myaccount", (req, res) => {
    res.sendFile(rootpath+'/myaccount.html');
  });  
  router.get("/myindex", (req, res) => {
    res.sendFile(rootpath+'/myindex.html');
  });

router.get("/validationfalse", (req, res) => {
    res.sendFile(rootpath+'/validationfalse.html');
});
router.get("/loginfalse", (req, res) => {
  res.sendFile(rootpath+'/loginfalse.html');
});
router.get("/userused", (req, res) => {
  res.sendFile(rootpath+'/userused.html');
});
router.get("/index/homepage", (req, res) => {
  
  res.sendFile(rootpath+'/myindex.html');
});

router.get("/index/index.html", (req, res) => {
  
 // res.sendFile(rootpath+'/index.html');
  res.redirect('/myindex');
});

router.get("/index/myaccount.html", (req, res) => {
  res.sendFile(rootpath+'/myaccount.html');
});  



  module.exports = router
