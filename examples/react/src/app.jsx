import { useState, useEffect, useRef } from 'react'

export function App() {
  const [value, setValue] = useState()

  const dtRef = useRef(null)

  useEffect(() => {
    const handler = event => setValue(event.target.value)
    dtRef.current?.addEventListener('input', handler)
    return () => {
      dtRef.current?.removeEventListener('input', handler)
    }
  }, [])

  return (
    <>
      <div>
        Value: {value?.toString()}
      </div>
      <div>
        <input-dt value={value?.toISOString()} ref={dtRef}>
          <input type="text" input-dt="" />
        </input-dt>
      </div>
    </>
  )
}
