"use strict";

$(document).ready(function () {
  var wWidth = $('body').innerWidth(); //HEADER

  $('.header__burger').click(function (event) {
    $('.header__burger').toggleClass('active');
    $('.header__menu').toggleClass('active');
    $('body').toggleClass('lock');
  }); // END HEADER
  // active page link

  var pgurl = window.location.href.substr(window.location.href.lastIndexOf("/") + 1);
  $(".header__item > a").each(function () {
    if ($(this).attr("href") == pgurl || $(this).attr("href") == '') $(this).addClass("active");
  }); // before-after slider

  $(".ba-slider").twentytwenty(); // $(".twentytwenty-container").twentytwenty({
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
      var hburger = $('.header__burger');
      var hmenu = $('.header__menu');
      hburger.removeClass('active');
      hmenu.removeClass('active');
    }

    ;
  });
}); // Location

var mapMarker = "./img/icons/map-marker.png";

function initMap() {
  // The location of Uluru
  var uluru = {
    lat: 46.965175,
    lng: 31.983762
  }; // { lat: 46.965175, lng: 31.983762 };
  // The map, centered at Uluru

  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: {
      lat: 46.964930,
      lng: 31.967415
    },
    disableDefaultUI: true
  }); // The marker, positioned at Uluru

  var marker = new google.maps.Marker({
    position: uluru,
    map: map,
    icon: mapMarker
  });
}

window.initMap = initMap;