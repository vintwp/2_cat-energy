(function ($) {
  $.fn.twentytwenty = function (options) {
    var options = $.extend({
      default_offset_pct: 0.5,
      orientation: 'horizontal',
      handle_style: 'dot',
      //arrows - Circle with arrows in central of slider
      //dot - Dot with inner circle, under container, and in line 
      before_label: 'Before',
      after_label: 'After',
      no_overlay: false,
      move_slider_on_hover: false,
      move_with_handle_only: true,
      click_to_move: false
    }, options);

    return this.each(function () {

      var sliderPct = options.default_offset_pct;
      var container = $(this);
      var sliderOrientation = options.orientation;
      var beforeDirection = (sliderOrientation === 'vertical') ? 'down' : 'left';
      var afterDirection = (sliderOrientation === 'vertical') ? 'up' : 'right';
      var handleStyle = options.handle_style; //for Horizontal orientaton only vitaliy.pa


      container.wrap("<div class='twentytwenty-wrapper twentytwenty-" + sliderOrientation + "'></div>");
      if (!options.no_overlay) {
        container.append("<div class='twentytwenty-overlay'></div>");
        var overlay = container.find(".twentytwenty-overlay");
        overlay.append("<div class='twentytwenty-before-label' data-content='" + options.before_label + "'></div>");
        overlay.append("<div class='twentytwenty-after-label' data-content='" + options.after_label + "'></div>");
      }
      var beforeImg = container.find("img:first");
      var afterImg = container.find("img:last");
      // container.append("<div class='twentytwenty-handle'></div>");
      // var slider = container.find(".twentytwenty-handle");

      // container.append("<div class='twentytwenty-handle'></div>");
      // var slider = container.find(".twentytwenty-handle");
      // slider.append("<span class='twentytwenty-" + beforeDirection + "-arrow'></span>");
      // slider.append("<span class='twentytwenty-" + afterDirection + "-arrow'></span>");


      /*Select style of handle. Added by vitaliy.pa  */
      if (handleStyle === 'arrow') {
        container.append("<div class='twentytwenty-handle'></div>");
        var slider = container.find(".twentytwenty-handle");
        slider.append("<span class='twentytwenty-" + beforeDirection + "-arrow'></span>");
        slider.append("<span class='twentytwenty-" + afterDirection + "-arrow'></span>");
      } else if (handleStyle === 'dot') {
        container.append("<div class='twentytwenty-handle-line'><div class='twentytwenty-handle-line-inner'></div>");
        var sliderLine = container.find(".twentytwenty-handle-line");
        var sliderLineWidth = container.find(".twentytwenty-handle-line");
        var slw = sliderLineWidth.width();
        sliderLine.append("<div class='twentytwenty-handle'></div>");
        var slider = container.find(".twentytwenty-handle");
        slider.append("<div class='twentytwenty-handle-dot-wrapper'><div class='twentytwenty-handle-dot'></div></div>")
        $('.twentytwenty-right-arrow').remove();
        $('.twentytwenty-left-arrow').remove();
      };

      if ($('body').innerWidth() < 768) {
        $('.twentytwenty-handle-line').before("<span class='twentytwenty-handle-line-m-before' id='button-before'>Было</span>");
        $('.twentytwenty-handle-line').after("<span class='twentytwenty-handle-line-m-after' id='button-after'>Стало</span>");
      };




      container.addClass("twentytwenty-container");
      beforeImg.addClass("twentytwenty-before");
      afterImg.addClass("twentytwenty-after");

      var calcOffset = function (dimensionPct) {
        var w = beforeImg.width();
        var h = beforeImg.height();
        return {
          w: w + "px",
          h: h + "px",
          cw: (w - (dimensionPct * w)) + "px", //CHANGED - SLIDE DOT TO BEFORE SHOW BEFORE IMAGE
          hw: (dimensionPct * (w - (w - slw))) + "px", // ADDED - FOR DOT - MOVE TO CORRECT SIDE
          // cw: (dimensionPct * w) + "px", ORIGINAL
          ch: (dimensionPct * h) + "px",
          px0: 0 + "px"
        };
      };

      var adjustContainer = function (offset) {
        
        if ($('body').innerWidth() < 768) {
          beforeImg.css("clip", "rect(0," + offset.w + "," + offset.h + ",0)");
          afterImg.css("clip", "rect(0," + offset.px0 + "," + offset.h + "," + offset.px0 + ")");
          console.log($('#button-before').length);
          $('#button-after').click(function () {
            beforeImg.css("clip", "rect(0," + offset.px0 + "," + offset.h + "," + offset.px0 + ")");
            afterImg.css("clip", "rect(0," + offset.w + "," + offset.h + ",0)");
            $('.twentytwenty-handle-line-inner').addClass('after');
          });
          $('#button-before').click(function () {
            beforeImg.css("clip", "rect(0," + offset.w + "," + offset.h + ",0)");
            afterImg.css("clip", "rect(0," + offset.px0 + "," + offset.h + "," + offset.px0 + ")");
            $('.twentytwenty-handle-line-inner').removeClass('after');
          });
          
        }
        else {
          if (sliderOrientation === 'vertical') {
            beforeImg.css("clip", "rect(0," + offset.w + "," + offset.ch + ",0)");
            afterImg.css("clip", "rect(" + offset.ch + "," + offset.w + "," + offset.h + ",0)");
          } else {
            beforeImg.css("clip", "rect(0," + offset.cw + "," + offset.h + ",0)");
            afterImg.css("clip", "rect(0," + offset.w + "," + offset.h + "," + offset.cw + ")");
          }
        }
        container.css("height", offset.h);
      };

      /*-----------------MOBILE TOOGLE SLIDER------------- */
      // $(document).ready(function (offset) {
      //   let bButton = $("#button-before");
      //   let aButton = $("#button-after");
      //   bButton.click(function () {
      //       beforeImg.css("clip", "rect(0," + offset.w + "," + offset.h + ",0)");
      //       afterImg.css("clip", "rect(0," + offset.px0 + "," + offset.h + "," + offset.px0 + ")");
      //       bButton.css('background', 'red');
      //   });
      //   aButton.click(function () {
      //     afterImg.css("clip", "rect(0," + offset.w + "," + offset.h + ",0)");
      //     beforeImg.css("clip", "rect(0," + offset.px0 + "," + offset.h + "," + offset.px0 + ")");
      //     aButton.css('background', 'red');
      //   });
      // });

      /*-----------------END MOBILE TOOGLE SLIDER------------- */

      var adjustSlider = function (pct) {
        var offset = calcOffset(pct);
        
        // slider.css((sliderOrientation === "vertical") ? "top" : "left", (sliderOrientation === "vertical") ? offset.ch : offset.cw); // ORIGINAL
        slider.css((sliderOrientation === "vertical") ? "top" : "left", (sliderOrientation === "vertical") ? offset.ch : offset.hw); // CHANGED - FOR DOT - MOVE TO CORRECT SIDE
        adjustContainer(offset);
      };

      // Return the number specified or the min/max number if it outside the range given.
      var minMaxNumber = function (num, min, max) {
        return Math.max(min, Math.min(max, num));
      };

      // Calculate the slider percentage based on the position.
      var getSliderPercentage = function (positionX, positionY) {
        var sliderPercentage = (sliderOrientation === 'vertical') ?
          (positionY - offsetY) / imgHeight :
          (positionX - offsetX) / imgWidth;
        return minMaxNumber(sliderPercentage, 0, 1);
      };


      $(window).on("resize.twentytwenty", function (e) {
        adjustSlider(sliderPct);
        
        //ADD SLIDE LINE UNDER CONTAINER
        
        if ($('body').innerWidth() >= 768) {
          if ($('.twentytwenty-handle-line-m-before').length > 0 &&
            $('.twentytwenty-handle-line-m-after').length > 0) {
            $('.twentytwenty-handle-line-m-before').remove();
            $('.twentytwenty-handle-line-m-after').remove();
          };
        } else {
          if ($('.twentytwenty-handle-line-m-before').length === 0 &&
            $('.twentytwenty-handle-line-m-after').length === 0) {
            $('.twentytwenty-handle-line').before("<span class='twentytwenty-handle-line-m-before' id='button-before'>Было</span>");
            $('.twentytwenty-handle-line').after("<span class='twentytwenty-handle-line-m-after' id='button-after'>Стало</span>");
          };

        }
        //END ADD SLIDE LINE UNDER CONTAINER

      });

      var offsetX = 0;
      var offsetY = 0;
      var imgWidth = 0;
      var imgHeight = 0;
      var onMoveStart = function (e) {
        if (((e.distX > e.distY && e.distX < -e.distY) || (e.distX < e.distY && e.distX > -e.distY)) && sliderOrientation !== 'vertical') {
          e.preventDefault();
        }
        else if (((e.distX < e.distY && e.distX < -e.distY) || (e.distX > e.distY && e.distX > -e.distY)) && sliderOrientation === 'vertical') {
          e.preventDefault();
        }
        container.addClass("active");
        offsetX = container.offset().left;
        offsetY = container.offset().top;
        imgWidth = beforeImg.width();
        imgHeight = beforeImg.height();
      };
      var onMove = function (e) {
        if (container.hasClass("active")) {
          sliderPct = getSliderPercentage(e.pageX, e.pageY);
          adjustSlider(sliderPct);
        }
      };
      var onMoveEnd = function () {
        container.removeClass("active");
      };

      var moveTarget = options.move_with_handle_only ? slider : container;
      moveTarget.on("movestart", onMoveStart);
      moveTarget.on("move", onMove);
      moveTarget.on("moveend", onMoveEnd);



      if (options.move_slider_on_hover) {
        container.on("mouseenter", onMoveStart);
        container.on("mousemove", onMove);
        container.on("mouseleave", onMoveEnd);
      }

      slider.on("touchmove", function (e) {
        e.preventDefault();
      });

      container.find("img").on("mousedown", function (event) {
        event.preventDefault();
      });

      if (options.click_to_move) {
        container.on('click', function (e) {
          offsetX = container.offset().left;
          offsetY = container.offset().top;
          imgWidth = beforeImg.width();
          imgHeight = beforeImg.height();

          sliderPct = getSliderPercentage(e.pageX, e.pageY);
          adjustSlider(sliderPct);
        });
      }
      $(window).trigger("resize.twentytwenty");
    });
  };

})(jQuery);

