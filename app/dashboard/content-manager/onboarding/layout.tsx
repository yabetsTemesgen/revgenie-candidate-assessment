import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="fixed inset-0 z-10 flex justify-center bg-white/80 backdrop-blur-sm overflow-y-auto py-8">
      <div className="w-full max-w-2xl px-4">{children}</div>
    </div>
  )
}

export default layout