# input-dt

input-dt is a library for datetime input. You can use it without JavaScript. Easy to use with PHP.

- A custom element
- **Framework independent**
- **Automatically localized**
- Dark mode support
- Date periods support
- Customizable

<img width="230" alt="スクリーンショット 2024-04-07 205616" src="https://github.com/itte1/input-dt/assets/57395168/c2c0f5e0-2e56-4ee5-af73-886cfb5b6769">
<img width="230" alt="スクリーンショット 2024-04-07 2056582" src="https://github.com/itte1/input-dt/assets/57395168/4fbb6995-0dad-4345-b759-f32d6d0f1ef4">

# Basic usage

Import js and css files beforehand. This is an example of importing from a CDN.

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/input-dt@0.1.2/input-dt-min.css">
<script type="module" src="https://cdn.jsdelivr.net/npm/input-dt@0.1.2/input-dt-min.js"></script>
```

To start, write an `input[type="text"]` tag and enclose it in an `input-dt` tag.  You can optionally add attributes to the `input-dt` tag.

Next, add the `input-dt` attribute to the `input[type="text"]`.

The picker is added as the last element of the `input-dt`.

```html
<label for="calender">Datetime:</label>
<input-dt
  value="2024-03-10"
  min="2024-01-01"
  max="2026-12-31"
  disable="2024-08-31,2024-12-31"
  hours="0,3,6,9,12,15,18,21"
  minutes="0,10,20,30,40,50"
  seconds="0,10,20,30,40,50"
  unit="seconds"
  locales="ja"
  first-day="0"
  background="true"
  auto-close="true"
>
  <input type="text" name="calender" input-dt>
