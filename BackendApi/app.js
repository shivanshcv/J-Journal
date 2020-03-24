var express=require('express');
var app=express();
var mongoose=require('mongoose');
var methodOverride=require("method-override");
var bodyParser=require('body-parser');
var cors=require('cors');
var Schema=mongoose.Schema;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(methodOverride("_method"));


mongoose.connect('mongodb://localhost:27017/blogSite', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useCreateIndex', true);


var blogSchema=Schema({
    title:String,
    image:String,
    description:String,
    comments:[{
        name:String,
        comment:String,
        commentDate:{type:Date,default:Date.now}
    }],
    createdDate:{type:Date,default:Date.now}
});

var userSchema=Schema({
    name:String,
    email:String,
    password:String,
    blogs:[blogSchema]
});
var User=mongoose.model("User",userSchema);


app.get("/blogs",function(req,res){
    var blogs=[];
    User.find({},function(err,allUsers){
        if(err)
            console.log(err);
        else
        {
            allUsers.forEach(oneUser=> {
                blogs=blogs.concat(oneUser.blogs);
                
                
            });
            res.json(blogs);
        }
    })
})

app.post("/register",function(req,res){
    User.findOne({email:req.body.email},function(err,foundUser){
        if(foundUser)
            {
                console.log("USER ALREADY EXISTS");
                id=null;
                res.json({"id":"","err":"User Already Registered"});
            }
        else
        {
            User.create(req.body,function(err,registerdUser){

                if(err)
                    console.log(err);
                else{
                    console.log(registerdUser);
                    id=registerdUser._id;
                    res.json({"id":registerdUser._id,"err":""})
                }
                });
        }
    })
    
    
})


app.post("/login",function(req,res){
    User.findOne({email:req.body.email},function(err,foundUser){
        if(!foundUser)
        {
            console.log("nahi h koi aisa");
            id=null;
            res.json({"id":""});
        }
        else{
            if(foundUser.password===req.body.password)
            {
                console.log("sahi h user");
                id=foundUser._id;
                res.json({"id":foundUser._id});
            }
            else
            {
                console.log("password galat");
                id=null;
                res.json({"id":""});
            }
        }
    })
})

app.post("/blogs/new/:id",function(req,res){


    
    User.findById(req.params.id,function(err,selectedUser){
        console.log("theek")
        if(err)
            console.log(err);
        else
        {
            
            selectedUser.blogs.push(req.body);
            selectedUser.save(function(err,savedUser){
                if(err)
                    console.log(err);
                else
                {
                    console.log(savedUser);
                }
            })
            
                
               
                
        }
    })
   
});

app.get("/blogs/:id/edit",function(req,res){
    User.find({},function(err,allUsers){
        if(err)
            console.log(err);
        else
            {
                
                allUsers.forEach(user => {
                    user.blogs.forEach(blog=>{
                        if(blog._id==req.params.id)
                            {
                                res.json(blog);
                                return;
                            }

                    })
                    
                    
                });
            }
    });
});

app.put("/blogs/:idUser/:idBlog",function(req,res){
    User.findById(req.params.idUser,function(err,user){
        if(err)
            console.log(err);
        else
        {
            user.blogs.id(req.params.idBlog).title=req.body.title;
            user.blogs.id(req.params.idBlog).image=req.body.image;
            user.blogs.id(req.params.idBlog).description=req.body.description;
            user.save(function(err,savedUser){
                if(err)
                    console.log(err);
                else
                    console.log(savedUser);
                    
                    
                    
            })
            
        }
            
    })
}); 
app.delete("/blogs/:idUser/:idBlog",function(req,res){
    User.findById(req.params.idUser,function(err,user){
        if(err)
            console.log(err);
        else
        {
            user.blogs.id(req.params.idBlog).remove();
            user.save(function(err,savedUser){
                if(err)
                    console.log(err);
                else
                console.log(savedUser);
                
                    
            })
            
        }
            
    })
}); 

app.get("/blogs/:id",function(req,res){

    User.find({},function(err,allUsers){
        if(err)
            console.log(err);
        else
            {
                
                allUsers.forEach(user => {
                    user.blogs.forEach(blog=>{
                        if(blog._id==req.params.id)
                            {
                                res.json(blog);
                                return;
                            }

                    })
                    
                    
                });
            }
    });
});


app.post("/blogs/:idUser/:idBlog",function(req,res){
    User.findById(req.params.idUser,function(err,user){
        if(err)
            console.log(err);
        else
        {
            user.blogs.id(req.params.idBlog).comments.push(req.body);
            user.save(function(err,savedUser){
                if(err)
                    console.log(err);
                else
                    console.log(savedUser);
                    
                    
            })
        }
    })
});




app.listen(1000,function(){
    console.log("PORT 1000!!!")
});