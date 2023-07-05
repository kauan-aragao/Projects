import React from 'react'
import styles from './Header.module.css'
import logo from '../assets/rocket.svg' 

export function Header(){
    return(
        <div className={styles.logoHeader}>
            <div className={styles.logo}>
                <img src={logo} alt="Logo do todo" />
                <h1>to<span>do</span></h1>
            </div>
        </div>
    )
}