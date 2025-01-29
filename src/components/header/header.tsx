import React from 'react';
import Logo from './logo'
import Nav from './nav';

const Header: React.FC = () => {
    return (
        <div className='mb-4'>
            <header className="flex items-baseline justify-between">
                <Logo/>
                <Nav/>
                
            </header>
            <hr></hr> 
        </div>
    );
};

export default Header;