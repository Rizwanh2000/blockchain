const express = require("express")
const app = express()

const PORT = 4001

const bodyparser =  require("body-parser");
const { use } = require("express/lib/application");
const { param } = require("express/lib/request");
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());

app.get("/",(req,res)=>{
    res.send("Welcome")
})

app.get("/home",(req,res)=>{
    res.send("homepage")
})

JSONDATA = [
    {
        name: "Rizwan",
        id: 111
    },
    {
        name: "Salman",
        id: 123
    }
]

app.get("/profile/:name", (req, res) => {
    data = JSONDATA.find(e => {
        return e.name == req.params.name
    })
    res.send(data);
});



app.get("/data/:name/:age/:sal",(req,res)=>{
    console.log(req.params);
    res.send(req.params);
});

app.get("/myqry",(req,res)=>{
    console.log(req.query);
    res.send(req.query);
});


app.post("/postdata", (req, res) =>{
    req.send(req.body);
});


app.listen(PORT,()=>{
    console.log("Perfect");
}) 