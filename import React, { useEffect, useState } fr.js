import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TaskForm from './TaskForm';

const API_URL = 'http://localhost:8000/api/tasks/';

const KanbanBoard = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get(API_URL).then(response => setTasks(response.data));
  }, []);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;
    const reorderedTasks = Array.from(tasks);
    const [movedTask] = reorderedTasks.splice(source.index, 1);
    reorderedTasks.splice(destination.index, 0, movedTask);
    setTasks(reorderedTasks);
    // Update task status on backend
    axios.put(`${API_URL}${movedTask.id}/`, {
      ...movedTask,
      status: destination.droppableId
    });
  };

  return (
    <div>
      <TaskForm />
      <DragDropContext onDragEnd={onDragEnd}>
        {['To Do', 'In Progress', 'Completed'].map(status => (
          <Droppable key={status} droppableId={status}>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <h2>{status}</h2>
                {tasks.filter(task => task.status === status).map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{ ...provided.draggableProps.style, margin: '8px' }}
                      >
                        <div>{task.title}</div>
                        <div>{task.description}</div>
                        <div>{task.due_date}</div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </DragDropContext>
    </div>
  );
};

export default KanbanBoard;
