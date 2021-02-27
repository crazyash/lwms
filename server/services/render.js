const axios = require('axios');


exports.homeRoutes = (req, res) => {
    // Make a get request to /api/users
    axios.get(`http://localhost:${process.env.PORT}/api/employees`)
        .then(function(response){
            res.render('index', { employees : response.data });
        })
        .catch(err =>{
            res.send(err);
        })

    
}
