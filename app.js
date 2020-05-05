const express = require('express');
const cors = require('cors');
const mongoClient = require('mongodb').MongoClient;

const app = express();
app.use(cors());


const bodyParser = require('body-parser'); //read form data and form fields


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//STEP 1: npm install method-override
const methodOverride = require('method-override'); //to support PUT and DELETE FROM browssers
app.use(methodOverride('_method'));

const mongoServerURL = "mongodb+srv://admin:admin@clustersgs-s5g81.mongodb.net/test?retryWrites=true&w=majority";






//#############################################################
//###### Display 
//#############################################################


//default route / - display all info
app.get('/', (request, response, next) => {
    mongoClient.connect(mongoServerURL, (err, db) => {
        if (err)
            console.log("Cannot connect to Mongo:"+err.message);

        //connect to db
        const sgsdb = db.db("sgsdb");

        //read from  collection
        sgsdb.collection("tblstudents").find({},{_id:0}).toArray((err, itemsArray) => {
            if (err)
                console.log(err.message);

            response.send(JSON.stringify(itemsArray));
        });

        //close the connection to the db
        //db.close();
    });

});




//get a student by StudentID - used in update and delete web pages
app.get('/StudentID/:StudentID', (request, response, next) => {

    let studentID = request.params.StudentID;

    studentID = parseInt(studentID);

    mongoClient.connect(mongoServerURL, (err, db) => {
        if (err)
            console.log("Cannot connect to Mongo:"+err.message);

        //connect to db
        const sgsdb = db.db("sgsdb");

        //build the query filter
        let query = {StudentID:studentID};


        //read from  collection
        sgsdb.collection("tblstudents").find(query).toArray((err, itemsArray) => {
            if (err)
                console.log(err.message);

            response.send(JSON.stringify(itemsArray));
        });

        //close the connection to the db
        db.close();
    });
});




//get a student by StudentName - used in update and delete web pages
app.get('/StudentName/:StudentName', (request, response, next) => {

    const studentName = request.params.StudentName;

    mongoClient.connect(mongoServerURL, (err, db) => {
        if (err)
            console.log("Cannot connect to Mongo:"+err.message);

        //connect to db
        const sgsdb = db.db("sgsdb");

        //build the query filter
        let query = {StudentName:studentName};


        //read from   collection
        sgsdb.collection("tblstudents").find(query).toArray((err, itemsArray) => {
            if (err)
                console.log(err.message);

            response.send(JSON.stringify(itemsArray));
        });

        //close the connection to the db
        db.close();
    });
});






//get students by Gender - used in update and delete web pages
app.get('/Gender/:Gender', (request, response, next) => {

    const gender = request.params.Gender;

    mongoClient.connect(mongoServerURL, (err, db) => {
        if (err)
            console.log("Cannot connect to Mongo:"+err.message);

        //connect to db
        const sgsdb = db.db("sgsdb");

        //build the query filter
        let query = {Gender:gender};


        //read from collection
        sgsdb.collection("tblstudents").find(query).toArray((err, itemsArray) => {
            if (err)
                console.log(err.message);

            response.send(JSON.stringify(itemsArray));
        });

        //close the connection to the db
        db.close();
    });
});



//get students by Program - used in update and delete web pages
app.get('/byProgram/:Program', (request, response, next) => {

    const program = request.params.Program;

    mongoClient.connect(mongoServerURL, (err, db) => {
        if (err)
            console.log("Cannot connect to Mongo:"+err.message);

        //connect to db
        const sgsdb = db.db("sgsdb");

        //build the query filter
        let query = {Program:program};


        //read from  collection
        sgsdb.collection("tblstudents").find(query).toArray((err, itemsArray) => {
            if (err)
                console.log(err.message);

            response.send(JSON.stringify(itemsArray));
        });

        //close the connection to the db
        db.close();
    });
});


//get a students by Acadmicyear - used in update and delete web pages
app.get('/Acadmicyear/:Acadmicyear', (request, response, next) => {

    let acadmicyear = request.params.Acadmicyear;

    acadmicyear = parseInt(acadmicyear);

    mongoClient.connect(mongoServerURL, (err, db) => {
        if (err)
            console.log("Cannot connect to Mongo:"+err.message);

        //connect to db
        const sgsdb = db.db("sgsdb");

        //build the query filter
        let query = {Acadmicyear:acadmicyear};


        //read from  collection
        sgsdb.collection("tblstudents").find(query).toArray((err, itemsArray) => {
            if (err)
                console.log(err.message);

            response.send(JSON.stringify(itemsArray));
        });

        //close the connection to the db
        db.close();
    });
});



//get students by Age - used in update and delete web pages
app.get('/Age/:Age', (request, response, next) => {

    let age = request.params.Age;

    age = parseInt(age);

    mongoClient.connect(mongoServerURL, (err, db) => {
        if (err)
            console.log("Cannot connect to Mongo:"+err.message);

        //connect to db
        const sgsdb = db.db("sgsdb");

        //build the query filter
        let query = {Age:age};


        //read from db collection
        sgsdb.collection("tblstudents").find(query).toArray((err, itemsArray) => {
            if (err)
                console.log(err.message);

            response.send(JSON.stringify(itemsArray));
        });

        //close the connection to the db
        db.close();
    });
});


