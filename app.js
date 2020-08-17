const express=require("express");
const bodyparser=require("body-parser");
// const request=require("request");
const app=express();
const mongoose = require("mongoose");
// const upload=require("express-fileupload");
// app.use(upload());
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine","ejs");

mongoose.connect('mongodb://localhost:27017/portal_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to Portal Database!'))
.catch(error => console.log(error.message));

var feedbackSchema = new mongoose.Schema({
	name: String,
	subject: String,
	feedback: String
});

var Feedback = mongoose.model("Feedback",feedbackSchema);



var janSchema = new mongoose.Schema({
	total: Number
});

var Jan = mongoose.model("Jan",janSchema);

var febSchema = new mongoose.Schema({
	total: Number
});

var Feb = mongoose.model("Feb",febSchema);

var marSchema = new mongoose.Schema({
	total: Number
});

var Mar = mongoose.model("Mar",marSchema);

var aprSchema = new mongoose.Schema({
	total: Number
});

var Apr = mongoose.model("Apr",aprSchema);

var maySchema = new mongoose.Schema({
	total: Number
});

var May = mongoose.model("May",maySchema);

var junSchema = new mongoose.Schema({
	total: Number
});

var Jun = mongoose.model("Jun",junSchema);

var julSchema = new mongoose.Schema({
	total: Number
});

var Jul = mongoose.model("Jul",julSchema);

var augSchema = new mongoose.Schema({
	total: Number
});

var Aug = mongoose.model("Aug",augSchema);

var sepSchema = new mongoose.Schema({
	total: Number

});

var Sep = mongoose.model("Sep",sepSchema);

var doubtSchema = new mongoose.Schema({
	subject: String,
	doubt: String,
	date: {
		type: Date,
		default: Date.now
	}
});

// var marksSchema = new mongoose.Schema({
// 	month: String,
// });

var Doubt = mongoose.model("Doubt",doubtSchema);

var assignmentSchema = new mongoose.Schema({
	subject: String,
	due: Date,
	credit: Number,
	date: {
		type: Date,
		default: Date.now
	}
});

var Assignment = mongoose.model("Assignment",assignmentSchema);

var uploadSchema = new mongoose.Schema({
	roll: String,
	id: String,
	date: {
		type: Date,
		default: Date.now
	}

});

var Upload = mongoose.model("Upload",uploadSchema);

var subjectSchema = new mongoose.Schema({
	subject: String
});

var Subject = mongoose.model("Subject",subjectSchema);

var msubjectSchema = new mongoose.Schema({
	msubject: String
});

var Msubject = mongoose.model("Msubject",msubjectSchema);




app.post("/addsubject",function(req,res){
	var subject = req.body.subject;
	// var addsubject = {
	// 	subject : subject
	// }
	Subject.create({subject},function(err,addedsubject){
		if(err){
			console.log(err);
		}
		else{
			console.log(addedsubject);
		}
	});
	res.redirect("/configure");
});

app.post("/addmainsubject",function(req,res){
	var msubject = req.body.msubject;
	// var addsubject = {
	// 	subject : subject
	// }
	Msubject.create({msubject},function(err,addedmsubject){
		if(err){
			console.log(err);
		}
		else{
			console.log(addedmsubject);
		}
	});
	res.redirect("/configure");
});


app.post("/uploadassignment",function(req,res){
	var roll = req.body.roll;
	var id = req.body.id;
	var uploadassignment = {
		roll: roll,
		id: id
	}
	Upload.create(uploadassignment,function(err,currentassignment){
		if(err){
			console.log(err);
		}
		else{
			console.log(currentassignment);
		}
	});
	res.redirect("/assignments");
});

app.post("/adddoubt",function(req,res){
	var subject = req.body.subject;
	var doubt = req.body.doubt;
	let doubtpush = {
		subject: subject,
		doubt: doubt
		// date: Date()
	}
	Doubt.create(doubtpush,function(err,doubtInfo){
		if(err){
			console.log(err);
		}
		else{
			console.log(doubtInfo);
		}
	});
	res.redirect("/doubts");
});


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
	var name = req.body.name;
	var subject = req.body.subject;
	var feedback = req.body.feedback;
	let feedbackpush = {
		name: name,
		subject: subject,
		feedback: feedback
	}
	Feedback.create(feedbackpush,function(err,feedback){
		if(err){
			console.log(err);
		}
		else{
			console.log(feedback);
		}
	});
	res.redirect("/feedback");
});

