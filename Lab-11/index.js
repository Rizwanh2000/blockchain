
const express = require('express')
const { Script } = require('vm')
const app = express()
const port = 1992
const pss = "asdsad"

// app.get('/home/about', (req, res) => {
//   res.send('Hello World!')
//   // console.log(req)


//   // console.log(res)
// })

// app.get('/home', (req, res) => {
//   res.send('Welcome Home! End')
//   // console.log(req)
//   // console.log(res)
// })

app.post('/home/myapp', (req, res) => {
  //res.send('Welcome Home! End')

//   if(req.body.username == "rizwan"){

  myobj = [
      {
          id: 123,
          name: "Rizwan",
          class: "BSC"
      },
      {
        id: 124,
        name: "Salman",
        class: "BA"
    },
  ]

  res.send(JSON.stringify(myobj))

//}
// else{
//     res.send('Invalid User Name! End')
// }


  // console.log(req)
  // console.log(res)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port} fsdfd ${pss}`)
})