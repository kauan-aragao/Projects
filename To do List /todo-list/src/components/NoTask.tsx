import React from 'react'
import clipboard from '../assets/clipboard.svg'

import styles from './NoTask.module.css'

export function NoTask(){
    return(
        <div className={styles.noTask}>
            <img src={clipboard} alt="icone do clipboard"/>
                <h3>
                Você ainda não tem tarefas cadastradas 
                </h3>
                <h4>
                    Crie tarefas e organize seus itens a fazer
                </h4>
        </div>
    )
}