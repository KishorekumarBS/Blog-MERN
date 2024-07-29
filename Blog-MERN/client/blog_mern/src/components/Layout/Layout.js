import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Header/Header'

function Layout() {
  return (
    <main>
        <Header/>
        <Outlet/>
    </main>
  )
}

export default Layout