import { compact } from 'jito'
import inputDtCSS from 'input-dt/input-dt.css?url'

const main = ({ watch }) => {
  const state = watch({
    value: null
  })
  return [state]
}

const html = /* html */`
  <link rel="stylesheet" href="${inputDtCSS}">

  <div>
    value: {{ value && value.toString() }}
  </div>
  <div>
    <input-dt
      value:="value ? value.toISOString() : ''"
      oninput="value = event.target.value"
    >
      <input type="text" input-dt>
    </input-dt>
  </div>
`

export default compact(html, main)