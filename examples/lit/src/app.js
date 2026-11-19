import { LitElement, html } from 'lit'
import inputDtCSS from 'input-dt/input-dt.css?url'

class App extends LitElement {
  static properties = {
    value: { state: true }
  }

  constructor() {
    super()
    this.value = null
  }

  render() {
    return html`
      <link rel="stylesheet" href=${inputDtCSS}>

      <div>
        Value: ${this.value?.toString() ?? ''}
      </div>
      <div>
        <input-dt
          value=${this.value?.toISOString() ?? ''}
          @input=${event => { this.value = event.currentTarget.value }}
        >
          <input type="text" input-dt>
        </input-dt>
      </div>
    `
  }
}

customElements.define('lit-app', App)