app.post("/addmarks",function(req,res){
	var month = req.body.month;

	var sub0 = req.body.sub0;
	console.log(month)
	console.log(typeof month)
	console.log(sub0)
	console.log(typeof sub0)

	// 	Msubject.countDocuments({},function(err,mcount){
	// 		if(err){
	// 			console.log(err);
	// 		}
	// 		else{
	// 			Subject.countDocuments({},function(err,count){
	// 				if(err){
	// 					console.log(err);
	// 				}
	// 				else{

	// 					// console.log(typeof mcount);
	// 					// console.log(typeof count);

	// 					// var variable = ("sub"+0).toString();
	// 					// console.log(typeof variable);

	// 					// for(var i=0;i<mcount;i++){

	// 						for(var msub in req.body) {
	// 							  if(req.body.hasOwnProperty(msub)){
	// 							    //do something with e.g. req.body[key]
	// 							    total = total + Number(req.body[msub]);
	// 							  }
	// 							}
	// 							console.log(total);
	// 							console.log(typeof total);


	// 					// 	var variable = "sub"+0;
	// 					// console.log(req.body.variable);
	// 					// console.log(typeof Number(req.body.variable));

	// 					// 	var mmarks = Number(req.body.variable);
	// 					// 	total = total + mmarks;
	// 					// }
	// 					// console.log(total);
	// 				}				
		// 		});
	// 		}
	// 	});
	// }
	// res.redirect("/admin");

	if(month==="0"){
		var totalmarks = 0;

		for(var msub in req.body) {
		  if(req.body.hasOwnProperty(msub)){
		    totalmarks = totalmarks + Number(req.body[msub]);
		  }
		}

		var push = {
			total: totalmarks
		}

		Jan.create(push,function(err,totalmarks){
			if(err){
				console.log(err);
			}
			else{
				res.redirect("/admin");
			}
		});
	}


	if(month==="1"){
		var totalmarks = 0;

		for(var msub in req.body) {
		  if(req.body.hasOwnProperty(msub)){
		    totalmarks = totalmarks + Number(req.body[msub]);
		  }
		}

		var push = {
			total: totalmarks
		}

		Feb.create(push,function(err,totalmarks){
			if(err){
				console.log(err);
			}
			else{
				res.redirect("/admin");
			}
		})
	}

	if(month==="2"){
		var totalmarks = 0;

		for(var msub in req.body) {
		  if(req.body.hasOwnProperty(msub)){
		    totalmarks = totalmarks + Number(req.body[msub]);
		  }
		}

		var push = {
			total: totalmarks
		}

		Mar.create(push,function(err,totalmarks){
			if(err){
				console.log(err);
			}
			else{
				res.redirect("/admin");
			}
		})
	}

	if(month==="3"){
		var totalmarks = 0;

		for(var msub in req.body) {
		  if(req.body.hasOwnProperty(msub)){
		    totalmarks = totalmarks + Number(req.body[msub]);
		  }
		}

		var push = {
			total: totalmarks
		}

		Apr.create(push,function(err,totalmarks){
			if(err){
				console.log(err);
			}
			else{
				res.redirect("/admin");
			}
		})
	}

	if(month==="4"){
		var totalmarks = 0;

		for(var msub in req.body) {
		  if(req.body.hasOwnProperty(msub)){
		    totalmarks = totalmarks + Number(req.body[msub]);
		  }
		}

		var push = {
			total: totalmarks
		}

		May.create(push,function(err,totalmarks){
			if(err){
				console.log(err);
			}
			else{
				res.redirect("/admin");
			}
		})
	}

	if(month==="5"){
		var totalmarks = 0;

		for(var msub in req.body) {
		  if(req.body.hasOwnProperty(msub)){
		    totalmarks = totalmarks + Number(req.body[msub]);
		  }
		}

		var push = {
			total: totalmarks
		}

		Jun.create(push,function(err,totalmarks){
			if(err){
				console.log(err);
			}
			else{
				res.redirect("/admin");
			}
		})
	}

	if(month==="6"){
		var totalmarks = 0;

		for(var msub in req.body) {
		  if(req.body.hasOwnProperty(msub)){
		    totalmarks = totalmarks + Number(req.body[msub]);
		  }
		}

		var push = {
			total: totalmarks
		}

		Jul.create(push,function(err,totalmarks){
			if(err){
				console.log(err);
			}
			else{
				res.redirect("/admin");
			}
		})
	}

	if(month==="7"){
		var totalmarks = 0;

		for(var msub in req.body) {
		  if(req.body.hasOwnProperty(msub)){
		    totalmarks = totalmarks + Number(req.body[msub]);
		  }
		}

		var push = {
			total: totalmarks
		}

		Aug.create(push,function(err,totalmarks){
			if(err){
				console.log(err);
			}
			else{
				res.redirect("/admin");
			}
		})
	}

	if(month==="8"){
		var totalmarks = 0;

		for(var msub in req.body) {
		  if(req.body.hasOwnProperty(msub)){
		    totalmarks = totalmarks + Number(req.body[msub]);
		  }
		}

		var push = {
			total: totalmarks
		}

		Sep.create(push,function(err,totalmarks){
			if(err){
				console.log(err);
			}
			else{
				res.redirect("/admin");
			}
		})
	}



});

	

