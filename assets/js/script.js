// ==================================================
// Project Name  :  Quizo
// File          :  JS Base
// Version       :  1.0.0
// Author        :  jthemes (https://themeforest.net/user/jthemes)
// ==================================================
$(function(){
  "use strict";
  // ========== Form-select-option ========== //
  $(".step_1").on('click', function(){
    $(".step_1").removeClass("active");
    $(this).addClass("active");
  });
  $(".step_2").on('click', function(){
    $(".step_2").removeClass("active");
    $(this).addClass("active");
  });
  $(".step_3").on('click', function(){
    $(".step_3").removeClass("active");
    $(this).addClass("active");
  });
  $(".step_4").on('click', function(){
    $(".step_4").removeClass("active");
    $(this).addClass("active");
  });
  $(".step_5").on('click', function(){
    $(".step_5").removeClass("active");
    $(this).addClass("active");
  });
  $(".step_6").on('click', function(){
    $(".step_6").removeClass("active");
    $(this).addClass("active");
  });

  // ================== CountDown function ================
  $('.countdown_timer').each(function(){
    $('[data-countdown]').each(function() {
      var $this = $(this), finalDate = $(this).data('countdown');
      $this.countdown(finalDate, function(event) {
        var $this = $(this).html(event.strftime(''
        + '<div class="count_hours"><h3>%H</h3><span class="text-uppercase">hrs</span></div>'
        + '<div class="count_min"><h3>%M</h3><span class="text-uppercase">min</span></div>'
        + '<div class="count_sec"><h3>%S</h3><span class="text-uppercase">sec</span></div>'));
      });
    });
  });

});

var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(n) {
  // This function will display the specified tab of the form ...
  var x = document.getElementsByClassName("multisteps_form_panel");
  x[n].style.display = "block";
  // ... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == (x.length - 1)) {
    document.getElementById("nextBtn").innerHTML = "Submit";
  } else {
    document.getElementById("nextBtn").innerHTML = "Next Question" + ' <span><i class="fas fa-arrow-right"></i></span>';
  }
  // ... and run a function that displays the correct step indicator:
  fixStepIndicator(n)
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("multisteps_form_panel");
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form... :
  if (currentTab >= x.length) {
    //...the form gets submitted:
    //document.getElementById("wizard").submit();
    console.log("submit")
    //form = document.getElementById('wizard');
    size = document.querySelectorAll('input[name="filter.p.m.custom.including_ranges"]:checked');
    power = document.querySelectorAll('input[name="filter.p.m.custom.oven_power"]:checked');
    hood = document.querySelectorAll('input[name="filter.p.m.custom.hood_height"]:checked');
    dispenser = document.querySelectorAll('input[name="filter.p.m.custom.water_dispenser"]:checked');
    microwave = document.querySelectorAll('input[name="filter.p.m.custom.including_microwave"]:checked');
    dishwasher = document.querySelectorAll('input[name="filter.p.m.custom.including_dishwasher"]:checked');
    url = "https://www.smartkitchenlab.net/collections/packages?"
    if (size.length > 0) {
        url = url + "filter.p.m.custom.including_ranges=" + size[0].value + "&";
    }
    if (power.length > 0) {
        url = url + "filter.p.m.custom.oven_power=" + power[0].value + "&";
    }
    if (hood.length > 0) {
        url = url + "filter.p.m.custom.hood_height=" + hood[0].value + "&";
    }
    if (dispenser.length > 0) {
        url = url + "filter.p.m.custom.water_dispenser=" + dispenser[0].value + "&";
    }
    if (microwave.length > 0) {
        url = url + "filter.p.m.custom.including_microwave=" + microwave[0].value + "&";
    }
    if (dishwasher.length > 0) {
        url = url + "filter.p.m.custom.including_dishwasher=" + dishwasher[0].value + "&";
    }
    if (url[url.length - 1] == "&") {
      url = url.slice(0, -1)
    }
    window.open(url);  

    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

/*
function logSubmit(event) {
  console.log("Form Submitted!");
  value = document.getElementById("opt_6").value;
  console.log("The value in the text box is ="+ value);
  const checked = document.querySelectorAll('input[name="filter.p.m.custom.oven_power"]:checked');
  console.log([...checked].map(c => c.value))
  console.log("###################!");
  event.preventDefault();
}
*/

function validateForm() {
  // This function deals with validation of the form fields
  var x, y, i, valid = true;
  x = document.getElementsByClassName("multisteps_form_panel");
  y = x[currentTab].getElementsByTagName("input");
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == "") {
      // add an "invalid" class to the field:
      y[i].className += " invalid";
      // and set the current valid status to false:
      valid = false;
    }
  }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid; // return the valid status
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class to the current step:
  x[n].className += " active";
}