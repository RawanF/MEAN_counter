const express = require("express");
const app = express();
const session = require('express-session');
app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    if (req.session.real)
        req.session.real += 1;
    else
        req.session.real = 1;
    if (!(req.session.counter))
    req.session.counter=0
    res.render('index', { real: req.session.real, counter: req.session.counter });
})
app.post("/increase_session", (req, res) => {
    req.session.counter += parseInt(req.body.num, 10);
    res.redirect('/');
})
app.post("/destroy_session", (req, res) => {
    req.session.counter = 0;
    req.session.real = 0;
    res.redirect('/');
})
app.use(express.static(__dirname + "/static"));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.listen(8000, () => console.log("listening on port 8000")); 