/* eslint-disable func-style */
/* eslint-disable no-undef */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// A $( document ).ready() block.
$(document).ready(function () {
  //console.log( "ready!................" );

  const tweetData = {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac"
    },
    content: {
      text: " One simple message for testing!!!!"
    },
    created_at: 1461116232227
  };



  //function to load tweets

  function loadTweets() {
    $.ajax('/tweets', { method: 'GET' })
      .then((data) => {
        console.log(data);
        renderTweets(data);
      });

  }

  loadTweets();

  // function that takes in a tweet object and is responsible for returning a tweet
  function createTweetElement(tweet) {

    const $tweet = $(`<article class="articleTweets">
  <header class="headerArticleTweets">
    <div class="avatarIcon">
    <img src="${tweet.user.avatars}" alt="${tweet.user.name}">
    <span>${tweet.user.name}</span>
    </div>
    <span>${tweet.user.handle}</span>
  </header>
  <section class="sectionTweets">
    ${escape(tweet.content.text)}

  </section>
  <footer class="footerArticleTweets">
  
    <span>${timeago.format(tweet.created_at)}</span>
    
    <div class="hoverIcons">
      <i class="fa-solid fa-flag"></i>
      <i class="fa-solid fa-retweet"></i>
     <i class="fa-solid fa-heart"></i>
    </div>
  
  </footer>
</article>`);
    return $tweet;
  }
//adde when the form is over 140 characters. Added a class called warning140 to css style
  function createElement() {
  if ($('.warning140').length > 0) {
    return $("");

  } else {
    const $error = $(
    `<div class = "warning140"> 
      <p class = "textExcessOfCharacters"> <i class="fa-solid fa-triangle-exclamation"> </i> Excess of Characters (Max. 140)</p>
    </div>`)
    return $error;
   }
  }
  //added when the form is empty. Added a class called warning140 to css style. Adde text class called textMiddle
  function createElementEmpty() {
    if ($('.warningEmpty').length > 0) {
      return $("");

    } else {
    const $error = $(
      `<div class = "warningEmpty"> 
      
        <p class = "textEmpty"> <i class="fa-solid fa-triangle-exclamation"> </i> Your message cannot be empty</p>
      </div>`)
      return $error;
    }
  }
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };


  const renderTweets = function(tweets) {
    for (const tweetObj of tweets) {
      console.log("iterator........", tweetObj);
      const $tweet = createTweetElement(tweetObj);
      $('#tweets-container').prepend($tweet);
    }
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
  };
  // submitted data to ajax to return as asynchronous activity.
  $('form').submit(function(event) {
    event.preventDefault();
    const $errorElement = createElement();
    const $errorElementEmpty = createElementEmpty();
    const text = $("#tweet-text").val()
    if (text == "") {
      $('#error').append($errorElementEmpty);
      return;
    }
    if (text.length > 140) {
      $('#error').append($errorElement);
      return;
    }



    const data = $(this).serialize();


    $.ajax('/tweets', { method: 'POST', data })
      .then(() => {
        $("#tweet-text").val("");
        //we need to refetch tweets on Success
        $('#tweets-container').empty();
        loadTweets();
      });

  })

});

