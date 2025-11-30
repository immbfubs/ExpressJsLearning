'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Use bodyParser for handling form data
app.use(bodyParser.urlencoded({ extended: false }));

// Listen on port 3000
const server = app.listen(3000, () => {
  console.log('Express started on port 3000');
});

// In-memory storage for the to-do list
const todoList = [];

// Route for handling the root URL
app.get('/', (req, res) => {
  res.send('<form method="post" action="/add-task"><label>Add Task: </label>' +
           '<input type="text" name="task" required />' +
           '<input type="submit" value="Add Task" /></form>');
});

// Route for adding a new task
app.post('/add-task', (req, res) => {
  const task = req.body.task;
  todoList.push(task);
  res.redirect('/tasks');
});

// Route for viewing the list of tasks
app.get('/tasks', (req, res) => {
  let html = '<h1>To-Do List</h1><ul>';
  todoList.forEach((task, index) => {
    html += `<li>${task} [<a href="/update-task/${index}">Update</a>] [<a href="/delete-task/${index}">Delete</a>]</li>`;
  });
  html += '</ul><p><a href="/">Add a new task</a></p>';
  res.send(html);
});

// Route for updating a task
app.get('/update-task/:index', (req, res) => {
  const index = req.params.index;
  const task = todoList[index];
  res.send(`<form method="post" action="/update-task/${index}">
            <input type="text" name="updatedTask" value="${task}" />
            <input type="submit" value="Update Task" />
            </form>`);
});

// Route for handling the update task form submission
app.post('/update-task/:index', (req, res) => {
  const index = req.params.index;
  const updatedTask = req.body.updatedTask;
  todoList[index] = updatedTask;
  res.redirect('/tasks');
});

// Route for deleting a task
app.get('/delete-task/:index', (req, res) => {
  const index = req.params.index;
  todoList.splice(index, 1);
  res.redirect('/tasks');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

module.exports = server;