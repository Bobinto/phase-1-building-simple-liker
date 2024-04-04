const EMPTY_HEART = '♡';
const FULL_HEART = '♥';

document.addEventListener("DOMContentLoaded", () => {
  const errorModal = document.getElementById("modal");

  const emptyHearts = document.querySelectorAll(".like-glyph");

  emptyHearts.forEach((heart) => {
    heart.addEventListener("click", () => {
      mimicServerCall()
        .then(() => {
          // On success
          if (heart.innerText === EMPTY_HEART) {
            heart.innerText = FULL_HEART;
            heart.classList.add("activated-heart");
          } else {
            heart.innerText = EMPTY_HEART;
            heart.classList.remove("activated-heart");
          }
        })
        .catch((error) => {
          // On failure
          errorModal.classList.remove("hidden"); // Display the error modal
          const errorMessage = document.getElementById("modal-message");
          errorMessage.textContent = error; // Display the server error message
          setTimeout(() => {
            errorModal.classList.add("hidden"); // Hide the modal after 3 seconds
          }, 3000);
        });
    });
  });
});


function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
