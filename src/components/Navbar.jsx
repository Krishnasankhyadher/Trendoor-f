import React, { useContext, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Shopcontext } from '../context/Shopcontext'
import Searchbar from './Searchbar'

const Navbar = () => {
    const [visible, setVisible] = useState(false)
    const [showDropdown, setShowDropdown] = useState(false)
    const [showSearch, setShowSearch] = useState(false)

    const { getcartcount, token, settoken, setcartitems, navigate } = useContext(Shopcontext)
    
    const logout = () => {
        navigate('/login')
        localStorage.removeItem('token')
        settoken('')
        setcartitems({})
    }

    return (
        <div className='sticky top-0 z-50 bg-white shadow-sm'>
            <div className='container mx-auto px-4'>
                <div className='flex items-center justify-between py-4'>
                    {/* Logo */}
                    <Link to='/' className='flex items-center'>
                        <img 
                            src="/Trendoor/images/Screenshot 2025-06-30 141043.png"  
                            loading="lazy" 
                            alt="Trendoor Logo" 
                            className='w-36 hover:opacity-90 transition-opacity' 
                        />
                    </Link>  
                    
                    {/* Desktop Navigation */}
                    <ul className='hidden sm:flex gap-8 text-gray-800'>
                        {['Home', 'Collection', 'About', 'Contact'].map((item) => (
                            <li key={item}>
                                <NavLink 
                                    to={`/${item === 'Home' ? '' : item}`} 
                                    className={({ isActive }) => 
                                        `relative py-2 px-1 text-sm font-medium transition-colors hover:text-black
                                        ${isActive ? 'text-black' : 'text-gray-600'}`
                                    }
                                >
                                    {item}
                                    <span className={`absolute bottom-0 left-0 h-0.5 bg-black transition-all duration-300 
                                        ${({ isActive }) => isActive ? 'w-full' : 'w-0'}`}
                                    />
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                    
                    {/* Icons */}
                    <div className='flex items-center gap-6'>
                        {/* Search Icon */}
                        <button 
                            onClick={() => setShowSearch(!showSearch)}
                            className='p-1 hover:bg-gray-100 rounded-full transition-colors'
                        >
                            <img 
                                src="https://www.svgrepo.com/show/532555/search.svg" 
                                alt="Search" 
                                className='w-5 h-5' 
                            />
                        </button>
                        
                        {/* User Profile */}
                        <div className='relative group'>
                            <button
                                onClick={() => {
                                    if (!token) {
                                        navigate('/login')
                                    } else {
                                        setShowDropdown(prev => !prev)
                                    }
                                }}
                                className='p-1 hover:bg-gray-100 rounded-full transition-colors'
                            >
                                <img
                                    src="https://www.svgrepo.com/show/512729/profile-round-1342.svg"
                                    className="w-5 h-5"
                                    alt="User Profile"
                                />
                            </button>
                            {token && (
                                <div className={`absolute right-0 pt-4 z-20 ${showDropdown ? 'block' : 'hidden'} group-hover:block`}>
                                    <div className="flex flex-col gap-3 w-40 py-3 px-4 bg-white border border-gray-100 text-gray-600 rounded shadow-lg">
                                        <button
                                            onClick={() => {
                                                setShowDropdown(false)
                                                navigate('/order')
                                            }}
                                            className="text-left cursor-pointer hover:text-black transition-colors text-sm"
                                        >
                                            My Orders
                                        </button>
                                        <button
                                            onClick={() => {
                                                setShowDropdown(false)
                                                logout()
                                            }}
                                            className="text-left cursor-pointer hover:text-black transition-colors text-sm"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                        
                        {/* Cart */}
                        <Link to='/cart' className='relative p-1 hover:bg-gray-100 rounded-full transition-colors'>
                            <img 
                                src="https://www.svgrepo.com/show/524270/bag-5.svg" 
                                className='w-5 h-5' 
                                alt="Shopping Cart" 
                            />
                            <span className='absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center bg-black text-white rounded-full text-[10px] font-bold'>
                                {getcartcount()}
                            </span>
                        </Link>
                        
                        {/* Mobile Menu Button */}
                        <button 
                            onClick={() => setVisible(true)} 
                            className='p-1 hover:bg-gray-100 rounded-full transition-colors sm:hidden'
                        >
                            <img 
                                src="https://www.svgrepo.com/show/532195/menu.svg" 
                                className='w-5 h-5' 
                                alt="Menu" 
                            />
                        </button>
                    </div>
                    
                    {/* Mobile Menu */}
                    <div className={`fixed top-0 right-0 bottom-0 w-full bg-white z-50 transition-all duration-300 transform ${visible ? 'translate-x-0' : 'translate-x-full'}`}>
                        <div className='flex flex-col h-full'>
                            <div 
                                onClick={() => setVisible(false)} 
                                className='flex items-center gap-4 p-5 cursor-pointer border-b'
                            >
                                <img 
                                    className='w-5' 
                                    src="https://www.svgrepo.com/show/533623/close.svg" 
                                    alt="Close Menu" 
                                />
                                <p className='font-medium'>Close</p>
                            </div>
                            
                            <div className='flex-1 overflow-y-auto'>
                                {['Home', 'Collection', 'About', 'Contact'].map((item) => (
                                    <NavLink 
                                        key={item}
                                        className={({ isActive }) => 
                                            `block py-4 px-6 border-b text-gray-700 hover:bg-gray-50 transition-colors
                                            ${isActive ? 'font-medium text-black' : ''}`
                                        }
                                        onClick={() => setVisible(false)} 
                                        to={`/${item === 'Home' ? '' : item}`}
                                    >
                                        {item}
                                    </NavLink>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Search Bar - Appears when search icon is clicked */}
                {showSearch && (
                    <div className='py-3 border-t border-gray-200'>
                        <Searchbar onClose={() => setShowSearch(false)} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default Navbar