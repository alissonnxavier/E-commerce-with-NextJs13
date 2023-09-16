import { UserButton } from '@clerk/nextjs';
import React from 'react'
import MainNav from '@/components/main-nav';
import { NavigationMenuDemo } from './main-nav-test';

const Navbar = () => {
    return (
        <div className='border-b'>
            <div className='flex h-16 items-center px-4'>
                <div>
                    This will be a store switcher
                </div>
                <NavigationMenuDemo />
                <MainNav className='p-4'/>
                <div className='ml-auto flex items-center space-x-4'>
                    <UserButton afterSignOutUrl='/' />
                </div>
            </div>
        </div>
    )
}

export default Navbar;