const express = require('express')
const app = express()
const port = 8080

app.listen(8080, function () {
  console.log('Server started listen at localhost: ' + port)
}
)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/model/index.html')
}
)
