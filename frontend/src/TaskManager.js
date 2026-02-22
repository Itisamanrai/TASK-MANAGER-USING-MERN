import React, { useEffect, useState } from 'react';
import { FaCheck, FaPencilAlt, FaPlus, FaSearch, FaTrash } from 'react-icons/fa';
import { ToastContainer } from 'react-toastify';
import { CreateTask, DeleteTaskById, GetAllTasks, UpdateTaskById } from './api';
import { notify } from './utils';
function TaskManager() {
    const [input, setInput] = useState('');
    const [tasks, setTasks] = useState([]);
    const [copyTasks, setCopyTasks] = useState([]);
    const [updateTask, setUpdateTask] = useState(null);

    const handleTask = () => {
        const taskName = input.trim();

        if (updateTask && taskName) {
            //upadte api call
            const obj = {
                taskName,
                isDone: updateTask.isDone,
                _id: updateTask._id
            }
            handleUpdateItem(obj);
        } else if (updateTask === null && taskName) {
            //create api call
            handleAddTask();
        }
        setInput('')
    }

    useEffect(() => {
        if (updateTask) {
            setInput(updateTask.taskName);
        }
    }, [updateTask])

    const handleAddTask = async () => {
        const obj = {
            taskName: input.trim(),
            isDone: false
        }
        try {
            const { message } = await CreateTask(obj);
            notify(message, 'success')
            fetchAllTasks()
        } catch (err) {
            console.error(err);
            notify(err.message || 'Failed to create task', 'error')
        }
    }

    const fetchAllTasks = async () => {
        try {
            const { data } = await GetAllTasks();
            const normalizedData = Array.isArray(data) ? data : [];
            setTasks(normalizedData);
            setCopyTasks(normalizedData);
        } catch (err) {
            console.error(err);
            setTasks([]);
            setCopyTasks([]);
            notify(err.message || 'Failed to fetch tasks', 'error')
        }
    }
    useEffect(() => {
        fetchAllTasks()
    }, [])


    const handleDeleteTask = async (id) => {
        try {
            const { message } = await DeleteTaskById(id);
            notify(message, 'success')
            fetchAllTasks()
        } catch (err) {
            console.error(err);
            notify(err.message || 'Failed to delete task', 'error')
        }
    }

    const handleCheckAndUncheck = async (item) => {
        const { _id, isDone, taskName } = item;
        const obj = {
            taskName,
            isDone: !isDone
        }
        try {
            const { message } = await UpdateTaskById(_id, obj);
            notify(message, 'success')
            fetchAllTasks()
        } catch (err) {
            console.error(err);
            notify(err.message || 'Failed to update task', 'error')
        }
    }

    const handleUpdateItem = async (item) => {
        const { _id, isDone, taskName } = item;
        const obj = {
            taskName,
            isDone: isDone
        }
        try {
            const { message } = await UpdateTaskById(_id, obj);
            notify(message, 'success')
            setUpdateTask(null);
            fetchAllTasks()
        } catch (err) {
            console.error(err);
            notify(err.message || 'Failed to update task', 'error')
        }
    }

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        const oldTasks = Array.isArray(copyTasks) ? copyTasks : [];
        const results = oldTasks.filter((item) => item.taskName.toLowerCase().includes(term));
        setTasks(results);
    }
    return (
        <div className='d-flex flex-column align-items-center
        w-50 m-auto mt-5'>
            <h1 className='mb-4'>Task Manager App</h1>
            {/* Input and Search box */}
            <div className='d-flex justify-content-between
            align-items-center mb-4 w-100'>
                <div className='input-group flex-grow-1 me-2'>
                    <input type='text'
                        value={input}
                        onChange={
                            (e) => setInput(e.target.value)}
                        className='form-control me-1'
                        placeholder='Add a new Task'
                    />
                    <button
                        onClick={handleTask}
                        className='btn btn-success btn-sm me-2'
                    >
                        <FaPlus className='m-2' />
                    </button>
                </div>

                <div className='input-group flex-grow-1'>
                    <span
                        className='input-group-text'
                    >
                        <FaSearch />
                    </span>
                    <input
                        onChange={handleSearch}
                        className='form-control'
                        type='text'
                        placeholder='Search tasks'
                    />
                </div>
            </div>

            {/* List of items */}
            <div className='d-flex flex-column w-100'>
                {
                    (Array.isArray(tasks) ? tasks : []).map((item) => (
                        <div key={item._id} className='m-2 p-2 border bg-light
                w-100 rounded-3 d-flex justify-content-between
                align-items-center'>
                            <span
                                className={item.isDone ? 'text-decoration-line-through' : ''}
                            >{item.taskName}
                            </span>

                            <div className=''>
                                <button
                                    onClick={() => handleCheckAndUncheck(item)}
                                    className='btn btn-success
                            btn-sm me-2'
                                    type='button'>
                                    <FaCheck />
                                </button>
                                <button
                                    onClick={() => setUpdateTask(item)}
                                    className='btn btn-primary
                            btn-sm me-2'
                                    type='button'>
                                    <FaPencilAlt />
                                </button>
                                <button
                                    onClick={() => handleDeleteTask(item._id)}
                                    className='btn btn-danger
                            btn-sm me-2'
                                    type='button'>
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>

            {/* Toastify */}
            <ToastContainer
                position='top-right'
                autoClose={3000}
                hideProgressBar={false}
            />
        </div>
    )
}

export default TaskManager
