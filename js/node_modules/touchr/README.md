Touchr
=======

The core idea of Touchr is that many mobile web sites are prepared for touchable devices but are incompatible with new
Internet Explorer 10 and newer. This package automatically mimics touch and gesture events in these browsers.
Intro page is available on http://aichi.github.com/Touchr.

Usage:

Load the Touchr before all other scripts are loaded and executed:

`<script type="text/javascript" src="js/touchr.js"></script>`

You can sniff IE and load this script for IE 10+ only if necessary.

Interaction:

Use touch handler as you are used to:

`element.addEventListener("touchstart", function(e){console.log(e)});`

Licence:

Touchr is distributed under terms of MIT licence.
