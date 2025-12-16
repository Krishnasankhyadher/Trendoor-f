import React, { useContext, useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Shopcontext } from '../context/Shopcontext'
import Searchbar from './Searchbar'

const Navbar = () => {
    // Removed 'visible' state since we replaced the side drawer
    const [showDropdown, setShowDropdown] = useState(false)
    const [showSearch, setShowSearch] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    const { getcartcount, token, settoken, setcartitems, navigate } = useContext(Shopcontext)
    const location = useLocation()

    // Scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const logout = () => {
        navigate('/login')
        localStorage.removeItem('token')
        settoken('')
        setcartitems({})
    }

    return (
        <div className={`sticky top-0 z-50 w-full bg-white transition-all duration-300 ${scrolled ? 'shadow-sm' : ''}`}>
            
            {/* --- Main Header Row (Logo & Icons) --- */}
            <div className={`container mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 ${scrolled ? 'py-3' : 'py-5'}`}>
                <div className='flex items-center justify-between'>
                    
                    {/* --- Logo --- */}
                    <Link to='/' className='flex-shrink-0'>
                        <img 
                            src="/Trendoor/images/Screenshot 2025-06-30 141043.png"  
                            loading="lazy" 
                            alt="Trendoor" 
                            className={`transition-all duration-300 object-contain ${scrolled ? 'w-32' : 'w-40'}`} 
                        />
                    </Link>  
                    
                    {/* --- Desktop Navigation (Hidden on Mobile) --- */}
                    <nav className='hidden md:flex gap-10'>
                        {['Home', 'Collection', 'About', 'Contact'].map((item) => (
                            <NavLink 
                                key={item}
                                to={`/${item === 'Home' ? '' : item}`} 
                                className={({ isActive }) => 
                                    `group relative text-sm font-bold uppercase tracking-widest transition-colors duration-300
                                    ${isActive ? 'text-black' : 'text-gray-500 hover:text-black'}`
                                }
                            >
                                {item}
                                <span className={`absolute -bottom-1 left-0 h-0.5 bg-black transition-all duration-300 ease-out
                                    ${({ isActive }) => isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}
                                ></span>
                            </NavLink>
                        ))}
                    </nav>
                    
                    {/* --- Icons --- */}
                    <div className='flex items-center gap-5'>
                        
                        {/* Search */}
                        <button onClick={() => setShowSearch(!showSearch)} className='group p-1'>
                            <img src="https://www.svgrepo.com/show/532555/search.svg" alt="Search" className='w-6 h-6 opacity-60 group-hover:opacity-100 transition-opacity' />
                        </button>
                        
                        {/* Profile Dropdown */}
                        <div className='relative group'>
                            <button onClick={() => !token ? navigate('/login') : setShowDropdown(!showDropdown)} className='group p-1'>
                                <img src="https://www.svgrepo.com/show/512729/profile-round-1342.svg" className="w-6 h-6 opacity-60 group-hover:opacity-100 transition-opacity" alt="Profile" />
                            </button>
                            {token && (
                                <div className={`absolute right-0 mt-3 w-36 bg-white border border-gray-100 shadow-lg py-1 z-20 rounded-md transition-all duration-200 origin-top-right ${showDropdown ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto'}`}>
                                    <button onClick={() => navigate('/order')} className="w-full text-left px-4 py-2 text-xs text-gray-500 hover:bg-gray-50 hover:text-black uppercase tracking-wider">Orders</button>
                                    <button onClick={logout} className="w-full text-left px-4 py-2 text-xs text-gray-500 hover:bg-gray-50 hover:text-red-500 uppercase tracking-wider">Logout</button>
                                </div>
                            )}
                        </div>
                        
                        {/* Cart */}
                        <Link to='/cart' className='group relative p-1'>
                            <img src="https://www.svgrepo.com/show/524270/bag-5.svg" className='w-6 h-6 opacity-60 group-hover:opacity-100 transition-opacity' alt="Cart" />
                            <span className='absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center bg-black text-white rounded-full text-[10px] font-bold leading-none'>{getcartcount()}</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* --- Mobile Navigation Row (Replaces Hamburger Menu) --- */}
            {/* These links are always visible on mobile, no clicking required */}
            <div className={`md:hidden border-t border-gray-100 bg-white transition-all duration-300 ${scrolled ? 'py-2' : 'py-3'}`}>
                <nav className='flex items-center justify-center gap-6 px-4'>
                    {['Home', 'Collection', 'About', 'Contact'].map((item) => (
                        <NavLink 
                            key={item}
                            to={`/${item === 'Home' ? '' : item}`} 
                            className={({ isActive }) => 
                                `text-[10px] font-bold uppercase tracking-[0.2em] transition-colors duration-300
                                ${isActive ? 'text-black border-b border-black pb-0.5' : 'text-gray-400 hover:text-black'}`
                            }
                        >
                            {item}
                        </NavLink>
                    ))}
                </nav>
            </div>

            {/* --- Search Expandable --- */}
            <div className={`overflow-hidden bg-white transition-all duration-300 ease-in-out border-b border-gray-100 ${showSearch ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="container mx-auto px-4 py-3">
                    <Searchbar onClose={() => setShowSearch(false)} />
                </div>
            </div>

        </div>
    )
}

export default Navbar