import React from 'react'
import Navbar from './customer/components/Navbar/Navbar'
import { ThemeProvider } from '@mui/material'
import customTheme from './Theme/customTheme'
import Home from './customer/pages/Home/Home'
 

function App() {

  return (


    <ThemeProvider theme={customTheme}>
      
      <div>
        <Navbar />
        <Home/>
        
      </div>
    </ThemeProvider>

  )
}

export default App