</input-dt>
```

## More examples

See [the examples directory](https://github.com/itte1/input-dt/tree/main/examples) for examples in HTML only, Bootstrap, Vue.js, React, Jito, and PHP.

## Import for Node.js

```bash
npm i input-dt
```

Import js and css at entry point.

```js
import 'input-dt'
import 'input-dt/input-dt.css'
```

## Attributes for child elements

| Attribute | Description |
| --- | --- |
| `input-dt` | This attribute can be attached to `input[type="text"]` or `input[type="datetime-local"]`, which opens the picker when the focus is set. It will also fire an input event whenever any datetime is selected. Optionally supports formatting. The supported formats are described below. |
| `input-dt-open` | If this attribute is specified, the picker will be opened when the element is clicked. |
| `input-dt-clear` | If this attribute is specified, clicking on the element will clear the date/time value. |
| `input-dt-display` | If this attribute is specified, each time a datetime is selected, the element's children are overwritten with text nodes representing the datetime. Optionally supports formatting. The supported formats are described below. |
| `input-dt-value` | When associated with an element, it updates the value of the element when a date/time is selected. Optionally supports formatting. The supported formats are described below. |

## Attributes for the `input-dt` element

The `input-dt` element provides several attributes. These are default values and also detect dynamic changes.

| Attribute | Description |
| --- | --- |
| `value` | Value selected by input-dt. |
| `min` | Minimum number of selectable dates. By default, New Year's Day 120 years ago.<br>A comma-separated list of dates in the format YYYY-MM-DD and a selector string identifying other `dt-picker` elements. If multiple dates are given, the most recent date is used. |
| `max` | Maximum selectable dates. By default, the last day of the year after 10 years.<br>A comma-separated list of dates in the format YYYY-MM-DD and a selector string identifying other `dt-picker` elements. If multiple dates are given, the earliest date is used. |
| `disable` | List of dates that cannot be selected.<br>A comma-separated list of dates in the format YYYY-MM-DD and a selector string identifying other `dt-picker` elements. |
| `hours` | Options for the hour. |
| `minutes` | Options for the minute. |
| `seconds` | Options for the second. |
| `unit` | Minimum unit of datetime. `day` - date picker only, or `hour`, `minute`, `second`(default). |
| `locales` | A locale identifier used for all parts of the modal. By default, it will be the default locale of the web browser. |
| `first-day` | First day of the week. An integer, between 0 and 6. By default, this is the default locale of the web browser. However, FireFox is not supported, so the value is 0. |
| `background` | Normally, a modal is closed by clicking somewhere other than the modal. This is done by receiving the `click` event of the `document`. Therefore, if there is an element that stops the propagation of events, the modal will not close.<br>If the `background` attribute is set to `true`, a filter that closes the modal on click will cover the entire screen. |
| `autoclose` | If set to true, the modal will only close when a date is selected in the date picker only. |

## All supported formats

input-dt, input-dt-display and input-dt-value support formatting as attribute values. See the following table.
If you do not specify a format, it defaults to the localized format.

| Format | Output | Note |
| --- | --- | --- |
| yy | 26 | The 2-digit year |
| yyyy | 2026 | The 4-digit year |
| YYYY | 2026 | The full year |
| M | 1 to 12 | The numeric month |
| MM | 01 to 12 | The 2-digit month |
| D | 1 to 31 | The numeric day of month |
| DD | 01 to 31 | The 2-digit day of month |
| H | 0 to 23 | The numeric hour |
| HH | 00 to 23 | The 2-digit hour |
| m | 0 to 59 | The numeric minute |
| mm | 00 to 59 | The 2-digit minute |
| s | 0 to 59 | The numeric second |
| ss | 00 to 59 | The 2-digit second |

# Customize Style

You can easily change the style.

## Simple Customize

You can customise colours using CSS custom properties.

```css
.input-dt {
  --input-dt-color: #FFF;
  --input-dt-background: #323232;
  --input-dt-highlight: rgb(136, 214, 83);
  --input-dt-disable: #777;
  --input-dt-outside: #BBB;
  --input-dt-outside-visibility: visible;
  --input-dt-font-family: serif;
}
```

<img width="229" alt="image" src="https://github.com/itte1/input-dt/assets/57395168/7f876b45-6ee7-46a0-90ba-c14c08eadc32">

## CSS overwrite

You can use the developer tool or other tools to find out the used class name and override it.

<img width="230" alt="image" src="https://github.com/itte1/input-dt/assets/57395168/3214472b-ba24-4ac9-ba3c-8b13fc8ecca1">

# Setting Properties

When the input-dt element is accessed via JavaScript, several properties are available.

| Property | Type | Description |
| --- | --- | --- |
| `value` | Date \| null | Value selected by input-dt. |
| `min` | Date \| null | Minimum selectable dates. By default, New Year's Day 120 years ago. If a null value is assigned, it is initialized to the default value. |
| `max` | Date \| null | Maximum selectable dates. By default, the last day of the year after 10 years. If a null value is assigned, it is initialized to the default value. |
| `disable` | Date[] | List of dates that cannot be selected. |
| `hours` | number[] \| null | Options for the hour. |
| `minutes` | number[] \| null | Options for the minute. |
| `seconds` | number[] \| null | Options for the second. |
| `unit` | string | Minimum unit of datetime. `day` - date picker only, or `hour`, `minute`, `second`(default). |
| `locales` | string \| null | A locale identifier used for all parts of the modal. By default, it will be the default locale of the web browser. |
| `firstDay` | number \| null | First day of week. By default, it will be the default locale of the web browser. |
| `background` | boolean | See the `background` attribute. |
| `autoclose` | boolean | See the `autoclose` attribute. |
| `modal` | Element | **Read-only**. A property for direct access to the elements of a modal. |
| `format` | (date: Date) => string | **Write-only**. It is possible to change the display of `input-dt` or `input-dt-display`. If used, the format attribute becomes invalid. |
| `formatYear` | (date: number) => string | **Write-only**. It is possible to change the text portion displaying the year and the year options. |
| `formatMonth` | (date: number) => string | **Write-only**. It is possible to change the text portion displaying the month and the month options. |
| `formatWeek` | (value: number) => string | **Write-only**. The display text of week headings in the calendar can be changed. |
| `formatDay` | (date: Date) => string | **Write-only**. The text of each day of the calendar can be changed. |
| `formatHour` | (value: number) => string | **Write-only**. The text of the hour options can be changed. |
| `formatMinute` | (value: number) => string | **Write-only**. The text of the minute options can be changed. |
| `formatSecond` | (value: number) => string | **Write-only**. The text of the second options can be changed. |
| `renderYear` | (value: number, flags: Flags) => Element | **Write-only**. The entire element of the year option can be replaced. |
| `renderMonth` | (value: number, flags: Flags) => Element | **Write-only**. The entire element of the month option can be replaced. |
| `renderWeek` | (value: number) => Element | **Write-only**. It is possible to change the elements of the calendar week headings in their entirety. |
| `renderDate` | (date: Date, flags: Flags) => Element | **Write-only**. It is possible to change the elements of each day of the calendar in its entirety. |
| `renderHour` | (value: number, flags: Flags) => Element | **Write-only**. The entire element of the hour option can be replaced. |
| `renderMinute` | (value: number, flags: Flags) => Element | **Write-only**. The entire element of the minute option can be replaced. |
| `renderSecond` | (value: number, flags: Flags) => Element | **Write-only**. The entire element of the second option can be replaced. |

The Flags type has the following properties

- `isSelected` - This value is the currently selected.
- `isWeekend` - renderDate only. It is the weekend as determined by the current locale.
- `isInside` - renderDate only. This date is inside the currently selected years and months.
- `isOutside` - renderDate only. This date is outside the currently selected years and months.
- `isDisabled` - renderDate only. This date has been disabled.


These properties can be used to create a new custom element as follows.

```js
import { InputDt } from 'input-dt'

export class InputDtJa extends InputDt {
  constructor() {
    super()
    this.locales = 'ja'
  }
}

window.customElements.define('input-dt-ja', InputDtJa)
```

# Events

The `input-dt` element receives an `input` event each time a date/time is selected.

At the same time, input-dt also sends an `input` event to input elements with `input-dt`.
