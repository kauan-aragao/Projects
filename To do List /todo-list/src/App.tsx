import React from 'react'
import './global.css'

import { Header } from './components/Header'
import { TaskList } from './components/TaskList'

export function App() {
  return (
    <>
      <Header/>
      <TaskList/>
    </>    
  )
}


