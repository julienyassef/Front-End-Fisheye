

// =====================
//     DOM Elements
// ===================
const modal = document.getElementById("contact_modal");

const inputFirst = document.querySelector("#first");
const inputLast = document.querySelector("#last");
const inputEmail = document.querySelector("#email");
const inputMessage = document.querySelector("#message");


// =====================
//        GLOBALE
// =====================
const RESULTS = {
    first: '',
    last:'',
    email: '',
    message: ''
  }


// =====================
//     FUNCTIONS
//   (définitions)
// =====================

// function launch modal form
const displayModal = () => {
    modal.style.display = "block";
  };
  // function close modal event
  const closeModal = () => {
    modal.style.display = "none";
  };



// =================================
//      VALIDATION FORMULAIRE
// =================================

// remplir le formulaire et validation submit click
form.addEventListener("submit", (event) => {
    event.preventDefault();
    
    
    
  

  
  
    console.table(RESULTS)
  })
  
  
  
  
  