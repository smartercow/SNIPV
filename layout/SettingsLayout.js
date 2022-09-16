import React from 'react'
import Sidebar from '../components/Settings/Sidebar'

const SettingsLayout = ({children}) => {
  return (
    <div className='flex gap-3'>
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