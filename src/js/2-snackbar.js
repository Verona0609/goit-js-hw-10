// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";


/* const { default: iziToast } = require("izitoast"); */

const form = document.querySelector(".form");
form.addEventListener("submit", function(event){
  event.preventDefault();

  const delayInput = event.target.elements.delay;

  const stateInput = event.target.elements.state;

  const delay = parseInt(delayInput.value);
const state = stateInput.value

  const userPromise = new Promise((resolve, reject) =>{
setTimeout(()=>{
  if ( state === `fulfilled`){
    resolve(delay);
  }else{
    reject(delay);
  }
}, delay)
  });

  userPromise
  .then(delay =>{
    iziToast.success({
      title: "Success",
      message: `✅ Fulfilled promise in ${delay}ms`,

    });
  })
  .catch(delay =>{
    iziToast.error({
      title: `Error`,
      message: `❌ Rejected promise in ${delay}ms`,

    });
  });
});