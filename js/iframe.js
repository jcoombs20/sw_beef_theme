(function ($, Drupal, drupalSettings) {

  $(document).ready(function () {
    window.addEventListener("resize", resizeIframe);
 
    function resizeIframe() {
      if($(".iframeDiv").length > 0) {
        if($('#jer_menu_div').length > 0 && $('#footerBrandDiv').length > 0) {
          var tmpHeight = (window.innerHeight - document.getElementById("jer_menu_div").getBoundingClientRect().height - document.getElementById("footerBrandDiv").getBoundingClientRect().height - 1) + "px";
        }
        else if($('#jer_menu_div').length > 0) {
          var tmpHeight = (window.innerHeight - document.getElementById("jer_menu_div").getBoundingClientRect().height - 1) + "px";
        }
        else if($('#footerBrandDiv').length > 0) {
          var tmpHeight = (window.innerHeight - document.getElementById("footerBrandDiv").getBoundingClientRect().height - 1) + "px";
        }
        else {
          var tmpHeight = (window.innerHeight) + "px";
        }
      
        d3.select(".iframeDiv").style("height", tmpHeight);
        d3.select(".fullPageIframe").style("height", tmpHeight);
      }
    }

    setTimeout(function() {
      resizeIframe();
    }, 500);

  });
})(jQuery, Drupal, drupalSettings);
