const Employee = require('../models/Employee');

// show the list of employees
const index = (req, res, next) => {
    Employee.find()
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message: 'An error occured!'
        })
    })
};

// show single employee
const show = (req, res, next) => {
    let employeeID = req.body.employeeID;

    Employee.findById(employeeID)
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message: 'An error occured!'
        })
    })
}

// add employee to db
const store = (req, res, next) => {
    let emploeyee = new Employee({
        name: req.body.name,
        designation: req.body.designation,
        email: req.body.email,
        phone: req.body.phone,
        age: req.body.age,
    });

    emploeyee.save()        // save here
    .then(() => {
        res.json({
            message: 'Employee added successfully!'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error occured!'
        })
    })

}

// update an employee using id
const update = (req, res, next) => {
    let employeeID = req.body.employeeID;
    
    let updatedData = {
        name: req.body.name,
        designation: req.body.designation,
        email: req.body.email,
        phone: req.body.phone,
        age: req.body.age
    }

    Employee.findByIdAndUpdate(employeeID, {$set: updatedData})     // update here
    .then(() => {
        res.json({
            message: "Employee updated successfully!"
        })
    })
    .catch(error => {
        res.json({
            message: 'An error occured!'
        })
    })
}

// delete an employee using id
const destroy = (req, res, next) => {
    let employeeID = req.body.employeeID;
    Employee.findOneAndDelete(employeeID)
    .then(() => {
        res.json({
            message: "Employee deleted successfully!"
        })
    })
    .catch(error => {
        res.json({
            message: 'An error occured!'
        })
    })
}

module.exports = {
    index, show, store, update, destroy
}