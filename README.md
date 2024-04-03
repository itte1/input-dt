# dt-picker

dt-picker is a JavaScript library for entering datetime.

- A custom element
- Automatically localized
- Customizable

# Basic usage

To begin, write an `input[type="text"]` tag and enclose it in a `dt-picker` tag.  You can optionally add attributes to the `dt-picker` tag.

Next, add the `dt-picker-input` attribute to the `input[type="text"]`.

The picker is added as the last element of the `dt-picker`.

```html
<dt-picker
  value="2024-03-10"
  min="2024-01-01"
  max="2026-12-31"
  disable="2024-08-31,2024-12-31"
  hours="0,3,6,9,12,15,18,21"
  minutes="0,10,20,30,40,50"
  seconds="0,10,20,30,40,50"
  format="YYYY-MM-DD"
  unit="seconds"
  locales="hi"
>
  <input type="text" name="datetime" dt-picker-input>
</dt-picker>
```

## Attributes for child elements

| Attribute | Description |
| --- | --- |
| `dt-picker-input` | This attribute can be attached to `input[type="text"]` or `input[type="datetime-local"]`, which opens the picker when the focus is given. It also dispatches an input event each time any datetime is selected. |
| `dt-picker-open` | If this attribute is given, it opens the picker when the element is clicked. |
| `dt-picker-display` | If this attribute is given, each time a datetime is selected, the element's children are overwritten with text nodes representing the datetime. |

## Attributes for the `dt-picker` element

The `dt-picker` element provides several attributes. These are default values and also detect dynamic changes.

| Attribute | Description |
| --- | --- |
| `value` | Value selected by dt-picker. |
| `min` | Minimum selectable dates. By default, New Year's Day 120 years ago. |
| `max` | Maximum selectable dates. By default, the last day of the year after 10 years. |
| `disable` | List of dates that cannot be selected. |
| `hours` | Options for the hour. |
| `minutes` | Options for the minute. |
| `seconds` | Options for the second. |
| `format` | It is possible to change the display of `dt-picker-input` or `dt-picker-display`. Supported formats are in the following table. By default, it is assumed to be formatted for the locale of the web browser. |
| `unit` | Minimum unit of datetime. `day` - date picker only, or `hour`, `minute`, `second`(default). |
| `locales` | A locale identifier used for all parts of the modal. By default, it will be the default locale of the web browser. |

## All supported formats

| Format | Output | Note |
| --- | --- | --- |
| `yy` | 26 | The 2-digit year |
| `yyyy` | 2026 | The 4-digit year |
| `YYYY` | 2026 | The full year |
| `M` | 1 to 12 | The numeric month |
| `MM` | 01 to 12 | The 2-digit month |
| `D` | 1 to 31 | The numeric day of month |
| `DD` | 01 to 31 | The 2-digit day of month |
| `H` | 0 to 23 | The numeric hour |
| `HH` | 00 to 23 | The 2-digit hour |
| `m` | 0 to 59 | The numeric minute |
| `mm` | 00 to 59 | The 2-digit minute |
| `s` | 0 to 59 | The numeric second |
| `ss` | 00 to 59 | The 2-digit second |

# Events

The `dt-picker` element receives an `input` event each time a date/time is selected.

At the same time, dt-picker also dispatches an `input` event to input elements with `dt-picker-input`.

# Customize Style

You can change the style easily.

## Simple Customize

You can customize colors with CSS custom properties.

```css
.dt-picker {
  --dt-picker-color: #FFF;
  --dt-picker-background: #323232;
  --dt-picker-highlight: rgb(136, 214, 83);
  --dt-picker-disable: #777;
  --dt-picker-outside: #BBB;
  --dt-picker-outside-visibility: visible;
}
```

## CSS overwrite

You can use the developer tool or other tools to find out the used class name and override it.

# Setting Properties

When the dt-picker element is accessed via JavaScript, several properties are available.

| Property | Type | Description |
| --- | --- | --- |
| value | Date \| null | Value selected by dt-picker. |
| min | Date \| null | Minimum selectable dates. By default, New Year's Day 120 years ago. If a null value is assigned, it is initialized to the default value. |
| max | Date \| null | Maximum selectable dates. By default, the last day of the year after 10 years. If a null value is assigned, it is initialized to the default value. |
| disable | Date[] | List of dates that cannot be selected. |
| hours | number[] \| null | Options for the hour. |
| minutes | number[] \| null | Options for the minute. |
| seconds | number[] \| null | Options for the second. |
| unit | string | Minimum unit of datetime. `day` - date picker only, or `hour`, `minute`, `second`(default). |
| locales | string \| null | A locale identifier used for all parts of the modal. By default, it will be the default locale of the web browser. |
| modal | Element | **Read-only**. A property for direct access to the elements of a modal. |
| format | (date: Date) => string | **Write-only**. It is possible to change the display of `dt-picker-input` or `dt-picker-display`. If used, the format attribute becomes invalid. |
| formatYear | (date: number) => string | **Write-only**. It is possible to change the text portion displaying the year and the year options. |
| formatMonth | (date: number) => string | **Write-only**. It is possible to change the text portion displaying the month and the month options. |
| formatWeek | (value: number) => string | **Write-only**. The display text of week headings in the calendar can be changed. |
| formatDay | (date: Date) => string | **Write-only**. The text of each day of the calendar can be changed. |
| formatHour | (value: number) => string | **Write-only**. The text of the hour options can be changed. |
| formatMinute | (value: number) => string | **Write-only**. The text of the minute options can be changed. |
| formatSecond | (value: number) => string | **Write-only**. The text of the second options can be changed. |
| renderYear | (value: number, flags: Flags) => Element | **Write-only**. The entire element of the year option can be replaced. |
| renderMonth | (value: number, flags: Flags) => Element | **Write-only**. The entire element of the month option can be replaced. |
| renderWeek | (value: number) => Element | **Write-only**. It is possible to change the elements of the calendar week headings in their entirety. |
| renderDate | (date: Date, flags: Flags) => Element | **Write-only**. It is possible to change the elements of each day of the calendar in its entirety. |
| renderHour | (value: number, flags: Flags) => Element | **Write-only**. The entire element of the hour option can be replaced. |
| renderMinute | (value: number, flags: Flags) => Element | **Write-only**. The entire element of the minute option can be replaced. |
| renderSecond | (value: number, flags: Flags) => Element | **Write-only**. The entire element of the second option can be replaced. |

The Flags type has the following properties

- `isSelected` - This value is the currently selected.
- `isInside` - `renderDate` only. This date is inside the currently selected years and months.
- `isOutside` - `renderDate` only. This date is outside the currently selected years and months.
- `isDisabled` - `renderDate` only. This date has been disabled.


These properties can be used to create new custom element as follows.

```js
import { DtPicker } from './dt-picker.js'

export class DtPickerJa extends DtPicker {
  constructor() {
    super()
    this.locales = 'ja'
  }
}

window.customElements.define('dt-picker-ja', DtPickerJa)
```
