(function ($, Drupal, drupalSettings) {

  $(document).ready(function () {
    window.addEventListener("scroll", resizeFooter);
    window.addEventListener("resize", resizeFooter);
 
    function resizeFooter() {
      //console.log(document.documentElement.scrollTop);
      var tmpWidth = window.innerWidth;

      if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        if(tmpWidth >= 756) {
          d3.selectAll(".footerImg").style("height", "25px");
          d3.select("#footerDiv").style("max-height", "100%");
        }
        else {
          d3.selectAll(".footerImg").style("height", "0px");
          d3.select("#footerDiv").style("max-height", "1px");
        }
      }
      else {
        if(tmpWidth >= 756) {
          d3.selectAll(".footerImg").style("height", "50px");
          d3.select("#footerDiv").style("max-height", "100%");
        }
        else {
          d3.selectAll(".footerImg").style("height", "25px");
          d3.select("#footerDiv").style("max-height", "100px");
        }
      }      
    }

    resizeFooter();

  });
})(jQuery, Drupal, drupalSettings);
