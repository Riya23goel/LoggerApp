const path = require("path");
const express = require("express");
var fs = require('fs');
var gitDiff = require('git-diff')

const app = express();
const publicPath = path.join(__dirname, '..', "build");

const port = process.env.PORT || 5001;

app.use(express.static(publicPath));

app.get('/getLogs', (req, res) => {
    fs.readFile('remote.txt', 'utf8', (err, data) => {
        if (err) {
          console.log(err);
          return;
        }
        var diff = gitDiff(req.query.data, data);
        fs.writeFile('remote.txt', req.query.data, err => {
            if (err) {
            console.log(err);
            }
        })
        res.set('Access-Control-Allow-Origin', '*');
        res.send(diff);
    });
});

app.listen(port, () => console.log(`App listening at port: ${port}`)); 