//get students by CGPA - used in update and delete web pages
app.get('/CGPA/:CGPA', (request, response, next) => {

    let cGPA = request.params.CGPA;

    cGPA = parseInt(cGPA);

    mongoClient.connect(mongoServerURL, (err, db) => {
        if (err)
            console.log("Cannot connect to Mongo:"+err.message);

        //connect to db
        const sgsdb = db.db("sgsdb");

        //build the query filter
        let query = {CGPA:cGPA};


        //read from db collection
        sgsdb.collection("tblstudents").find(query).toArray((err, itemsArray) => {
            if (err)
                console.log(err.message);

            response.send(JSON.stringify(itemsArray));
        });

        //close the connection to the db
        db.close();
    });
});



//#############################################################
//###### INSERT
//#############################################################


//add a new Students - using HTTP POST method
app.post('/', (request, response, next) => {
   
    //access the form fields by the same names as in the HTML form

    let studentID = request.body.StudentID;
    const studentName = request.body.StudentName;
    const gender = request.body.Gender;
	const program = request.body.Program;
    
    
    let acadmicyear = request.body.Acadmicyear;
    let age = request.body.Age;
    let cGPA = request.body.CGPA;
    
    //convert 
    studentID = parseInt(studentID);
    acadmicyear = parseInt(acadmicyear);
    age = parseInt(age);
    cGPA = parseFloat(cGPA);

    mongoClient.connect(mongoServerURL, (err, db) => {
        if (err)
            console.log("Cannot connect to Mongo:"+err.message);

        //connect to db
        const sgsdb = db.db("sgsdb");
        
        const newStudent = {StudentID:studentID, StudentName:studentName, Gender:gender, Program:program,
            Acadmicyear:acadmicyear,Age:age,CGPA:cGPA};

        //insert to   collection

        sgsdb.collection("tblstudents").insertOne(newStudent, (err, result) => {
            if (err) {
                console.log(err.message);
            }

            if (result.insertedCount == 1) {

                //response.redirect("/static/index.html");
                response.end("student: " + studentName + " is added!!");
                
            }
            else
                response.end("student: " + studentName + " could not be added!!");
        });

        //close the connection to the db
        db.close();
    }); 
});




//#############################################################
//###### UPDATE 
//#############################################################

//update Student - uisng HTTP PUT method
app.put('/', (request, response, next) => {
    
    console.log("in PUT");
    
    let studentID = request.param('StudentID');
    const studentName = request.param('StudentName');
    const gender = request.param('Gender');
	const program = request.param('Program');
    
    
    let acadmicyear = request.param('Acadmicyear');
    let age = request.param('Age');
    let cGPA = request.param('CGPA');
    
    //convert to number
    studentID = parseInt(studentID);
    acadmicyear = parseInt(acadmicyear);
    age = parseInt(age);
    cGPA = parseFloat(cGPA);


 

    mongoClient.connect(mongoServerURL, (err, db) => {
        if (err)
            console.log("Cannot connect to Mongo:"+err.message);

        //connect to db
        const sgsdb = db.db("sgsdb");
        
        //we are updating by the studentID
        const updateFilter = {StudentID:studentID};
        const updateValues = {$set:{StudentName:studentName, Gender:gender,
            Program:program,Acadmicyear:acadmicyear,Age:age,CGPA:cGPA }};


        //insert from collection
        sgsdb.collection("tblstudents").updateOne(updateFilter, updateValues, (err, res) => {
            if (err) {
                console.log(err.message);
            }
            //response.redirect("/static/index.html");
            response.end("student: " + studentName + " is updated!!");
            
           // response.send("<script>alert(\"student: " + studentName + " is updated!!\");</script>");
        });

        //close the connection to the db
        db.close();
    }); 
});




//#############################################################
//###### DELETE 
//#############################################################


//delete a Student  by Student ID
app.delete('/', (request, response, next) => {
    
    
    let studentID = request.param('StudentID');
    studentID = parseInt(studentID);

    mongoClient.connect(mongoServerURL, (err, db) => {
        if (err)
            console.log("Cannot connect to Mongo:"+err.message);

        //connect to club
        const sgsdb = db.db("sgsdb");
        
        //we are deleting by the club_name
        const deleteFilter = {StudentID:studentID};

        //insert from footballdb club collection
        sgsdb.collection("tblstudents").deleteOne(deleteFilter, (err, res) => {
            if (err) {
                console.log(err.message);
            }

            if (res.deletedCount > 0) {
                
                //response.redirect("/static/index.html");
                response.end("studentID: " + studentID + " is deleted!!");
            }
            else {
                response.send("<script>alert(\"deleted \" +studentID);</script>");
            }
        });

        //close the connection to the db
        db.close();
    }); 
});








//#############################################################
//###### listen 
//#############################################################





app.use('/static', express.static('public'));


//Evennode
app.listen(process.env.PORT);
console.log("server listening on Evennode");


/* 
const port = 7979;
app.listen(port, ()=> {
    console.log("server listening on "+port);
});
 */

