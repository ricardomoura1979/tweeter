$(document).ready(function () { // DOM is loaded using this sentence
  // --- our code goes here ---
  $('#tweet-text').on('input', function (event) {
    let text = $(this).val();
    let remainingCharacters = 140 - text.length;
    
    //console.log(remainingCharacters);

    $(".counter").text(remainingCharacters);
   
    if (remainingCharacters < 0) {
      $(".counter").css("color", "red");
    } else {
      $(".counter").css("color", "black");
    }

  });

});



















