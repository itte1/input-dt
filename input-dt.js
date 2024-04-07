let prefix = 'input-dt_'

function addClass(el, name) {
  if (el) {
    el.classList.add(...name.split(' ').map(name => prefix + name))
  }
}
function h(name, ...children) {
  let el = document.createElement('div')
  addClass(el, name)
  if (children && children.length) {
    let fragment = new DocumentFragment()
    fragment.append(...children)
    el.append(fragment)
  }
  return el
}

function t(text) {
  return document.createTextNode(text + '')
}

function find(el, name) {
  return el.querySelector('.' + prefix + name)
}
function replaceChildren(el, children) {
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
  let fragment = new DocumentFragment()
  fragment.append(...children)
  el.append(fragment)
}

function unitNumber(unitName) {
  switch(unitName) {
    case 'year': case 'years': return 1e10
    case 'month': case 'months': return 1e8
    case 'day': case 'days': case 'date': return 1e6
    case 'hour': case 'hours': return 1e4
    case 'minute': case 'minutes': return 1e2
    default: return 0
  }
}

/** 最小単位で切り捨てた時刻の値を取得する(Number型の範囲をオーバーフローするので注意) */
function unitDateValue(date, unitName) {
  return Math.floor((date.getFullYear() * 1e10
    + date.getMonth() * 1e8
    + date.getDate() * 1e6
    + date.getHours() * 1e4
    + date.getMinutes() * 1e2
    + date.getSeconds()) / unitNumber(unitName))
}

function pad2(value) {
  return (value + '').padStart(2, '0')
}

function isDate(date) {
  return date instanceof Date && !Number.isNaN(date.getTime())
}

function format(date, format = 'YYYY-MM-DDTHH:mm:ss') {
  if (date) {
    return format.replace(/y{1,5}|Y{4}|M{1,2}|D{1,2}|H{1,2}|m{1,2}|s{1,2}/g, m => {
      switch (m) {
        case 'yy':
        case 'yyyy': return (date.getFullYear() + '').padStart(m.length, '0')
        case 'YYYY': return date.getFullYear() + ''
        case 'M': return date.getMonth() + 1 + ''
        case 'MM': return pad2(date.getMonth() + 1)
        case 'D': return date.getDate() + ''
        case 'DD': return pad2(date.getDate())
        case 'H': return date.getHours() + ''
        case 'HH': return pad2(date.getHours())
        case 'm': return date.getMinutes() + ''
        case 'mm': return pad2(date.getMinutes())
        case 's': return date.getSeconds() + ''
        case 'ss': return pad2(date.getSeconds())
        default: return ''
      }
    })
  } else {
    return ''
  }
}
function formatDateOnly(date) {
  return format(date, 'YYYY-MM-DD')
}

class YearSelect {
  constructor() {
    this.el = h('select active select-year')
    this.locales = undefined
    let tempDate = new Date()
    this.format = value => {
      tempDate.setFullYear(value)
      return this.formatter.format(tempDate)
    }
    this.render = value => h('year', t(this.format(value)))
  }
  set min(value) {
    this._min = unitDateValue(value, 'year')
  }
  set max(value) {
    this._max = unitDateValue(value, 'year')
  }
  set date(value) {
    this._selectedYear = value.getFullYear()
  }
  set locales(value) {
    this.formatter = new Intl.DateTimeFormat(value || undefined, { year: 'numeric' })
  }
  open() {
    replaceChildren(this.el, [...Array(this._max - this._min + 1).keys()].map(i => {
      let value = this._min + i
      let isSelected = value === this._selectedYear
      let option = h(
        `option option-${value}`,
        this.render(value, { isSelected })
      )
      if (isSelected) {
        addClass(option, 'option-selected')
      }
      option.addEventListener('click', () => this.onSelect && this.onSelect(value))
      return option
    }))
    let selectedEl = this.el.querySelector(`.${prefix}option-selected`)
    if (selectedEl) {
      selectedEl.scrollIntoView()
    }
  }
}

