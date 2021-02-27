var Employeedb = require('../model/employee');
const bcrypt = require('bcryptjs');

//create and save new employee
exports.create = (req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }

    // new employee
    const employee = new Employeedb({
        id : req.body.id,
        name : req.body.name,
        password : req.body.password,
        gender: req.body.gender,
        designation: req.body.designation,
        address: req.body.address,
        earned_leaves: req.body.earned_leaves,
        wfh: req.body.wfh,
        paternity_leaves: req.body.paternity_leaves,
        maternity_leaves: req.body.maternity_leaves,
        image_source: req.body.image_source,
        optional_holidays: req.body.optional_holidays

    })

    // save employee in the database
    employee
        .save(employee)
        .then(data => {
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(employee.password, salt, (err, hash) => {
                  if (err) throw err;
                  employee.password = hash;
                  employee
                    .save()
                    .then(
                        console.log('Password saved')
                    )
                    .catch(err => console.log(err));
                });
              });
            res.send(data)

        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        });

}

// retrieve and return all employees/ retrive and return a single employee
exports.find = (req, res)=>{

    if(req.query.id){
        const id = req.query.id;

        Employeedb.findOne({id: id})
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found employee with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Erro retrieving employee with id " + id})
            })

    }else{
        Employeedb.find()
            .then(employee => {
                res.send(employee)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving employee information" })
            })
    }

    
}

// Update a new idetified employee by employee id
exports.update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    Employeedb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update employee with ${id}. Maybe employee not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update employee information"})
        })
}

// Delete a employee with specified employee id in the request
exports.delete = (req, res)=>{
    const id = req.params.id;

    Employeedb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "employee was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete employee with id=" + id
            });
        });
}