import { useState } from 'react'

export function App() {
  const [value, setValue] = useState(null)

  return (
    <>
      <div>
        Value: {value?.toString()}
      </div>
      <div>
        <input-dt value={value} oninput={event => setValue(event.currentTarget.value)}>
          <input type="text" input-dt="" />
        </input-dt>
      </div>
    </>
  )
}
