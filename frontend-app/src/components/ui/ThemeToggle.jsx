import React, { useState, useEffect } from 'react'
import Switch from '@mui/material/Switch'

const ThemeToggle = () => {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    document.body.classList.toggle('dark', enabled)
  }, [enabled])

  return (
    <Switch
      checked={enabled}
      onChange={() => setEnabled(!enabled)}
      inputProps={{ 'aria-label': 'theme toggle' }}
    />
  )
}

export default ThemeToggle
