const APIKey = "UKm7GCVxXq4Bii/oR0KGmg==voJLJFAVsJHppv8S";
const options = {
  method: "GET",
  headers: {
    "X-Api-Key": APIKey,
  },
};
var joke = [];
var post_title = "";
var past_joke = "";
function react(value) {
  if (joke.length < 1) {
    document.querySelector(".error").innerText = "There is no joke to react";
    document.querySelector(".error").style.display = "block";
    setTimeout(() => {
      document.querySelector(".error").style.display = "none";
    }, 2000);
    return;
  }
  if (past_joke == joke[0].joke) {
    document.querySelector(".error").innerText =
      "you have already reacted to this joke";
    document.querySelector(".error").style.display = "block";
    setTimeout(() => {
      document.querySelector(".error").style.display = "none";
    }, 2000);
    return;
  }
  past_joke = joke[0].joke;
  document.getElementById(value).classList.remove(value + "_anime");
  void document.getElementById(value).offsetWidth;
  document.getElementById(value).classList.add(value + "_anime");
  //   alert(value);
  document.getElementById(value + "_count").classList.remove("counter_hid");
  void document.getElementById(value + "_count").offsetWidth;
  document.getElementById(value + "_count").classList.add("counter_hid");
  var val = Number(document.getElementById(value + "_count").innerHTML);
  val = val + 1;
  document.getElementById(value + "_count").innerHTML = val;
}

btn = document.getElementById("btn");

async function getJoke() {
  try {
    btn.setAttribute("disabled", "true");
    btn.innerText = "...";
    document.getElementById("joke").innerHTML = "Loading...";
    const jokeData = await fetch(
      "https://api.api-ninjas.com/v1/dadjokes?limit=1",
      options
    );

    joke = await jokeData.json();
    document.getElementById("joke").innerHTML = joke[0].joke;
    post_title = "Hey, here is a joke for you: " + joke[0].joke;
    btn.setAttribute("disabled", "false");
    btn.innerText = "Tell Me Another One";
  } catch (error) {
    btn.innerText = "Try Again";
    document.getElementById("joke").innerHTML = "Can't fetch the joke ";
    console.log(error);
    document.querySelector(".error").innerText = error;
    document.querySelector(".error").style.display = "block";
    setTimeout(() => {
      document.querySelector(".error").style.display = "none";
    }, 2000);
  }
}
document.getElementById("btn").addEventListener("click", getJoke);

var facebook_link = encodeURI(
  `https://www.facebook.com/sharer.php?u=[${post_url}]`
);
var whatsapp_link = encodeURI(
  `https://api.whatsapp.com/send?text=[${post_title}] [${post_url}]`
);
var linked_link = encodeURI(
  `https://www.linkedin.com/shareArticle?url=[${post_url}]&title=[${post_title}]`
);
var twitter_link = encodeURI(
  `https://twitter.com/share?url=[${post_url}]&text=[${post_title}]&hashtags=[dadjokes]`
);

function post(where) {
  if (post_title == "") {
    document.querySelector(".error").innerText = "There is no joke to be send";
    document.querySelector(".error").style.display = "block";
    setTimeout(() => {
      document.querySelector(".error").style.display = "none";
    }, 2000);
    return;
  }
  post_url = encodeURI(document.location.href);
  console.log(where);
  console.log(post_title);
  if (where === "facebook")
    document
      .getElementById(where)
      .setAttribute(
        "href",
        `https://www.facebook.com/sharer.php?u=[${post_url}]`
      );
  if (where === "whatsapp")
    document
      .getElementById(where)
      .setAttribute(
        "href",
        `https://api.whatsapp.com/send?text=[${post_title}] [${post_url}]`
      );

  if (where === "twitter")
    document
      .getElementById(where)
      .setAttribute(
        "href",
        `https://twitter.com/share?url=[${post_url}]&text=[${post_title}]&hashtags=[dadjokes]`
      );

  if (where === "linkedin")
    document
      .getElementById(where)
      .setAttribute(
        "href",
        `https://www.linkedin.com/shareArticle?url=[${post_url}]&title=[${post_title}]`
      );
}
