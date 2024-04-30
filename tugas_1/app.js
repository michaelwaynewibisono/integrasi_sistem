const express = require('express');
const app = express();
const data = require('./data.json')

const path = require('path')

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

var cors = require('cors');
app.use(cors({
    origin: 'http://localhost:3000'
}));

//Render HTML element
app.get('/', (req, res) => {
    res.render('index.ejs');
})

//Get request
app.get('/data', (req, res) => {
    res.send(data)
})

const fs = require("fs"); //Declare fs module
app.use(express.json());

const each = require('./data.json');
app.post('/data', (req, res) => {
    try {
        console.log(req.body);
        res.send(req.body);
        each.push(req.body);
        fs.writeFile("data.json", JSON.stringify(each), err => {
            if (err) throw err;
            console.log("Your data has been sent");
        });
    } catch {
        console.log("Error sending your data");
    }
})

fs.readFile("data.json", function (err, data) {
    if (err) throw err;

    const each = JSON.parse(data);
    console.log(each);
});

app.listen(3000, () => {
    console.log('server started on localhost:3000')
})