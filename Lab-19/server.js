const express =  require("express");
const app = express()
const bodyParser = require("body-parser")
const PORT = 3000

// File System
const fs = require("fs")

// DB Path
const db = "./db/db.json"

// middlewares
app.use(bodyParser.json())




app.get("/read-db", (req, res) => {
    data = JSON.parse(fs.readFileSync(db, "utf-8"))    
    res.json(data)
})

app.get("/find-db/:name", (req, res) => {
    let data = JSON.parse(fs.readFileSync(db, "utf-8"))    
    const name = req.params.name;

    founddata = data.find(user => {
        return user.name == name
    })

    console.log(typeof founddata);

    res.json( typeof founddata !== "undefined" ? founddata : "User not found")
})

app.get("/update-user/:name", (req, res) => {
    let data = JSON.parse(fs.readFileSync(db, "utf-8"))  
    updatedData = []

    // searching user
    data.forEach((user, i) => {
        if (user.name == req.params.name){
            updatedData = [user, i]
            return true
        } 
    })

    // validating user found or not
    if(updatedData.length > 0){

        console.log("updatedData");
        console.log(updatedData);
        

        // now updating user name if required
        if(typeof req.query.n !== "undefined"){
            data[updatedData[1]].name = req.query.n
        }
        
        // now updating user password if required
        if(typeof req.query.p !== "undefined"){
            data[updatedData[1]].pass = req.query.p
        }

        fs.writeFileSync(db, JSON.stringify(data));

    }

    res.json(updatedData.length > 0 ? {msg: "Data updated", data: updatedData[0] } : "User not found")
})

app.get("/add-user", (req, res) => {
    let data = JSON.parse(fs.readFileSync(db, "utf-8"))  
    updatedData = []
    let success = true;

    if(typeof req.query.n == "undefined"){
        success = false;
    }

    // searching user
    data.forEach((user, i) => {
        if (user.name == req.query.n){
            updatedData = [user, i]
            return true
        } 
    })

    // validating user found or not
    if(updatedData.length == 0){

        console.log("Adding Data");
        let addedData = {
            name: req.query.n,
            pass: (typeof req.query.p !== "undefined") ? req.query.p : ""
        };

        console.log(addedData);
        
        data.push(addedData);

        fs.writeFileSync(db, JSON.stringify(data));
        
        success = true;
    }

    res.json(success ? {msg: "Data added", data: addedData } : "User already found")
})

app.get("/delete-user/:name", (req, res) => {
    let data = JSON.parse(fs.readFileSync(db, "utf-8"))  
    updatedData = []

    // searching user
    data.forEach((user, i) => {
        if (user.name == req.params.name){
            updatedData = [user, i]
            return true
        } 
    })

    // validating user found or not
    if(updatedData.length > 0){

        console.log("delete Data");
        console.log(updatedData);
        
        data.pop(updatedData);

        fs.writeFileSync(db, JSON.stringify(data));

    }

    res.json(updatedData.length > 0 ? {msg: "Data deleted", data: updatedData[0] } : "User not found")
})

app.get("/filter-user/:pass", (req, res) => {
    let data = JSON.parse(fs.readFileSync(db, "utf-8"))  
    updatedData = []

    // searching user
    data.forEach((user, i) => {
        if (user.pass == req.params.pass){
            updatedData.push(user);
        } 
    })

    // validating user found or not
    if(updatedData.length > 0){

        console.log("User List");
        console.log(updatedData);
        
    }

    res.json(updatedData.length > 0 ? {msg: "Data found", data: updatedData } : "User not found")
})

app.listen(PORT, () => {
    console.log("Server is running at port: " + PORT);
})