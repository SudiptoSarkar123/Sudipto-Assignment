const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const dbcon = require('./app/config/dbcon');
dbcon()


app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(require('cookie-parser')());

// Configure session middleware
app.use(
    session({
        secret: 'your-secret-key', // Replace with a strong secret key
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 60000 }, // Optional: Set cookie expiration time
    })
);

// Configure flash middleware
app.use(flash());

// Middleware to make flash messages available in views
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});


// const userRoutes = require('./app/router/userRoutes'); 
const adminRoutes = require('./app/router/adminRoutes');

// app.use('/user',userRoutes)
app.use('/admin',adminRoutes)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



const port = process.env.PORT || 4500;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})



