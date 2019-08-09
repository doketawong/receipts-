const express = require("express")
let app = new express()

let port =8080
app.listen(8080, function(){
    console.log("Server started listen at localhost: "+port)
})