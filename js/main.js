(function ($, Drupal, drupalSettings) {

  $(document).ready(function () {
    console.log("Working!");
    window.addEventListener('resize', adjustCarousel);

    function adjustCarousel() {
      if(document.getElementById("carouselLanding")) {
        if(window.innerWidth >= 756) {
          d3.select("#carouselLanding").select(".carousel-item.active").select("video")._groups[0][0].play();
        }
      }
    }

    //******Advance to next video
    d3.selectAll(".videoCaro")._groups[0].forEach(function(vid,i) {
      vid.onended = function() {
        this.currentTime = 0;
        $("#carouselLanding").carousel("next");
      };
    });

    //******Play video once slide is advanced to
    $("#carouselLanding").on("slid.bs.carousel", function() {
      var vid = d3.select("#carouselLanding").select(".carousel-item.active").select("video")._groups[0][0];
      vid.play();
    });

    adjustCarousel();
  });

})(jQuery, Drupal, drupalSettings);
