const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();

app.use(cors());
app.use(bodyparser.json());

//database connection 
const db = mysql.createConnection({
    host:'localhost',
    user :'root',
    password:'',
    database:'recettedb',
    port:3306

});

//check database connection
db.connect(err=>{
    if(err){console.log(err,'dberr');}
    console.log('database connected..');
})


//get all data
app.get('/receipe',(req,res)=>{
    console.log('get receipes');

    let qr=" SELECT * from receipe";
    db.query(qr,(err,result)=>{

        if(err){
            console.log(err,'errs');
        }
        if(result.length>0){
            res.send({
                message : 'all receipes',
                data:result
            });
        }

    });
});

//get single data
app.get('/receipe/:id',(req,res)=>{
    console.log('get single data');

    let gID=req.params.id;
    let qr =`SELECT * FROM receipe WHERE id = ${gID}`;
    db.query(qr,(err,result)=>{
        if(err){
            console.log(err);
        }
        if(result.length>0){
            res.send({
                message:'get single data',
                data:result
            });
        }else{
            res.send({
                message:'Data not availabe',
                data:result
            });
        }
    });


});


//create data
app.post('/receipe',(req,res)=>{
    console.log('createdata');

    let name =req.body.name;
    let ingredients = req.body.ingredients;
    let description =req.body.description;

    let qr =`INSERT INTO receipe (name,ingredients,description) VALUES('${name}','${ingredients}','${description}')`;
    console.log(qr,'qr');

    db.query(qr,(err,result)=>{
        if(err){console.log(err);}

        console.log(result,'result');
       
            res.send({
                message :'data inserted',
              
            });
      
       
    });

});

//update single data
app.put('/receipe/:id',(req,res)=>{

    console.log(req.body,'updatedata');

    let gID = req.params.id;
    let name = req.body.name;
    let ingredients = req.body.ingredients;
    let description = req.body.description;

    console.log(gID ,req.params.id);
   
   let qr = `UPDATE receipe SET name = '${name}', ingredients = '${ingredients}', description = '${description}' WHERE id = ${gID}`;
 
   // console.log(qr,'qr');
    db.query(qr,(err,result)=>{
        if(err){console.log(err);}
        console.log(result,'result');

        res.send({
            message :'data updated'
        });

    });

});

//delete single data
app.delete('/receipe/:id',(req,res)=>{
    let qID=req.params.id;
    let qr=`DELETE from receipe WHERE id='${qID}'`;
    db.query(qr,(err,result)=>{
        if(err){console.log(err);}
        res.send({
            message:'data deleted'
        });
    });
});




//listening to the server
app.listen(3000,()=>{
    console.log('Server running...');
})
