import React from 'react';

const Logo: React.FC = () => {
    return (
        <div className=''>
            <a href="/">
                <div className="py-2 px-4 bg-white border border-gray-200 shadow-lg flex items-center rounded-full">
                    <p className="text-3xl font-semibold dosis-font text-dali">DALI Link</p>
                </div>
            </a>
        </div>
    );
};

export default Logo;

