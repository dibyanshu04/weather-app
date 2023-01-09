console.log('Client side javascript file is loaded!')

const form = document.querySelector('.weather-form') 
const textArea = document.querySelector('.text-area')
const inputAddress = document.querySelector(".input-address");

form.addEventListener('submit', (e) => {
    
    e.preventDefault();
    const address = inputAddress.value; 
    textArea.textContent = 'Loading...';
    fetch("http://localhost:3000/weather?address="+address).then(
      (response) => {
        response.json().then((data) => {
          if (data.error) {
            textArea.textContent = data.error;
          } else {
            textArea.textContent = data.response
          }
        });
      }
    );

})

