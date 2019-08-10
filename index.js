var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var Book = require('./create');
var ejs = require('ejs');
var port = 8080;

var db = "mongodb://localhost:27017/mongocrud";
app.set('view engine', 'ejs');
mongoose.connect(db, {useNewUrlParser: true});
//1.get request to show all data on browser
app.get('/books', function(req, res){
        Book.find()
        .exec(function(err,books){
            if(err){
                res.send("no data found");
            }else{
                res.render('books',{
                    message: books
                })
            }
        });
});
//2.To show id wise data on browser
app.get('/book/:id', function(req, res){
    Book.find({_id : req.params.id})
    .exec(function(err,book){
        if(err){
            res.send("error");
        }else{
            res.json(book);
        }
    });
});
//3.To render add newbook page
app.get('/newbook', function(req,res){
    res.render('newbook.ejs')
});

//4.To insert new block into collection which is modelled on creat.js file
var urlencodedParser = bodyparser.urlencoded({ extended: false })

app.post('/addbook',urlencodedParser,function(req,res){
    var book = new Book();
    book.title = req.body.title;
    book.author = req.body.author;
    book.category = req.body.category;

    book.save(function(err,book){
        if(err){
            console.log(err);
        }else{
            res.statusCode = 302;
            res.setHeader("Location", "http://localhost:8080/books");
            res.end();
        }
    })
});
//5.deleting a row using post request when particular you want to delete particular book
app.post('/deletebook',urlencodedParser,function(req,res){
    Book.deleteOne({_id : req.body.id})
    .exec(function(err,book){
        if(err){
            res.send("error");
        }else{
            res.statusCode = 302;
            res.setHeader("Location", "http://localhost:8080/books");
            res.end();
        }
    });
});
//6.deleting a row using get request
app.get('/deletebook/:title', function(req, res){
    Book.deleteOne({title : req.params.title})
    .exec(function(err,book){
        if(err){
            res.send("error");
        }else{
            res.json("row deleted successfully");
        }
    });
});
app.listen(port, function(){
    console.log("server is running on port "+port);
});