$(document).ready(function () {
   var wWidth = $('body').innerWidth();
   //HEADER
   $('.header__burger').click(function (event) {
      $('.header__burger').toggleClass('active');
      $('.header__menu').toggleClass('active');
      $('body').toggleClass('lock');
   });
   // END HEADER

   // active page link
   var pgurl = window.location.href.substr(window.location.href.lastIndexOf("/") + 1);
   $(".header__item > a").each(function () {
      if ($(this).attr("href") == pgurl || $(this).attr("href") == '')
         $(this).addClass("active");
   })

   // before-after slider


   $(".ba-slider").twentytwenty();
   // $(".twentytwenty-container").twentytwenty({
   //    default_offset_pct: 0.5, // How much of the before image is visible when the page loads
   //    before_label: 'January 2017', // Set a custom before label
   //    after_label: 'March 2017', // Set a custom after label
   //    handle_style: 'arrow', // Set style of handle
   //    no_overlay: false, //Do not show the overlay with before and after
   //    move_slider_on_hover: false, // Move slider on mouse hover?
   //    move_with_handle_only: true, // Allow a user to swipe anywhere on the image to control slider movement. 
   //    click_to_move: false // Allow a user to click (or tap) anywhere on the image to move the slider to that location.
   //  });


   $(window).resize(function () {
      var wWidth = $('body').innerWidth();
      if (wWidth >= 768) {
         let hburger = $('.header__burger');
         let hmenu = $('.header__menu');
         hburger.removeClass('active');
         hmenu.removeClass('active');
      };



   });
});