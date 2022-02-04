const chalk = require('chalk');
const hasAuthorization = require('../middleware/auth');

const getAllTasks = async (req, res) =>{
    try {
        res.render('index', {
            title: 'respond with a resource index'
        });
    } catch (err) {
        res.status(400).json({
            error: "Unable to load page " + err
        })
    }
};

const createTask = async (req, res) =>{
    let email = await req.body.email;
    console.log(chalk.yellow(email));
    try {
        res.render('index', {
            title: 'respond with a create',
            user: email,
        });
    } catch (err) {
        res.status(400).json({
            error: "Unable to save data " + err
        })
    }
};

const getTask = async (req, res, next) => {
    const {
        id: taskID
    } = req.params
    const task = await Task.findOne({
        _id: taskID
    })
    if (!task) {
        return next(createCustomError(`No task with id : ${taskID}`, 404))
    }

    res.status(200).json({
        task
    })
};

const deleteTask = async (req, res, next) => {
    const {
        id: taskID
    } = req.params
    const task = await Task.findOneAndDelete({
        _id: taskID
    })
    if (!task) {
        return next(createCustomError(`No task with id : ${taskID}`, 404))
    }
    res.status(200).json({
        task
    })
};

const updateTask = async (req, res, next) => {
    const {
        id: taskID
    } = req.params

    const task = await Task.findOneAndUpdate({
        _id: taskID
    }, req.body, {
        new: true,
        runValidators: true,
    })

    if (!task) {
        return next(createCustomError(`No task with id : ${taskID}`, 404))
    }

    res.status(200).json({
        task
    })
};



module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask,
}