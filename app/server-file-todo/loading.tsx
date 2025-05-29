import React from 'react'

const loading = () => {
  return (
    <div>
        <div className="flex items-center justify-center gap-5 pt-3">
            <p className="text-gray-500">Loading Todos...</p>
        </div>
        <div className="flex items-center justify-center gap-5 pt-3">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
        </div>
    </div>
  )
}

export default loading