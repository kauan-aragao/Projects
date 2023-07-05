import React from 'react'
import styles from './Task.module.css'
import { Trash } from 'phosphor-react'
import { useState } from 'react'
import check from '../assets/check.svg'
import checkHover from '../assets/checkHover.svg'
import checkedHover from '../assets/checkedHover.svg' 
import checked from '../assets/checked.svg'

interface TaskProps{
    content: string,
    onDeleteTask:(taskToDelete : string) =>void 
    onConcludedTask :( concludedTask :string) => void
}

export function Task({content, onDeleteTask,onConcludedTask} : TaskProps){
    const [isChecked,setIsChecked] = useState(false) 
    const [isHovered, setIsHovered] = useState(false)

    function handleCheckBoxAndConclude(){
        setIsChecked((isChecked) => {
            return !isChecked
         });
        handleConcludedTask()
    }

    function handleActivateHover(){
        setIsHovered(true)
    }

    function handleDesactivateHover(){
        setIsHovered(false)
    }

    function handleDeleteTask(){
        onDeleteTask(content)
    }

    function handleConcludedTask(){
        onConcludedTask(content)
    }

    return(
        <div className={styles.taskLayout}>
            <button 
              onMouseEnter={handleActivateHover} 
              onMouseLeave={handleDesactivateHover} 
              onClick={handleCheckBoxAndConclude} 
              className={styles.circleButton}
            >
                { 
                isChecked ?  
                isHovered ? <img  src={checkedHover} alt="icone checked em estado hover"/> : <img  src={checked} alt="icone checked sem estado hover"/>
                : isHovered ? <img  src={checkHover} alt="icone check em estado hover"/> : <img  src={check} alt="icone check sem estado hover"/> 
                }
            </button>
            <h3 className={isChecked ? styles.completedTask : styles.normalTask }>{content}</h3>
            <button onClick={handleDeleteTask} className={styles.trashButton} title="Deletar Tarefa">
                <Trash size={20}/>
            </button>
        </div>
    )
}