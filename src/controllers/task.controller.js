const Task = require("../models/task.model");

const getTask = async (req, res) => {
    const task = await Task.find({
        user:req.user.id
    }).populate('user');
    res.json({
        task,
    });
};
const getOneTask = async (req, res) => {    
    try {
        const task = await Task.findById( req.params.id );
        if (!task) {
            res.status(404).json({
                msg: "Error al encontrar la tarea",
            });
        }
        res.json({
            task,
        });
        
    } catch (error) {
        res.status(500).json({
            msg: error.message
        })
    }
};
const createTask = async (req, res) => {
    const { title, description, date } = req.body;
    const newTask = new Task({
        title,
        description,
        date,
        user: req.user.id
    });
    const saveTask = await newTask.save();
    res.json({
        saveTask,
    });
};
const updateTask = async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params, req.body, {
        new: true,
    });
    if (!task) {
        return res.status(404).json({
            msg: "tarea no encontrada",
        });
    }
    res.json({
        task,
    });
};
const deleteTask = async (req, res) => {
    const { id } = req.params;
    const task = await Task.findById({ id });
    if (!task) {
        res.status(404).json({
            msg: "Error al encontrar la tarea",
        });
    }
    await Task.findByIdAndDelete(id);
    res.json({
        msg: "Tarea Eliminada",
    });
};

module.exports = {
    getTask,
    getOneTask,
    createTask,
    updateTask,
    deleteTask,
};
