
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
const { auth_me } = require("./middleware/auth");
const auth = require("./middleware/auth");

app.get("/read-db", auth_me, (req, res) => {
    data = JSON.parse(fs.readFileSync(db, "utf-8"))    
    res.json(data)
})


app.get("/findbyid-db/:id", auth_me,(req, res) => {
    let data = JSON.parse(fs.readFileSync(db, "utf-8"))    
    const _id = req.params.id;

    founddata = data.find(dt => {
        return dt.id == _id;
    })

    console.log(typeof founddata);

    res.json( typeof founddata !== "undefined" ? founddata : "Data not found")
})

app.get("/findbyheader-db/:header", (req, res) => {
    let data = JSON.parse(fs.readFileSync(db, "utf-8"))    
    const _header = req.params.header;
    console.log(_header);
    
    updatedData = []

    // searching user
    data.forEach((dt, i) => {
        if (dt.header.substring(0, _header.length) == _header){
            updatedData.push(dt);
        } 
    })

    console.log(typeof updatedData);

    res.json( typeof updatedData !== "undefined" ? updatedData : "Data not found")
})


app.get("/add-item", (req, res) => {
    let data = JSON.parse(fs.readFileSync(db, "utf-8"))  
    updatedData = []
    let success = true;

    if(typeof req.query.id == "undefined"){
        success = false;
    }

    if(typeof req.query.header == "undefined"){
        success = false;
    }

    // searching dt
    data.forEach((dt, i) => {
        if (dt.id == req.query.id){
            updatedData = [dt, i]
            return true
        } 
    })

    let addedData;
    // validating user found or not
    if(updatedData.length == 0 && success){

        console.log("Adding Data");
        addedData = {
            id: req.query.id,
            header: req.query.header,
            description: (typeof req.query.desc !== "undefined") ? req.query.desc : "",
            time: (typeof req.query.time !== "undefined") ? req.query.time : "",
            venue: (typeof req.query.venue !== "undefined") ? req.query.venue : ""
        };

        console.log(addedData);
        
        data.push(addedData);

        fs.writeFileSync(db, JSON.stringify(data));
        
        success = true;
    }

    res.json(success ? {msg: "Data added", data: addedData } : "Data already found")
})

app.listen(PORT, () => {
    console.log("Server is running at port: " + PORT);
})