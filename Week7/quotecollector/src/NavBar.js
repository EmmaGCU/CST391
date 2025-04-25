import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav className='navbar navbar-expand-lg navbar-light bg-light'>
            <span className='navbar-brand' href='#'>
                Quote Collector
            </span>
            <button
                className='navbar-toggler'
                type='button'
                data-toggle='collapse'
                data-target='#navbarNavAltMarkup'
                aria-controls='navbarNavAltMarkup'
                aria-expanded='false'
                aria-label='Toggle navigation'
            >
                <span className='navbar-toggler-icon'></span>
            </button>
            <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
                <div className='navbar-nav'>
                    <span className='nav-item nav-link' href='#'>
                        <Link to='/login'>Login</Link>
                    </span>
                    <span className='nav-item nav-link' href='#'>
                        <Link to='/signup'>Sign Up</Link>
                    </span>
                    <span className='nav-item nav-link' href='#'>
                        <Link to='/add'>Add Quote</Link>
                    </span>
                    <span className='nav-item nav-link' href='#'>
                        <Link to='/quotes'>Quotes</Link>
                    </span>
                    <span className='nav-item nav-link' href='#'>
                        <Link to='/search'>Search</Link>
                    </span>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;