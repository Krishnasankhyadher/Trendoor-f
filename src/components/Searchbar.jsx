import React, { useContext, useState, useEffect, useRef } from 'react'
import { Shopcontext } from '../context/Shopcontext'
import { useLocation, useNavigate } from 'react-router-dom'

const Searchbar = ({ onClose }) => {
    const { searchQuery, performSearch, clearSearch } = useContext(Shopcontext)
    const [localQuery, setLocalQuery] = useState('')
    const inputRef = useRef(null)
    const location = useLocation()
    const navigate = useNavigate()

    // Initialize local query when searchQuery changes
    useEffect(() => {
        setLocalQuery(searchQuery)
    }, [searchQuery])

    // Focus input when component mounts
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }, [])

    const handleSearch = (e) => {
        e.preventDefault()
        if (localQuery.trim()) {
            performSearch(localQuery)
            onClose?.()
        }
    }

    const handleClear = () => {
        setLocalQuery('')
        clearSearch()
        if (location.pathname === '/search') {
            navigate('/')
        }
    }

    return (
        <div className='container mx-auto px-4'>
            <form 
                onSubmit={handleSearch} 
                className='relative flex items-center'
            >
                <input 
                    ref={inputRef}
                    value={localQuery}
                    onChange={(e) => setLocalQuery(e.target.value)}
                    type="text" 
                    placeholder='Search products...' 
                    className='flex-1 py-2 pl-4 pr-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all' 
                />
                {localQuery && (
                    <button 
                        type="button" 
                        onClick={handleClear}
                        className='absolute right-10 p-1 text-gray-500 hover:text-black transition-colors'
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                    </button>
                )}
                <button 
                    type="submit"
                    className='absolute right-2 p-1 text-gray-500 hover:text-black transition-colors'
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                </button>
            </form>
        </div>
    )
}

export default Searchbar