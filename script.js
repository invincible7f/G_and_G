
//  -------------------------Модалка та кнопки-----------------------

const btnTicket = document.querySelectorAll(".btn-ticket");
const btnMain = document.querySelector(".btn-main");
const modalOverlay = document.querySelector(".modal-overlay");
const modalClose = document.querySelector(".modal-close");
const formModal = document.querySelector(".modal-form")
const modalInputFields = formModal.querySelectorAll('input')
const successModal = document.querySelector('#successModal')
const successModalBtn = successModal.querySelector('.btn-success-modal')
const navLinks = document.querySelectorAll(".nav-links div a")
const navMenu = document.querySelector(".nav-links")
const burgerCheckbox = document.querySelector("#burger-checkbox")

 const modalInput = {
    name: document.querySelector('[name="input-name"]'),
    tel: document.querySelector('[name="input-tel"]'),
    tickets:document.querySelector('[name="input-tickets"]')
  }

  function navToggle(){

   burgerCheckbox.checked = false 
  }

  function submitModalForm(e){
   e.preventDefault();

    const nameAlert = modalInput.name.parentElement.querySelector('.alert');
    const telAlert = modalInput.tel.parentElement.querySelector('.alert');
    const ticketsAlert = modalInput.tickets.parentElement.querySelector('.alert');
    let isTicketsValid = false;
    let isNameValid = false;
    let isTelValid = false;
    
    const ticketsPattern = /^\d+$/;
    const telPattern = /^\d+$/;
    const namePattern = /^[a-zA-Zа-яА-ЯёЁЇїІіЄєҐґ\s]+$/;

    const modalData = {
        userName: modalInput.name.value.trim(), 
        userTel: modalInput.tel.value.trim(),
        ticketsCount:modalInput.tickets.value.trim()
    };  

   // Валідація імені 

    if (!modalData.userName) {

        if (nameAlert) {
            nameAlert.innerHTML = '<span>Введіть ім\'я</span>';
            nameAlert?.classList.add("alert-active");
        }

    } else if (!namePattern.test(modalData.userName)) {

        if (nameAlert) {
            nameAlert.innerHTML = '<span>Введіть коректно ім\'я</span>';
            nameAlert?.classList.add('alert-active')
        
        };

    } else {

        nameAlert?.classList.remove('alert-active');
        isNameValid = true;
    }

    // Валідація Телефона 


    if (!modalData.userTel) {
        if (telAlert){ 
            telAlert.innerHTML = '<span>Введіть телефон</span>';
        telAlert?.classList.add("alert-active");
    
    }

    } else if (!telPattern.test(modalData.userTel)) {
        if (telAlert) {
            
            telAlert.innerHTML = '<span>Введіть коректно телефон</span>';
            telAlert?.classList.add('alert-active')
    }

    } else {
        telAlert?.classList.remove('alert-active');
        isTelValid = true;
    }


 // Валідація білетів


    if (!modalData.ticketsCount) {
    if (ticketsAlert) {
        
        ticketsAlert.innerHTML = '<span>Вкажіть кількість квитків</span>';
        ticketsAlert?.classList.add("alert-active")
}
} else if (!ticketsPattern.test(modalData.ticketsCount) || parseInt(modalData.ticketsCount) <= 0) {

    if (ticketsAlert) {
        ticketsAlert.innerHTML = '<span>Введіть коректну кількість</span>';
        ticketsAlert?.classList.add('alert-active')
    }

} else {
    ticketsAlert?.classList.remove('alert-active');
    isTicketsValid = true;
}

 
    if (isNameValid && isTelValid && isTicketsValid) {
        sendRequest();
        closeModal();
        formModal.reset();
    }

  }

  function inputInTheField(){
    this.parentElement.querySelector(".alert").classList.remove('alert-active')
}


function openModal(){
    document.documentElement.style.scrollbarGutter = "stable";
    modalOverlay.style.opacity = '1'
    modalOverlay?.classList.add("active");
    document.documentElement.classList.add("no-scroll"); 
    document.body.classList.add("no-scroll");
        
}

 function closeModal(){
 
   modalOverlay.style.opacity = '0';
   formModal?.reset()
   document.documentElement.classList.remove("no-scroll"); 
    document.body.classList.remove("no-scroll");
    setTimeout(() => {
    modalOverlay && modalOverlay.classList.remove("active");
    }, 300);

   
   
    
}

 function closeSuccessModal() {
    document.documentElement.style.scrollbarGutter = "auto";
    document.body.classList.remove("no-scroll");
    successModal.style.opacity = '0';
    setTimeout(() => {
    successModal?.classList.remove("active");
    }, 300);
     
   
    
}

