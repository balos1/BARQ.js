BARQ.js
=====

Creates random serial numbers and associates them with generated QR codes and/or bar codes. 

## Getting Started

1. clone the repo
2. `npm install`
3. Create a template HTML file (using underscore syntax) and save it in the templates directory. This template will be used for formatting the generated items. See `templates/sheet.html` for an example.
4. Run BARQ CLI. Ex: `node barq.js base=http://functioncreate.com amount=100 length=25 template=sheet.html`

## CLI Options
| Option | Details |
|--------|---------|
| -b, base= | sets the base path for the qr and bar code link |
| -a, amount= | sets the amount of items to create |
| -l, length= | the length of the serial number |
| -c, chars= | the characters to use in the serial number |
| -g, gen= | sets what to generate |
| template= | the template to use for shaping output | 

*chars options built in are `a` for lowercase letters, `A` for uppercase letters, `#` for numbers 0-9, and `!` for special characters. These can be grouped together. For example `aA#` would allow for lower or uppercase letters and numbers. Alternatively you can pass all character you wish to be possibly used like so `abdi333871` *
