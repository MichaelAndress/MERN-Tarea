const Task = require("../models/task.model");

const getTask = async (req, res) => {
    // console.log(req.id)
    try {
        const tasks = await Task.find({ user: req.id.id }).populate("user");
        res.json(tasks);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
const getOneTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            res.status(404).json({
                message: "Error al encontrar la tarea",
            });
        }
        res.json({
            task,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
const createTask = async (req, res) => {
    const { title, description, date } = req.body;
    try {
        const newTask = new Task({
            title,
            description,
            date,
            user: req.id.id,
        });
        const saveTask = await newTask.save();
        res.json({
            saveTask,
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};
const updateTask = async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params, req.body, {
        new: true,
    });
    if (!task) {
        return res.status(404).json({
            message: "tarea no encontrada",
        });
    }
    res.json({
        task,
    });
};
const deleteTask = async (req, res) => {
    const { id } = req.params;
    console.log(id)
    try {
        const task = await Task.findByIdAndDelete(id);
        if (!task) {
            res.status(404).json({
                message: "Error al encontrar la tarea",
            });
        }
        res.status(204).json({
            message: "Tarea Eliminada",
        });
        
    } catch (error) {
        res.status(500).json({
            error
        })
    }
};

module.exports = {
    getTask,
    getOneTask,
    createTask,
    updateTask,
    deleteTask,
};