function closeModalByOverlay(e){
   e.target === modalOverlay && closeModal();
   
  
}


 btnTicket.forEach(btn=>{
 btn.addEventListener('click',openModal)
    })
    btnMain?.addEventListener('click', openModal);
    modalClose?.addEventListener('click',closeModal);
    modalOverlay?.addEventListener('click',closeModalByOverlay);
    formModal?.addEventListener('submit', submitModalForm)
    modalInputFields.forEach(inp=>{
    inp.addEventListener('input', inputInTheField)
 })
    successModalBtn?.addEventListener('click', closeSuccessModal)
   navLinks.forEach(nav=>{
    nav.addEventListener('click', navToggle)
   })


  // ------------------------------------Форма-------------------------------------


 
 const contactForm = document.querySelector("#form")
 const submit = document.querySelector(".btn-submit")
 const inputAlert = document.querySelectorAll(".alert")
 const inputFields = document.querySelectorAll("#form input")
 const textarea = document.querySelector("#form textarea ")

 const form = {
    name:document.querySelector(`[name="name"]`),
    email:document.querySelector('[name="email"]'),
    message:document.querySelector('[name="message"]')
 }




function inputInTheField(){
    this.parentElement.querySelector(".alert").classList.remove('alert-active')
}

function inputInTheTextarea(){
    textarea?.parentElement.querySelector(".alert").classList.remove('alert-active')
}

async function sendRequest() {
       
        try {
            
            const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');

           
            if (!response.ok) {
                throw new Error('Помилка мережі: ' + response.status);
            }
            
            
            const data = await response.json();

            if (data) {
              
               
                        successModal.classList.add('active');
                        successModal.style.transition = 'opacity 0.3s ease';
                        successModal.style.opacity = '1';
            
                    const timer = setTimeout(()=>{
                    successModal.style.opacity = '0';
                    setTimeout(() => {
                    successModal.classList.remove('active');
                }, 300);
               
             }, 2000)
        }

    } 
        
        catch (error) {
            console.error("Сталася помилка:", error.message);
        }
    }

function submitForm(e){
  e.preventDefault();

    let isNameValid = false;
    let isEmailValid = false;
    let isMessageValid = false;

    const nameAlert = form.name.parentElement.querySelector('.alert');
    const emailAlert = form.email.parentElement.querySelector('.alert');
    const messageAlert = form.message.parentElement.querySelector('.alert');
    
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const namePattern = /^[a-zA-Zа-яА-ЯёЁЇїІіЄєҐґ\s]+$/;

    const formData = {
        userName: form.name.value.trim(),
        userEmail: form.email.value.trim(),
        userMessage: form.message.value.trim(),
    };

    // Валідація Імені
    if (!formData.userName) {
        if (nameAlert) {
            nameAlert.innerHTML = '<span>Введіть ім\'я</span>';
            nameAlert.classList.add('alert-active');
        }
    } else if (!namePattern.test(formData.userName)) {
        if (nameAlert) {
            nameAlert.innerHTML = '<span>Введіть коректно ім\'я</span>';
            nameAlert.classList.add('alert-active');
        }
    } else {
        nameAlert?.classList.remove('alert-active');
        isNameValid = true;
    } 

  // Валідація email
    if (!formData.userEmail) {
        if (emailAlert) {
            emailAlert.innerHTML = '<span>Введіть email</span>';
            emailAlert.classList.add('alert-active');
        }
    } else if (!emailPattern.test(formData.userEmail)) {
        if (emailAlert) {
            emailAlert.innerHTML = '<span>Введіть коректно email</span>';
            emailAlert.classList.add('alert-active');
        }
    } else {
        emailAlert?.classList.remove('alert-active');
        isEmailValid = true;
    }

     // Валідація повідомлення
    if (!formData.userMessage) {
        if (messageAlert) {
            messageAlert.innerHTML = '<span>Введіть повідомлення</span>';
            messageAlert.classList.add('alert-active');
        }
    } else {
        messageAlert?.classList.remove('alert-active');
        isMessageValid = true;
    }

    // Відправка
    if (isNameValid && isEmailValid && isMessageValid) {
        contactForm.reset();
        sendRequest();
    }
}

inputFields?.forEach(field => {
    field.addEventListener('input', inputInTheField);
});
textarea?.addEventListener('input', inputInTheTextarea)
contactForm?.addEventListener('submit',submitForm)