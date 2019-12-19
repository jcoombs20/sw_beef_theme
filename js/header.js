(function ($, Drupal, drupalSettings) {

  $(document).ready(function () {
    window.addEventListener("resize", adjustHeader);

    //***Throttle scroll event firing to match transition time
    var scrollTimer;
    var lastScrollFireTime = 0;
    window.addEventListener("scroll", resizeHeader);
 
    function resizeHeader() {
      //console.log(document.documentElement.scrollTop);
      var tmpWidth = window.innerWidth;
      if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        d3.select("header").style("height", "3em")
          .select("img").style("height", "47px");
        d3.selectAll(".primA").style("line-height", function() { if(tmpWidth >= 756) { return "1.85em"; } else { return "1em"; } });
      }
      else {
        d3.select("header").style("height", "6em")
          .select("img").style("height", "94px");
        d3.selectAll(".primA").style("line-height", function() { if(tmpWidth >= 756) { return "3.7em"; } else { return "1em"; } });
      }      
      d3.select("main").style("min-height", window.innerHeight - (getComputedStyle(document.getElementsByTagName("header")[0]).fontSize.slice(0,-2) * d3.select("header").style("height").slice(0,-2)) - d3.select("footer").style("height").slice(0,-2) - d3.select(".brandFont").style("margin-top").slice(0,-2) + "px");
    }

    function adjustHeader() {
      //console.log(window.innerWidth);
      
      if(window.innerWidth < 756) {
        d3.select("nav[id*='swbeef-main']")
          .classed("collapse", true);
      }
      else {
        d3.select("nav[id*='swbeef-main']")
          .classed("collapse", false);
      }

      d3.selectAll("#jer_menu_div ul ul")
        .style("display", "");

      resizeHeader();
    }

    //***Select the main nav's div and name it and add a mobile div
    var tmpID = d3.select("nav[id*='swbeef-main']").attr("id");
    d3.select(d3.select("nav[id*='swbeef-main']")._groups[0][0].parentNode)
      .attr("id", "jer_menu_div")
      .insert("div", ":first-child")
        .attr("id", "mobileMenu")
        .html('<div class="fa fa-bars" data-toggle="collapse" href="#' + tmpID + '"></div>');

    //***Select the JER menu ul and class it as jer_menu and add interactivity
    var tmpUl = d3.select("nav[id*='swbeef-main'] > ul")._groups[0][0];
    d3.select(tmpUl).classed("jer_menu", true);
    d3.select(tmpUl).selectAll("li")
      .on("mouseover", function() { 
        if(d3.select(this).select("div")._groups[0][0] != null && window.innerWidth >= 756) { 
          if(d3.select(this).select("div")._groups[0][0].children.length > 0) { 
            d3.select(this).select("div").style("display", "block");
          } 
        }
        d3.select(this).select(".liParent").style("color", "white");
      })
      .on("mouseout", function() { 
        d3.select(this).select("a").style("color", ""); 
        d3.select(this).select("div").style("display", ""); 
        d3.select(this).select("span").style("color", "");
      });
    
    //***Select top level list elements and class them as level 0 then add a top level div
    var tmpLi = d3.selectAll(tmpUl.childNodes).filter(function() { return this.tagName == "LI"; });
    tmpLi.attr("id", function(d,i) { return "jer_menu_list_0_" + i; })
      .classed("jer_menu_list_0", true);
    d3.select(tmpUl).selectAll("ul").classed("jer_submenu_0", function() { if(this.parentNode.className == "jer_menu_list_0") { return true; } else { return false; } });
    tmpLi.append("div")
      .attr("class", "jer_menu_div_0")
      .attr("id", function(d,i) { return "jer_menu_div_0_" + i; });


    //***Add user interactions do display submenus and move them to the newly created div
    tmpLi.on("mouseenter", function() { 
      if(window.innerWidth >= 756) {
        d3.select(this).select(".jer_submenu_0").style("display", function() { if(window.navigator.userAgent.indexOf("Edge") > -1) { return "block"; } else { return "contents"; } }); //Logic to accomodate Microsoft Edge
      }
    });
    tmpLi.on("mouseleave", function() {
      if(window.innerWidth >= 756) {
        d3.select(this).select(".jer_submenu_0").style("display", "none");
      }
    });
    tmpLi._groups[0].forEach(function(d) {
      $(d3.select(d).select("div")._groups[0]).append( $(d3.select(d).select("ul")._groups[0]) );
    });

    //***Create sub-submenus if any are neeeded
    tmpUl = d3.selectAll(".jer_submenu_0");
    tmpUl.selectAll("li").attr("id", function(d,i) { return "jer_menu_list_1_" + i; })
      .classed("jer_menu_list_1", function() { if(this.parentNode.className == "jer_submenu_0") { return true; } else { return false; } })
      .on("mouseenter", function() {
        if(window.innerWidth >= 756) {
          d3.select(this).select(".jer_submenu_1").style("display", "contents");
          d3.select(this).select(".jer_menu_div_1").style("top", function() { d3.select(this).style("top", ""); return d3.select(this).style("top").slice(0,-2) - this.parentElement.getBoundingClientRect().height + "px"; });
        }  
      })
      .on("mouseleave", function() {
        if(window.innerWidth >= 756) {
          d3.select(this).select(".jer_submenu_1").style("display", "none");
        }
      });

    var tmpLi = d3.selectAll(".jer_menu_list_1")._groups[0];
    tmpLi.forEach(function(d,i) {
      d.childNodes.forEach(function(tmpChild) {
        if(tmpChild.tagName == "UL") {
          d3.select(tmpChild).classed("jer_submenu_1", true);
          var tmpDiv = d3.select(d).append("div");
          tmpDiv.attr("class", "jer_menu_div_1")
            .attr("id", function() { return "jer_menu_div_1_" + i; });
          d3.select(tmpChild).selectAll("li").attr("id", function(d,i) { return "jer_menu_list_2_" + i; })
            .classed("jer_menu_list_2", function() { if(this.parentNode.className == "jer_submenu_1") { return true; } else { return false; } });
          $(tmpDiv._groups[0]).append( $(tmpChild) );
        }
      });

    });


    //***Add chevrons for li with children for narrow header
    d3.select(".jer_menu").selectAll("li")._groups[0].forEach(function(tmpLi) {
      if(d3.select(tmpLi).select("div")._groups[0][0] != null) {
        if(d3.select(tmpLi).select("div")._groups[0][0].children.length > 0) {
          d3.select(tmpLi)
            .attr("data-toggle", "collapse")
            .attr("href", function() { 
              d3.select(this).select("div")
                .classed("collapse", true)
                .attr("data-parent", "#" + d3.select(this).attr("id"));
              return "#" + d3.select(this).select("div").attr("id");
            })
            .attr("data-parent", function() { return "#" + d3.select(this).select("div").attr("id"); })
            .on("click", function() { 
              if(d3.select(this).classed("jer_menu_list_1") == true) { 
                d3.event.stopPropagation(); 
                $(d3.select(this).select("div")._groups[0][0]).collapse("toggle"); 
              } 
              var tmpSpan = d3.select(this).select(".liParent");
              if(tmpSpan.classed("fa-chevron-down") == true) {
                tmpSpan.classed("fa-chevron-down", false).classed("fa-chevron-up", true).property("title", "Click to collapse menu");
              }
              else {
                tmpSpan.classed("fa-chevron-up", false).classed("fa-chevron-down", true).property("title", "Click to expand menu");
              }
            })
            .insert("span", ":first-child")
            .attr("class", "liParent fa fa-chevron-down")
            .property("title", "Click to expand menu");
        }
      }
    });


    //***Add class to primary header links for transition styling
    d3.select("div[id*='-branding']").select("a").classed("primA", true);
    d3.selectAll(".jer_menu_list_0 > a").classed("primA", true);
    d3.selectAll(".jer_menu_list_0 > span").classed("primA", true);

    adjustHeader();
    resizeHeader();

  });
})(jQuery, Drupal, drupalSettings);
