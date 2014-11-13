jQuery onRead
=============

This plugin aims to provide an educated guess on whether the user did read a text content from any html element. Currently there are no objective ways to be sure about that.The way I do it is by checking for how long a given element was kept visible in the user viewport.

There is a default value based on the text size for a given element however the user can override this time to better reflect any special case.

## Installation

Include script *after* the jQuery library (unless you are packaging scripts somehow else):

```html
<script src="/path/to/jquery.onread.js"></script>
```

**Do not include the script directly from GitHub (http://raw.github.com/...).** The file is being served as text/plain and as such being blocked
in Internet Explorer on Windows 7 for instance (because of the wrong MIME type)

## Usage

Make the element readable so it triggers the event:

```javascript
$("#element").readable();
```

Create the event listener:

```javascript
$("#element").on('read', function() {
    alert("Hey, you just read this element!");     
});
```
Overriding default amount of time exposed to be considered read:

```javascript
$("#element").readable({timeRequired: 1000});
```

(Time in milliseconds)

## Authors

[Pedro Sena](https://github.com/PedroSena)