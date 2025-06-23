import React from 'react'
import Button from './Button'
import { Map, User, PlusCircle } from 'lucide-react'

const BottomNav = () => {
  return (
    <nav className="md:hidden fixed bottom-0 w-full flex justify-around bg-white border-t py-2">
      <Button className="bg-transparent" aria-label="Map">
        <Map className="h-6 w-6" />
      </Button>
      <Button className="bg-transparent" aria-label="Add Pin">
        <PlusCircle className="h-6 w-6" />
      </Button>
      <Button className="bg-transparent" aria-label="Profile">
        <User className="h-6 w-6" />
      </Button>
    </nav>
  )
}

export default BottomNav
