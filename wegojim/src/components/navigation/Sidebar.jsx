import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
    const [open, setOpen] = useState(false);

  return (
    <div className='bg-primary p-5 w-60 flex flex-col justify-between fixed inset-y-0 left-0'>

      <button
        className="fixed z-30 flex items-center justify-center h-12 w-12 bg-primary p-2 rounded-full left-4 bottom-4 shadow-lg lg:hidden"
        onClick={() => setOpen(!open)}
      >
        {/* <MdClose size={20} color="#fff" />   */}
      </button>

      <div 
        className={`bg-primary p-5 h-screen fixed inset-y-0 left-0 lg:w-60 lg:static transform 
          ${open ? "translate-x-0" : "-translate-x-full"}  
          transition-transform duration-300 ease-in-out
        `}
      >
        <img src={'logo'} className="h-6" alt="Logo" />

      {/* Links */}
      <nav>
        <ul>
          <li>
            <NavLink 
              to="/" 
              className={({isActive}) => 
                isActive ? 'text-secondary' : 'text-gray-100'
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/progress" 
              className={({isActive}) => 
                isActive ? 'text-secondary' : 'text-gray-100'
              } 
            >
              Progress
            </NavLink>
          </li>
          <li>
           <NavLink
             to="/plans"
             className={({isActive}) => 
                isActive ? 'text-secondary' : 'text-gray-100'
             }
           >  
             Plans
           </NavLink>
          </li>
        </ul>
      </nav>
    
      {/* Other Links */}
      <span className='flex flex-col text-gray-400'> 
        <a href="/settings">Settings</a>
        <a href="/logout">Logout</a>
      </span>

    </div>
   </div> 
  )
}