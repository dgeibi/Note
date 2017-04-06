---
title: Style Guide
---

[Google HTML/CSS Style Guide](https://google.github.io/styleguide/htmlcssguide.xml)

## Leading 0s

Do not use put 0s in front of values or lengths between -1 and 1.

```css
font-size: .8em;
```

## CSS Quotation Marks

Use single quotation marks for attribute selectors and property values.

Use single (`''`) rather than double (`""`) quotation marks for attribute selectors or property values. Do not use quotation marks in URI values (url()).

Exception: If you do need to use the @charset rule, use double quotation marks—single quotation marks are not permitted.

```css
/* Not recommended */
@import url("//www.google.com/css/maia.css");

html {
  font-family: "open sans", arial, sans-serif;
}
/* Recommended */
@import url(//www.google.com/css/maia.css);

html {
  font-family: 'open sans', arial, sans-serif;
}
```

## type Attributes

Omit type attributes for style sheets and scripts.
Do not use type attributes for style sheets (unless not using CSS) and scripts (unless not using JavaScript).

Specifying type attributes in these contexts is not necessary as HTML5 implies text/css and text/javascript as defaults. This can be safely done even for older browsers.

```html
<!-- Not recommended -->
<link rel="stylesheet" href="//www.google.com/css/maia.css"
  type="text/css">
<!-- Recommended -->
<link rel="stylesheet" href="//www.google.com/css/maia.css">
<!-- Not recommended -->
<script src="//www.google.com/js/gweb/analytics/autotrack.js"
  type="text/javascript"></script>
<!-- Recommended -->
<script src="//www.google.com/js/gweb/analytics/autotrack.js"></script>
```