class MonthSelect {
  constructor() {
    this.el = h('select active select-month')
    this.locales = undefined
    let tempDate = new Date()
    this.format = value => {
      tempDate.setMonth(value)
      return this.formatter.format(tempDate)
    }
    this.render = value => h('month', t(this.format(value)))
  }
  set min(value) {
    this._min = unitDateValue(value, 'month')
  }
  set max(value) {
    this._max = unitDateValue(value, 'month')
  }
  set date(value) {
    this._selectedYear = value.getFullYear()
    this._selectedMonthIndex = value.getMonth()
  }
  set locales(value) {
    this.formatter = new Intl.DateTimeFormat(value || undefined, { month: 'long' })
  }
  open() {
    let tempDate = new Date(this._selectedYear, 0)
    replaceChildren(
      this.el,
      [...Array(12).keys()]
        .filter(i => {
          tempDate.setMonth(i)
          let x = unitDateValue(tempDate, 'month')
          return x >= this._min && x <= this._max
        })
        .map(i => {
          let isSelected = i === this._selectedMonthIndex
          let option = h(
            `option option-${i + 1}`,
            this.render(i, { isSelected }),
          )
          if (isSelected) {
            addClass(option, 'option-selected')
          }
          option.addEventListener('click', () => this.onSelect && this.onSelect(i))
          return option
        })
    )
    let selectedEl = this.el.querySelector(`.${prefix}option-selected`)
    if (selectedEl) {
      selectedEl.scrollIntoView()
    }
  }
}

class Calender {
  constructor() {
    this.el = h('calender')
    this.disable = []
    this.locales = undefined
    this.format = value => value
    let baseDate = new Date()
    this.formatWeek = value => {
      let day = baseDate.getDay();
      let diff = value - day;
      baseDate.setDate(baseDate.getDate() + diff);
      return this.weekFormatter.format(baseDate)
    }
    this.render = value => h('day', t(this.format(value.getDate())))
    this.renderWeek = value => h('week', t(this.formatWeek(value)))
    this.weekDays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
  }
  set min(value) {
    this._min = unitDateValue(value, 'day')
  }
  set max(value) {
    this._max = unitDateValue(value, 'day')
  }
  set date(value) {
    this._selectedDateText = value ? formatDateOnly(value) : ''
  }
  set locales(value) {
    this.weekFormatter = new Intl.DateTimeFormat(value || undefined, { weekday: 'short' })
    this._locale = new Intl.Locale(value || navigator.language)
  }
  set firstDay(value) {
    this._firstDay = value
  }
  get firstDay() {
    return this._firstDay
  }
  set disable(value) {
    this._disable = value.map(formatDateOnly) 
  }
  open(year, monthIndex) {
    let children = []
    let weekChildren = []

    let { firstDay, weekend } = this._locale.weekInfo || { firstDay: 7, weekend: [] }
    firstDay = firstDay % 7
    weekend = weekend.map(d => d % 7)

    let firstDate = new Date(year, monthIndex)
    let nextFirstDate = new Date(firstDate)
    nextFirstDate.setMonth(nextFirstDate.getMonth() + 1)
  
    let endDate = new Date(nextFirstDate)
    endDate.setDate(endDate.getDate() - 1)

    let firstDateDayOfWeek = firstDate.getDay()
    let startSpaceCount = Math.abs(firstDateDayOfWeek - ((this._firstDay !== undefined) ? this._firstDay : firstDay))
    let countOfMonth = endDate.getDate()
    let lastIndex = startSpaceCount + countOfMonth
    let endSpaceCount = (lastIndex > 35 ? 42 : 35) - lastIndex
    Array(lastIndex + endSpaceCount).fill().forEach((_, i) => {
      let date = new Date(firstDate)
      date.setDate(i + 1 - startSpaceCount)
      let dayOfWeek = date.getDay()
      let dateText = formatDateOnly(date)
      let x = unitDateValue(date, 'day')

      let isSelected = dateText === this._selectedDateText
      let isWeekend = weekend.includes(dayOfWeek)
      let isInside = i < lastIndex
      let isOutside = i < startSpaceCount || i >= lastIndex
      let isDisabled = this._disable.includes(dateText) || x < this._min || x > this._max

      let cell = h(
        `cell cell-${date.getDate()} cell-${this.weekDays[dayOfWeek]}`,
        this.render(date, {
          isWeekend,
          isInside,
          isOutside,
          isDisabled,
          isSelected,
        })
      )

      if (isWeekend) {
        addClass(cell, 'cell-weekend')
      }
      if (isInside) {
        addClass(cell, 'cell-inside')
      }
      if (isOutside) {
        addClass(cell, 'cell-outside')
      }
      if (isSelected) {
        addClass(cell, 'cell-selected')
      }
      if (isDisabled) {
        addClass(cell, 'cell-disabled')
      }
      if (!isDisabled) {
        cell.addEventListener('click', () => this.onSelect && this.onSelect(date))
      }

      children.push(cell)

      if (i < 7) {
        let week = h(
          `week-cell cell-${this.weekDays[dayOfWeek]}`,
          this.renderWeek(dayOfWeek)
        )
        if (isWeekend) {
          addClass(week, 'cell-weekend')
        }
        weekChildren.push(week)
      }
    })
    replaceChildren(this.el, [...weekChildren, ...children])
  }
}

