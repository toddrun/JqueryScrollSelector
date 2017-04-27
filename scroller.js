(function( $ ) {
  $.fn.scrollSelector = function(data) {
    var scrollDiv = $(this);
    var scrollDivId = $(this).attr("id");
    var callbackName = $(this).attr("data-scroll-callbackname");
    var scrollerId = scrollDivId + "_scroller";
    var scroller = $("#" + scrollerId);
    if (scroller.length === 0) {
      if (scrollDiv.length === 0) {
        console.error("You're trying to setup a scrollSelector on an element that does not exist");
      }
      scroller = createScroller(scrollDiv, scrollerId, callbackName);
    }
    if (Array.isArray(data)) {
      var html = buildDataLinks(scrollerId, data);
      scroller.html(html);
    }
    return this;
  }

  function createScroller(div, id, callbackName) {
    var scroller;
    var scrollerId = id;
    var top;
    var html = "<ul id='" + scrollerId + "' data-scroll-callbackname='" + callbackName + "' class='scroller nav'></ul>";
    div.html(html);
    scroller = $("#" + scrollerId);
    top = scroller.position().top;
    scroller.scrollspy({target: "#" + scrollerId, offset: 10});
    scroller.on("activate.bs.scrollspy", function() {
      fireActiveScrollLinkCallback(scrollerId);
    });
    scroller.on("selected", function(event, linkValue) {
      var callbackname = $(this).attr("data-scroll-callbackname");
      window[callbackname](linkValue);
    });
    return scroller;
  }

  function fireActiveScrollLinkCallback(scrollerId) {
    var scrollIdentifier = "#" + scrollerId;
    var linksForThisScroller = scrollIdentifier + " .nav-link";
    $(linksForThisScroller).each(function() {
      if ($(this).hasClass("active")) {
        var linkValue = $(this).text();
        $(scrollIdentifier).trigger("selected", linkValue)
      }
    });
  }

  function buildDataLinks(scrollerId, data) {
    var navLinks = "";
    var listIndex = 1;
    var linkId;
    var dataIndex;
    for ( dataIndex = 0 ; dataIndex < data.length ; dataIndex++ ) {
      linkId = scrollerId + "_" + listIndex;
      navLinks += buildDataLink(linkId, data[dataIndex]);
      listIndex += 1;
    }
    return navLinks;
  }

  function buildDataLink(linkId, linkValue) {
    return "  <li id='" + linkId + "' class='nav-item' >\n" +
           "    <a class='nav-link' href='#" + linkId + "'>" +
                  linkValue +
           "    </a>\n" +
           "  </li>\n";
  }
}( jQuery ));
