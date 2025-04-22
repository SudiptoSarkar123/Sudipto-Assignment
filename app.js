const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const path = require('path');
const dbcon = require('./app/config/dbcon');
dbcon()


app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(require('cookie-parser')());


// const userRoutes = require('./app/router/userRoutes'); 
const adminRoutes = require('./app/router/adminRoutes');

// app.use('/user',userRoutes)
app.use('/admin',adminRoutes)


const port = process.env.PORT || 4500;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})