class TimeSelect {
  constructor(unitName) {
    this._unitName = unitName
    this.el = h(`select select-time select-${unitName}`)
    this.format = value => pad2(value)
    this.render = value => h(this._unitName, t(this.format(value)))
    this.values = null
  }
  set date(value) {
    let name = this._unitName
    let camel = name[0].toUpperCase() + name.slice(1)
    this._selectedValue = value ? value[`get${camel}s`]() : null
    this._rerender()
  }
  open() {
    this._rerender()
    let selectedEl = this.el.querySelector(`.${prefix}option-selected`)
    if (selectedEl) {
      selectedEl.scrollIntoView({ block: 'center' })
    }
  }
  _rerender() {
    let name = this._unitName
    replaceChildren(
      this.el,
        [...Array(name === 'hour' ? 24 : 60).keys()]
          .filter(i => this.values ? this.values.includes(i) : true)
          .map(i => {
            let isSelected = i === this._selectedValue
            let option = h(
              `option option-${i}`,
              this.render(i, { isSelected }),
            )
            if (isSelected) {
              addClass(option, 'option-selected')
            }
            option.addEventListener('click', () => this.onSelect && this.onSelect(i))
            return option
          })
    )
  }
}

class FormatButton {
  constructor(className, options) {
    this.el = h(className)
    this.el.addEventListener('click', () => this.onClick())
    this.options = options
    this.locales = undefined
    this.format = date => this.formatter.format(date)
  }
  set date(value) {
    replaceChildren(this.el, [t(this.format(value))])
  }
  set locales(value) {
    this.formatter = new Intl.DateTimeFormat(value || undefined, this.options)
  }
}

