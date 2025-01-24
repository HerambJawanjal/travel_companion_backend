const express = require('express');
const pool = require('./config/db');
const routes = require('./index');
const cors = require('cors');



const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials:true
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 8796;



app.use('/api', routes);


app.get('/', (req, res) => {
    res.json({
        message: "hello mihir"
    })
})

app.get('/users', async (req, res) => {
    try {
        const users = await pool.query('select * from travel_companion.users');
        console.log(users.rows);
        res.json(users.rows);
    } catch (error) {
        console.log(error);
    }
})



app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
});
