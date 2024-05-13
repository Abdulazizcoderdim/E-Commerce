import Link from 'next/link'
import React from 'react'
import Menu from './Menu'

const Header = () => {
  return (
    <header>
        <nav>
            <div className='navbar justify-between bg-base-300'>
                <Link href="/" className='btn btn-ghost text-lg'>
                   E-Commerce 
                </Link>
                <Menu/>
            </div>
        </nav>
    </header>
  )
}

export default Header