export class InputDt extends HTMLElement {
  constructor() {
    super()
    this.open = this.open.bind(this)
    this.close = this.close.bind(this)
    this.clear = this.clear.bind(this)
    ;['min', 'max', 'disable'].forEach(name => {
      this[`_${name}Refresh`] = this[`_${name}Refresh`].bind(this)
      this[`_${name}s`] = []
      this[`_${name}Targets`] = []
    })

    let yearSelect = new YearSelect()
    yearSelect.onSelect = value => {
      this.open(value, this._monthIndex)
      this._inactive('box-year')
    }

    let yearDisplay = new FormatButton('year-display', { year: 'numeric' })
    yearDisplay.onClick = () => {
      this._yearSelect.open(this._year)
      this._active('box-year')
      this._active('film')
    }

    let monthSelect = new MonthSelect()
    monthSelect.onSelect = value => {
      this.open(this._year, value)
      this._inactive('box-month')
    }

    let monthDisplay = new FormatButton('month-display', { month: 'long' })
    monthDisplay.onClick = () => {
      this._monthSelect.open(this._month)
      this._active('box-month')
      this._active('film')
    }

    let calender = new Calender()
    calender.onSelect = value => {
      if (this.value) {
        this.value = new Date(value.getFullYear(), value.getMonth(), value.getDate(), this.value.getHours(), this.value.getMinutes(), this.value.getSeconds())
      } else {
        this.value = value
      }
      if (this.autoClose) {
        this.close()
      } else {
        this.open(this._year, this._monthIndex)
        this._openTime()
      }
    }

    let hourSelect = new TimeSelect('hour')
    hourSelect.onSelect = value => {
      let date = new Date(this.value)
      date.setHours(value)
      this.value = date
    }

    let minuteSelect = new TimeSelect('minute')
    minuteSelect.onSelect = value => {
      let date = new Date(this.value)
      date.setMinutes(value)
      this.value = date
    }

    let secondSelect = new TimeSelect('second')
    secondSelect.onSelect = value => {
      let date = new Date(this.value)
      date.setSeconds(value)
      this.value = date
    }

    this._yearSelect = yearSelect
    this._yearDisplay = yearDisplay
    this._monthSelect = monthSelect
    this._monthDisplay = monthDisplay
    this._calender = calender
    this._hourSelect = hourSelect
    this._minuteSelect = minuteSelect
    this._secondSelect = secondSelect

    this._modal = h('modal',
      h('background'),
      h('box box-date',
        h('header',
          h('prev'),
          h('dates', yearDisplay.el, monthDisplay.el),
          h('next'),
        ),
        calender.el,
        h('film'),
        h('box box-year', yearSelect.el),
        h('box box-month', monthSelect.el),
      ),
      h('box box-time',
        hourSelect.el,
        minuteSelect.el,
        secondSelect.el,
      ),
    )

    this._modal.addEventListener('click', event => {
      event.stopPropagation()
      event.preventDefault()
    })
    find(this._modal, 'prev').addEventListener('click', () => {
      if (this._monthIndex <= 0) {
        this.open(this._year - 1, 11) 
      } else {
        this.open(this._year, this._monthIndex - 1) 
      }
    })
    find(this._modal, 'next').addEventListener('click', () => {
      if (this._monthIndex >= 11) {
        this.open(this._year + 1, 0) 
      } else {
        this.open(this._year, this._monthIndex + 1) 
      }
    })
    find(this._modal, 'film').addEventListener('click', () => this.open(this._year, this._monthIndex))
    find(this._modal, 'background').addEventListener('click', () => this.close())

    this.min = null
    this.max = null
    this.unit = 'second'
    this.background = false
    this.autoClose = false
    this.format = date => this.formatter.format(date)
  }
  connectedCallback() {
    this.classList.add('input-dt')
    this.append(this._modal)
    this._attach()
    document.addEventListener('click', this.close)
  }

  disconnectedCallback() {
    document.removeEventListener('click', this.close)
    this._detach()
    this._modal.remove()
    ['min', 'max', 'disable'].forEach(name => {
      this[`_${name}Targets`].forEach(target => { target.removeEventListener('input', this[`_${name}Refresh`]) })
    })
  }

  static get observedAttributes() {
    return ['value', 'min', 'max', 'disable', 'hours', 'minutes', 'seconds', 'unit', 'locales', 'background', 'auto-close', 'first-day']
  }

  attributeChangedCallback(name, _, value) {
    let camel = name.split('-').map((w, i) => i === 0 ? w : w[0].toUpperCase() + w.slice(1)).join('')
    switch (camel) {
      case 'value':
        setTimeout(() => this[camel] = value ? new Date(value) : null)
        break;
      case 'disable':
        this.close()
        /* falls through */
      case 'min':
      case 'max': {
        this[`_${camel}Targets`].forEach(target => { target.removeEventListener('input', this[`_${camel}Refresh`]) })
        let texts = value.split(',')
        this[`_${camel}Targets`] = this._getTargets(texts)
        this[`_${camel}s`] = [
          ...texts.map(text => new Date(text)).filter(date => isDate(date)).map(date => () => date),
          ...this[`_${camel}Targets`].map(target => {
            target.addEventListener('input', this[`_${camel}Refresh`])
            return () => target.value
          }),
        ]
        this[`_${camel}Refresh`]()
        break
      }
      case 'hours':
      case 'minutes':
      case 'seconds':
        this[camel] = value ? value.split(',').map(value => Number(value)) : null
        break;
      case 'unit':
      case 'locales':
        this[camel] = value
        break
      case 'background':
      case 'autoClose':
        this[camel] = Boolean(value)
        break
      case 'firstDay':
        this[camel] = Number(value)
        break
    }
  }

  set value(date) {
    this._date = date
    this._calender.date = date
    this._hourSelect.date = date
    this._minuteSelect.date = date
    this._secondSelect.date = date
    this._dispatch()
  }
  get value() {
    return this._date
  }

