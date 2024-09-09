'use strict';
const tableContainer = document.querySelector('.table-container');
const blurBackground = document.querySelector('main');
const spinner = document.querySelector('.spinner');
const modelForm = document.querySelector('.form-container');
const cloz = document.querySelector('.close');
const submit = document.querySelector('.submit');
const showModel = document.querySelector('.button-st');
const fullName = document.querySelector('.fullnameinput');
const emailInput = document.querySelector('.emailinput');
const phoneInput = document.querySelector('.phoneinput');
const dateInput = document.querySelector('.dateinput');
const projectsInput = document.querySelector('.projectsinput');
const roleInput = document.querySelector('.roleinput');
const checkInput = document.querySelector('.checkinput');
const searchInput = document.querySelector('.search')
const searchIcon = document.querySelector('.fa-magnifying-glass')
const tablerows = document.querySelector('.table-student');
// create a array
submit.addEventListener('click', (e) => {

    e.preventDefault();
    const fullNameValue = fullName.value;
    const emailValue = emailInput.value;
    const phoneValue = phoneInput.value;
    const dateValue = dateInput.value;
    const projectsValue = projectsInput.value;
    const roleValue = roleInput.value;    

   const html = 
   ` <div class="table-student">
    <a href="">
    <input type="checkbox" class="check"></input>
      ${fullNameValue}
    </a>
    <a href="">${emailValue}</a>
     <div class="nav-st">
     <a href=""> ${phoneValue}</a>
     <a href="">${dateValue}</a>
     <a href="">${projectsValue}</a>
     <a href="">${roleValue}</a>
   </div>
  </div>
  `
  fullName.value ='',
  emailInput.value='',
  phoneInput.value='',
  projectsInput.value='',
  dateInput.value='',
  roleInput.value =''

    if (!fullNameValue || !emailValue || !phoneValue || !dateValue || !projectsValue || !roleValue) {
        alert('Please fill in all fields');
        return;
    }
  tableContainer.insertAdjacentHTML('afterend',
  html);
});

showModel.addEventListener('click', () => {
    modelForm.classList.remove('hidden')
    blurBackground.style.filter = 'blur(20px)';
});
                    
cloz.addEventListener('click', () => {
    modelForm.classList.add('hidden')
    blurBackground.style.filter = 'none';
})

const show = function (){
    spinner.style.display = 'block';
}

const hide = function (){
    spinner.style.display = 'none'
    }

const apdta = function (data) {
    const html = `
    <div class="table-student">
    <a href=""><input type="checkbox" class="check">
      ${data.name}
    </a>
    <a href="">${data.email}</a>
     <div class="nav-st">
     <a href=""> ${data.phone}</a>
     <a href="">${data.otp}</a>
     <a href="">${data.loginOTP}</a>
     <a href="">${data.role}</a>
   </div>
  </div>
  `;
  tableContainer.insertAdjacentHTML('afterend',
  html);
    tableContainer.style.opacity = 1;
}

   const john = function() {
    show();
    fetch(`https://jk-crud-server-1.onrender.com/JkVichalInfoList/all`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(resData => {
        hide();
          const data = resData.data[0];
          const data1 = resData.data[1];

          apdta(data)
          apdta(data1);
      }
        )
      .catch(err =>{
        hide();
         console.error(`Fetch error: ${err.message}`)});
  };
    john();

    searchIcon.addEventListener('click', (e) => {
        e.preventDefault();
        const searchValue = searchInput.value.toLowerCase();
        const rows = document.querySelectorAll('.table-student');
    
        rows.forEach(row => {
        const rowText = row.textContent.toLowerCase();
        if (rowText.includes(searchValue)) {
            row.style.display = 'flex'; 
        } else {
            row.style.display = 'none';
        }
        });
        
        searchInput.value = '';
    });
   

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            searchIcon.click();
        }
    });
