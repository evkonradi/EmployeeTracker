const express = require('express');

const apiRoutes = require('./routes/apiRoutes');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api', apiRoutes);
app.use(express.static('public'));

// Default response for any other request(Not Found) Catch all
app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, ()=>{
    console.log(`API server now on port ${PORT}`);
});