  set min(value) {
    if (!value) {
      value = new Date()
      value.setFullYear(value.getFullYear() - 120)
    }
    this._yearSelect.min = value
    this._monthSelect.min = value
    this._calender.min = value
    this._min = value
  }
  get min() {
    return this._min
  }

  set max(value) {
    if (!value) {
      value = new Date()
      value.setFullYear(value.getFullYear() + 10)
    }
    this._yearSelect.max = value
    this._monthSelect.max = value
    this._calender.max = value
    this._max = value
  }
  get max() {
    return this._max
  }

  set disable(value) {
    this._calender.disable = value
    let thisDateText = this.value ? formatDateOnly(this.value) : ''
    if (this._calender._disable.includes(thisDateText)) {
      this.value = null
    }
    this._disable = value
  }
  get disable() {
    return this._disable
  }

  set hours(value) { this._hourSelect.values = value }
  get hours() { return this._hourSelect.values }

  set minutes(value) { this._minuteSelect.values = value }
  get minutes() { return this._minuteSelect.values }

  set seconds(value) { this._secondSelect.values = value }
  get seconds() { return this._secondSelect.values }

  set unit(value) {
    this._unitNumber = Math.min(unitNumber('day'), Math.max(unitNumber('second'), unitNumber(value)))
    this._resetFormatter()
    this._unit = value
  }
  get unit() {
    return this._unit
  }

  set locales(value) {
    this._resetFormatter(value)
    this._yearSelect.locales = value
    this._monthSelect.locales = value
    this._yearDisplay.locales = value
    this._monthDisplay.locales = value
    this._calender.locales = value
  }
  get locales() {
    return this._locales
  }
  set background(value) {
    this._background = value
  }
  get background() {
    return this._background
  }
  set autoClose(value) {
    this._autoClose = value
  }
  get autoClose() {
    return this._autoClose
  }
  set firstDay(value) {
    this._calender.firstDay = value == 0 ? 0 : value ? (value % 7) : undefined
  }
  get firstDay() {
    return this._calender.firstDay
  }

  get modal() {
    return this._modal
  }

  set format(value) {
    if (value) {
      this._format = value
    }
  }

  set formatYear(value) {
    this._yearSelect.format = value
    this._yearDisplay.format = value
  }
  set formatMonth(value) {
    this._monthSelect.format = value
    this._monthDisplay.format = value
  }
  set formatWeek(value) { this._calender.formatWeek = value }
  set formatDay(value) { this._calender.format = value }
  set formatHour(value) { this._hourSelect.format = value }
  set formatMinute(value) { this._minuteSelect.format = value }
  set formatSecond(value) { this._secondSelect.format = value }

  set renderYear(value) { this._yearSelect.render = value }
  set renderMonth(value) { this._monthSelect.render = value }
  set renderWeek(value) { this._calender.renderWeek = value }
  set renderDate(value) { this._calender.render = value }
  set renderHour(value) { this._hourSelect.render = value }
  set renderMinute(value) { this._minuteSelect.render = value }
  set renderSecond(value) { this._secondSelect.render = value }

  open(year, monthIndex) {
    this._blur()

    if (year === undefined || monthIndex === undefined) {
      if (this.value) {
        year = this.value.getFullYear()
        monthIndex = this.value.getMonth()
      } else {
        let yearMonth = Math.max(unitDateValue(this.min, 'month'), Math.min(unitDateValue(this.max, 'month'), unitDateValue(new Date(), 'month')))
        year = Math.floor(yearMonth / 100)
        monthIndex = yearMonth % 100
      }
    }
    this._year = year
    this._monthIndex = monthIndex

    this._inactive('box-year') 
    this._inactive('box-month') 
    this._inactive('film') 
    this._inactive('box-time') 
    let tempDate = new Date(year, monthIndex)
    this._yearSelect.date = tempDate
    this._yearDisplay.date = tempDate
    this._monthSelect.date = tempDate
    this._monthDisplay.date = tempDate

    this._calender.open(year, monthIndex)
    this._active('modal') 
    this._active('box-date')
    if (this.background) {
      this._active('background')
    }
    this._stopClose()
  }

  close() {
    if (!this._isStopClose) {
      this._inactive('modal') 
      this._inactive('background')
    }
  }

  clear() {
    this.value = null
  }

