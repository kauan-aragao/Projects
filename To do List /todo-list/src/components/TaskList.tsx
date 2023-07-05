import React, { ChangeEvent, FormEvent, useState } from 'react'
import styles from './TaskList.module.css'
import plus from '../assets/plus.svg'
import { NoTask } from './NoTask'
import { Task } from './Task'

interface Task{
    content: string;
}

export function TaskList(){
    const [newTask,setNewTask] = useState('')
    const [allTasks,setAllTasks]: any = useState([])
    const [concludedTask , setConcludedTask] : any = useState([])

    function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>){
        setNewTask(event.target.value)
    }

    function handleCreateNewTask(event:FormEvent){
        event.preventDefault()
        setAllTasks([...allTasks,newTask])
        setNewTask('')
    }

    function deleteTask( taskToDelete : string){
        const tasksWithoutDeletedOne = allTasks.filter((task: string) =>{
            return task !== taskToDelete
        })
        setAllTasks(tasksWithoutDeletedOne)
        deleteConcludedTask(taskToDelete)  
    }

    function deleteConcludedTask(taskToDelete: string){
        const concludedTasksWhitoutDeletedOne = concludedTask.filter((task:string) =>{
            return taskToDelete !== task
        })
        setConcludedTask(concludedTasksWhitoutDeletedOne)
    }

    function concludeTask(taskToConclude : string){
        const indexOfConcludedTask = concludedTask.indexOf(taskToConclude)
        if(indexOfConcludedTask === -1){
            setConcludedTask([...concludedTask,taskToConclude])
        }
        else{
            const newConcludedTasks = concludedTask.filter((task :string) => task !== taskToConclude)
            setConcludedTask(newConcludedTasks)
        }
    }

    const isNewTaskEmpty = newTask.length == 0

    return (
        <div className={styles.container}>
            <header>
                <form onSubmit={handleCreateNewTask} className={styles.formTask}>
                    <input 
                    value={newTask}
                    onChange={handleNewTaskChange}
                    className={styles.inputTask}
                    type="text" 
                    placeholder="Adicione uma nova tarefa"
                    />

                    <button title='Criar Nova Task' className={styles.taskButton} type="submit" disabled={isNewTaskEmpty}>
                        Criar 
                        <img src={plus} alt="ícone de mais" />
                    </button>
                </form>
            </header>
            <main>
                <div className={styles.taskList}>
                    <div className={styles.tasksCreated}>
                        <h2>Tarefas criadas</h2>
                        <span>{allTasks.length}</span>
                    </div>
                    <div className={styles.completedTasks}>
                        <h2>Concluídas</h2>
                        <span>{concludedTask.length} de {allTasks.length}</span> 
                    </div>
                </div>
                {allTasks.length == 0 ? <NoTask/> 
                    :  allTasks.map((task : string) => {
                    return(
                        <Task 
                        key={task}
                        content={task}
                        onDeleteTask={deleteTask}
                        onConcludedTask={concludeTask}
                        />
                    )
                })}
            </main>
        </div>
            
    )
}