import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/tasks/';

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('To Do');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(API_URL, { title, description, status, due_date: dueDate })
      .then(response => {
        // Handle success
        setTitle('');
        setDescription('');
        setDueDate('');
      })
      .catch(error => {
        // Handle error
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
      <select value={status} onChange={e => setStatus(e.target.value)}>
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
