# JqueryScrollSelector
Scroll through a pick list

This is a jquery plugin that allows creating a scrolling selector
  1) In your html, put a "`<div id='somescrollername' data-scroll-callbackname='somemethodname' />`"
  2) Include a function named "somemethodname" that takes a string. This is called when a value becomes visible.
  3) Set the values of the scroller with:
      $("#somescrollername").scrollSelector(["string", values", "for", "selection"])

Requires JQuery, Tether and Bootstrap V4. 
Make sure each scroller (or your body tag) uses position: relative

See [this fiddle](https://jsfiddle.net/toddrun/ppsyt928/) for a demo and more detailed usage
