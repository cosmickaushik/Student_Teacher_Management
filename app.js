const express=require("express");
const bodyparser=require("body-parser");
const request=require("request");
const app=express();
const mongoose = require("mongoose");
const upload=require("express-fileupload");
app.use(upload());
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine","ejs");

mongoose.connect('mongodb://localhost:27017/db_name', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

var studentSchema = new mongoose.Schema({
	name: String,
	subject: String,
	feedback: String
});

var Student = mongoose.model("Student",studentSchema);

mongoose.connect('mongodb://localhost:27017/marks_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

var marksSchema = new mongoose.Schema({
	sub1: Number,
	sub2: Number,
	sub3: Number,
	sub4: Number,
	sub5: Number

});

var Marks = mongoose.model("Marks",marksSchema);

app.get("/",function(req,res){
	res.render("login");
});
app.get("/login",function(req,res){
	res.render("login");
});
app.post("/login",function(req,res)
{
	// res.render("dashboard");
	var email=req.body.email;
	var password=req.body.password;
	var data={
		email:email,
		password:password
	}
	if(email==="student@gmail.com"){

		res.redirect("dashboard");
	}
	else{
		res.redirect("admin");
	}
	 
});

		// if(response.statusCode===200)
		// {
		// 	var email=req.body.email;
		// 	var password=req.body.password;
		// 	var data=
		// 	{
		// 		email:email,
		// 	}
		// 	var jsonData=JSON.stringify(data);

		// 	options={
		// 		url:'http://35c2c053.ngrok.io/verify' ,
		// 		method:"POST",
		// 		body:jsonData
		// 	}
		// 	request(options,function(error,response,body)
		// 	{
		// 		var data=JSON.parse(body);
		// 		var name=data.name;
		// 		res.render("dashboard")
		// 	});
		// };
 

app.post("/addfeedback",function(req,res){
	var name1 = req.body.name;
	var subject1 = req.body.subject;
	var feedback1 = req.body.feedback;
	let push = {
		name: name1,
		subject: subject1,
		feedback: feedback1
	}
	Student.create(push,function(err,student){
		if(err){
			console.log(err);
		}
		else{
			console.log(student);
		}
	});
	res.redirect("/admin");
});
app.post("/addmarks",function(req,res){
	var sub1 = req.body.sub1;
	var sub2 = req.body.sub2;
	var sub3 = req.body.sub3;
	var sub4 = req.body.sub4;
	var sub5 = req.body.sub5;
	var push = {
		sub1: sub1,
		sub2: sub2,
		sub3: sub3,
		sub4: sub4,
		sub5: sub5
	}
	 
	Marks.create(push,function(err,marks){
		if(err){
			console.log(err);
		}
		else{
			console.log(marks);
		}
	});
	res.redirect("/dashboard");
});

app.post("/assignments",function(req,res){
	console.log(req.files);
	// if(req.files){
	// 	var file=req.files.filename,
	// 	filename=file.name;
	// 	file.mv("./upload/"+filename,function(err){
	// 		if(err){

	// 		}
	// 		else{
	// 			res.redirect("/assignments");
	// 		}
	// 	});
	// }
});
app.get("/dashboard",function(req,res)
{ Marks.find({},function(err,allmarks){
	if(err){
		console.log(err);
	}
	else{
		res.render("dashboard",{mark:allmarks});
	}
});
	 
});
app.get("/bulletin",function(req,res)
{
	res.render("bulletin");
});
app.get("/feedback",function(req,res)
{
	res.render("feedback");
});
app.get("/grades",function(req,res)
{
	res.render("grades");
});
app.get("/admin",function(req,res){
	Student.find({},function(err,allStudents){
		if(err){
			console.log(err);
		}
		else{
			res.render("admin",{feed: allStudents});
		}
	});
});
app.get("/assignments",function(req,res)
{
	res.render("assignments");
});
app.get("/configure",function(req,res)
{
	res.render("configure");
});
app.get("/curriculum",function(req,res)
{
	res.render("curriculum");
});


app.listen("3000",function()
{
	console.log("Server started at Port 3000");

});