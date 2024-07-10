const { Sequelize, Op } = require('sequelize');
const Task = require('../models/task');

const createTask = async (req, res) => {
  const {title, description, favorite} = req.body;

  try {
    const newTask = await Task.create({
      title,
      description,
      favorite
    });

    if(!newTask){
      throw new Error('Error');
    }

    res.status(201).json(newTask);

    
  } catch (error) {
    res.status(422).json({
      errors : [error]
    });
  }
};

const getTasks1 = async (req, res) => {
  try {
    const tasks = await Task.findAll();

    if(!tasks){
      throw new Error('Tasks are not found');
    }

    res.status(200).json(tasks);

  } catch (error) {
    res.status(422).json({
      errors : [error]
    });
  }
};

  const getTaskById = async (req, res) => {
    const id = req.params;

    try {
      const task = await Task.findOne({where : id});

      if(!task){
        throw new Error('Task are not found');
      }

      res.status(200).json(task);

    } catch (error) {
      res.status(422).json({
        errors : [error]
      });
    }
  };

  const getTasks = async (req, res) => {
    try {
      const query = req.query.q;
  
      let tasks;
  
      if (!query || query.trim() === '') {
        tasks = await Task.findAll();
      } else {
        tasks = await Task.findAll({
          where: {
            title: {
              [Op.like]: `%${query}%`
            }
          }
        });
      }
  
      if (!tasks || tasks.length === 0) {
        return res.status(200).json([]);
      }
      
      // if(tasks)
      res.status(200).json(tasks);
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
      res.status(500).send('Erro ao buscar tarefas');
    }
  };

  const editTask = async (req, res) => {
    const id = req.params;
    const {title, description} = req.body;

    try {
      const task = await Task.update(
        {
          title,
          description
        },
        {
          where : id
        }
      );

      if(!task){
        throw new Error('Error at editing task');
      }

      res.status(200).json(task);
      
    } catch (error) {
      res.status(422).json({
        errors: [error]
      });
    }
  };

  const editColorTask = async (req, res) => {
    const id = req.params;
    const {colorP} = req.body;
    // console.log(req.body)

    try {
      const task = await Task.update(
        {
          color: colorP
        },
        {
          where : id
        }
      );
      // console.log(task)

      if(!task){
        throw new Error('Error at chaging color task');
      }
      
      res.status(200).json(task);
      
    } catch (error) {
      res.status(422).json({
        errors: [error]
      });
    }
  };

  const favoriteTask = async (req, res) => {
    const id = req.params;
     
    try {
      const currentTask = await Task.findOne({where : id});
      const task = await Task.update(
        {
          favorite : !(currentTask.dataValues.favorite)
        },
        {
          where : id
        }
      );
      
      if(!task){
        throw new Error('Error at favoriting task');
      }

      res.status(200).json(task);
    
    } catch (error) {
      res.status(422).json({
        errors: [error]
      });
    }
  };

  const deleteTask = async (req, res) => {
    const id = req.params;
    
    try {
      const task = await Task.destroy(
        {
          where: id
        }
      );

      if(!task){
        throw new Error('Error at deleting task');
      }
      
      res.status(200).json(task);
      
    } catch (error) {
      res.status(422).json({
        errors: [error]
      });
    }
  }

  const deleteAllTasks = async (req, res) => {
    try {
      const task = await Task.destroy({truncate: true});
      console.log(task)
      if(!task){
        throw new Error('Error at deleting tasks');
      }
      res.status(200).json(task);
      
    } catch (error) {
      res.status(422).json({error
      });
    }

  }
  
module.exports = {getTasks, getTaskById, createTask, editTask, editColorTask, favoriteTask, deleteTask, deleteAllTasks }