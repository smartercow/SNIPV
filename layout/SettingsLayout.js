import React from 'react'
import Sidebar from '../components/Settings/Sidebar'

const SettingsLayout = ({children}) => {
  
  return (
    <div className='min-h-[70vh] flex gap-3'>
        <div>
            <Sidebar />
        </div>
        <div>
            {children}
        </div>
    </div>
  )
}

export default SettingsLayout