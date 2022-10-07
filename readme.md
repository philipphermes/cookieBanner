## Usage

### Html
Setting lang in html to de will load german text setting en will load english text

```html
<html lang="de"></html>
<html lang="en"></html>
```

### Html Head:

```html
<link rel="stylesheet" href="cookieBanner.css">
```

### Html Body:

```html
<div id="cookieBanner"></div>
<script src="cookieBanner.js"></script>
```

### Block Elements:

```html
<div class="performance">Your Content</div>
<div class="functional">Your Content</div>
<div class="marketing">Your Content</div>
```

### Change Link and Cookie Life Time
You can change them in th cookieBanner.js file
```js
const link = '#cookiesInfo';
const cookieBannerLifeTime = 365;
```

### Change cookie Options
Add this button
```html
<button onclick="generateBanner()">Change Cookie Settings</button>
```

### CookieBanner Cookie
* name: cookieBanner
* value: {"performance":"show","functional":"show","marketing":"show"}

## [Preview](https://htmlpreview.github.io/?https://github.com/philipphermes/cookieBanner/blob/main/index.html)

## Notes:

* The index.html is a small demo, you can delete it!

## Todos:

* make css pretty