app.post("/addassignment",function(req,res){
	var subject = req.body.subject;
	var due = req.body.due;
	var credit = req.body.credit;
	var postassignment = {
		subject: subject,
		due: due,
		credit: credit
	}
	Assignment.create(postassignment,function(err,currentupload){
		if(err){
			console.log(err);
		}
		else{
			console.log(currentupload);
		}
	});
	res.redirect("/curriculum");
});


app.get("/dashboard",function(req,res){
       		Subject.find({},function(err,allsubjects){
    				Msubject.find({},function(err,allmsubjects){
    						Jan.find({},function(err,jantotal){
    							Feb.find({},function(err,febtotal){
    								Mar.find({},function(err,martotal){
    									Apr.find({},function(err,aprtotal){
    										May.find({},function(err,maytotal){
    											Jun.find({},function(err,juntotal){
    												Jul.find({},function(err,jultotal){
    													Aug.find({},function(err,augtotal){
    														Sep.find({},function(err,septotal){
    															res.render("dashboard",{subjects:allsubjects, msubjects:allmsubjects, janmarks:jantotal, febmarks:febtotal, marmarks: martotal, aprmarks: aprtotal, maymarks: maytotal, junmarks: juntotal, julmarks: jultotal, augmarks: augtotal, sepmarks: septotal});
															});
														});
													});
												});
											});
										});
									});
								});
							});
						});
					});
				});
		



app.get("/doubts",function(req,res)
{
	Doubt.find({},function(err,alldoubts){
		if(err){
			console.log(err);
		}
		else{
			Subject.find({},function(err,allsubjects){
				if(err){
					console.log(err);
				}
				else{
					Msubject.find({},function(err,allmsubjects){
    					if(err){
    						console.log(err);
    					}
    					else{
    						res.render("doubts",{subjects: allsubjects, doubt: alldoubts, msubjects: allmsubjects});
    					}
    				});
				}
			});
		}
	});
});

app.get("/feedback",function(req,res)
{
	Subject.find({},function(err,allsubjects){
		if(err){
			console.log(err);
		}
		else{
			Msubject.find({},function(err,allmsubjects){
    					if(err){
    						console.log(err);
    					}
    					else{
    						res.render("feedback",{subjects: allsubjects, msubjects: allmsubjects});
    					}
    				});
		}
	});
});

app.get("/admin",function(req,res){
	Feedback.find({},function(err,allfeedbacks){
		if(err){
			console.log(err);
		}
		else{
			Msubject.find({},function(err,allmsubjects){
				if(err){
					console.log(err);
				}
				else{
					Subject.find({},function(err,allsubjects){
						if(err){
							console.log(err);
						}
						else{
							res.render("admin",{feed: allfeedbacks,subjects: allsubjects,msubjects: allmsubjects});
						}
					});
				}
			});
		}
	});
});


app.get("/assignments",function(req,res){
	Assignment.find({},function(err,allassignments){
		if(err){
			console.log(err);
		}
		else{
			Subject.find({},function(err,allsubjects){
				if(err){
					console.log(err);
				}
				else{
					Msubject.find({},function(err,allmsubjects){
    					if(err){
    						console.log(err);
    					}
    					else{
    						res.render("assignments",{subjects: allsubjects,assignments: allassignments, msubjects: allmsubjects});
    					}
    				});
				}
			});
		}
	});
});

app.get("/configure",function(req,res)
{
	res.render("configure");
});

app.get("/curriculum",function(req,res){
	Upload.find({},function(err,alluploads){
		res.render("curriculum",{uploads: alluploads});
	});
});

app.get("/course",function(req,res){
		res.render("course");
});

app.get("/evaluation",function(req,res){
		res.render("evaluation");
});


app.get("/calendar",function(req,res){
	Subject.find({},function(err,allsubjects){
		if(err){
			console.log(err);
		}
		else{
			Msubject.find({},function(err,allmsubjects){
				if(err){
					console.log(err);
				}
				else{
					res.render("calendar",{msubjects: allmsubjects, subjects: allsubjects});
				}
			});
		}
	});
});

app.get("/alert",function(req,res){
	Subject.find({},function(err,allsubjects){
		if(err){
			console.log(err);
		}
		else{
			Msubject.find({},function(err,allmsubjects){
				if(err){
					console.log(err);
				}
				else{
					res.render("alert",{msubjects: allmsubjects, subjects: allsubjects});
				}
			});
		}
	});
});


app.listen("3000",function()
{
	console.log("Server started at Port 3000");

});