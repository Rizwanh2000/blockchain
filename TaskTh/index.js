const express = require('express')
const app = express()
const port = 8500
const pss = "Rizwan Hussain"


myJSON =[
    {
        name: "Rizwan Hussain",
        email: "rizwanh2000@gmail.com",
        cell:"03002044712",
        addres: "Gulistan e Jauhar",
        city: "Karachi"
    },
    {
        graduation: "BSCS Uok 2011",
        intermediate: "Adamjee Science College 2006",
        matric: "Karachi Board 2004",
        diploma: "DIT SBTE 2006"
    },
    {
        programing: "C++, C#",
        database: "Oracle, SqlServer",
        reports: "Crystal Reports"
    },
    {
        experience: "TPS Pakistan 3 Years"
    }

]

app.get('/home', (req, res) => {
  res.send(myJSON)
  // console.log(req)
  // console.log(res)
})

app.get('/home/education', (req, res) => {
    res.send('Welcome Home! End')
    // console.log(req)
    // console.log(res)
  })

app.get('/home/skills', (req, res) => {
  res.send('Welcome Home! End')
  // console.log(req)
  // console.log(res)
})

app.get('/home/experience', (req, res) => {
    res.send('Welcome Home! End')
    // console.log(req)
    // console.log(res)
  })

app.listen(port, () => {
  console.log(`My app listening on port ${port} made by ${pss}`)
})