  _openTime(year, monthIndex) {
    if (this._unitNumber <= unitNumber('hour')) {
      this._active('select-hour')
      this._hourSelect.open()
      if (this._unitNumber <= unitNumber('minute')) {
        this._minuteSelect.open()
        this._active('select-minute')
      } else {
        this._inactive('select-minute')
      }
      if (this._unitNumber <= unitNumber('second')) {
        this._secondSelect.open()
        this._active('select-second')
      } else {
        this._inactive('select-second')
      }
      this._inactive('box-date')
      this._active('box-time')
    }
  }

  _stopClose() {
    this._isStopClose = true
    if (this._stopTimer) {
      clearTimeout(this._stopTimer)
    }
    this._stopTimer = setTimeout(() => {
      this._isStopClose = false
      this._stopTimer = null
    }, 500)
  }

  _resetFormatter(locales) {
    this.formatter = new Intl.DateTimeFormat(locales, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        ...(this._unitNumber <= unitNumber('hour') ? { hour: '2-digit' } : {}),
        ...(this._unitNumber <= unitNumber('minute') ? { minute: '2-digit' } : {}),
        ...(this._unitNumber <= unitNumber('second') ? { second: '2-digit' } : {}),
        weekday: 'short',
      })
    this._dispatch()
  }

  _getFormattedValue(formatText) {
    if (this.value) {
      return formatText ? format(this.value, formatText) : this._format(this.value)
    } else {
      return ''
    }
  }

  _getTargets(selectors) {
    let root = this.getRootNode()
    if (root) {
      let targets = []
      selectors
        .filter(selector => !isDate(new Date(selector)))
        .forEach(selector => {
          root.querySelectorAll(selector).forEach(target => {
            let cls = globalThis.customElements.get(target.tagName.toLowerCase())
            if ((cls === InputDt || InputDt.isPrototypeOf(cls)) && target !== this) {
              targets.push(target)
            }
        })
      })
      return targets
    } else {
      return []
    }
  }
  _minRefresh() {
    let dates = this._mins.map(f => f()).filter(d => isDate(d))
    this.min =  dates.length ? new Date(Math.max(...dates)) : null
  }
  _maxRefresh() {
    let dates = this._maxs.map(f => f()).filter(d => isDate(d))
    this.max =  dates.length ? new Date(Math.min(...dates)) : null
  }
  _disableRefresh() {
    this.disable = this._disables.map(f => f()).filter(d => isDate(d))
  }

  _active(name) {
    addClass(find(this, name), 'active')
  }

  _inactive(name) {
    let el = find(this, name)
    if (el) {
      el.classList.remove(prefix + 'active')
    }
  }

  _blur() {
    this.querySelectorAll('input[input-dt]').forEach(el => el.blur())
  }

  _dispatch() {
    this.dispatchEvent(new Event('input'))
    ;['input-dt', 'input-dt-value'].forEach(attr => {
      this.querySelectorAll(`[${attr}]`).forEach(el => {
        let formatText = el.getAttribute(attr)
        switch (el.type) {
          case 'text':
            el.value = this._getFormattedValue(formatText)
            break
          case 'datetime-local':
            el.value = this._getFormattedValue(formatText) || null
            break
        }
        el.dispatchEvent(new InputEvent('input'))
      })
    })
    this.querySelectorAll('[input-dt-display]').forEach(el => {
      replaceChildren(el, [t(this._getFormattedValue(el.getAttribute('input-dt-display')))])
    })
  }

  _attach() {
    this.querySelectorAll('input[input-dt]:not([readonly])').forEach(el => {
      el.addEventListener('focus', this.open)
    })
    this.querySelectorAll('[input-dt-open]').forEach(el => {
      el.addEventListener('click', this.open)
    })
    this.querySelectorAll('[input-dt-clear]').forEach(el => {
      el.addEventListener('click', this.clear)
    })
  }
  _detach() {
    this.querySelectorAll('[input-dt]').forEach(el => {
      el.removeEventListener('focus', this.open)
    })
    this.querySelectorAll('[input-dt-open]').forEach(el => {
      el.removeEventListener('click', this.open)
    })
    this.querySelectorAll('[input-dt-clear]').forEach(el => {
      el.removeEventListener('click', this.clear)
    })
  }
}

globalThis.customElements.define('input-dt', InputDt)