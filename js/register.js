//* ================> صفحه انشاء حساب  <===================

// ?=====>  globel   <====
const inputs = document.querySelectorAll("input");
const btnRegister = document.getElementById("btnRegister");
const formData = document.querySelector("form");
let isValid = false; //تاكد ان كل الداتا صحيحه
//!=====>  when start   <====

//*=====>  events   <====

formData.addEventListener("submit", function (e) {
  e.preventDefault();
  // console.log("ffffff ");
  if (isValid === true) {
    //لو فلديشن تمام ابعت الداتا للباك
    setForm();
  }
});
// validation form
formData.addEventListener("input", function () {
  if (
    validationName(inputs[0]) &&
    validationEmail(inputs[1]) &&
    validationPassword(inputs[2])
  ) {
    isValid = true; //الداتا مكتوبه صح
  } else {
    isValid = false; // الداتا فيها غلط
  }
});

// //  !    Name
// inputs[0].addEventListener("blur", function () {
//   validationName(inputs[0]);
// });
// //  !    email
// inputs[1].addEventListener("blur", function () {
//   validationEmail(inputs[1]);
// });
// //  !    password
// inputs[2].addEventListener("blur", function () {
//   validationPassword(inputs[2]);
// });

//اجيب اول الصفحه
window.scrollTo({
  top: 0,
  // behavior: "",
});

// shoo Password Register
const toggleRegisterPassword = document.getElementById(
  "toggleRegisterPassword",
);
const registerPassword = document.getElementById("registerPassword");

toggleRegisterPassword?.addEventListener("click", () => {
  const type = registerPassword.type === "password" ? "text" : "password";
  registerPassword.type = type;

  toggleRegisterPassword.classList.toggle("fa-eye");
  toggleRegisterPassword.classList.toggle("fa-eye-slash");
});

//!=====>  function   <====
// هعمل فنكشن تصنع فورم
function setForm() {
  const user = {
    name: inputs[0].value,
    email: inputs[1].value,
    password: inputs[2].value,
  };
  // console.log(user);
  registerForm(user);
  // user=userData
}
//callapi
async function registerForm(userData) {
  loooder.classList.remove("d-none"); //اظهار looder

  const api = await fetch(
    `https://graduation-backend-production-b53d.up.railway.app/api/v1/auth/register`,
    {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    },
  );
  const res = await api.json();
  loooder.classList.add("d-none"); //اخفاء looder

  toastr.options = {
    positionClass: "toast-right-center",
    timeOut: 5000,
    closeButton: true,
    progressBar: true,
  };
  if (res.success === true) {
    // loooder.classList.remove("d-none"); //اظهار looder

    toastr.success("تم انشاء حساب بنجاح"); //alert
    location.href = "./signIn.html"; //وديني لصفحه تسجيل الدخول لو الداتا بتاعتي صح
    loooder.classList.add("d-none"); //اخفاء looder
  } else {
    toastr.success(res.message); //alert
    // loooder.classList.add("d-none"); //اخفاء looder
  }

  // console.log(res);
}

//?=====>  validation   <====

// ! Namme
function validationName(inputName) {
  const regexStyle =
    /^(?:[a-zA-Z0-9\s@,=%$#&_\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){2,20}$/;
  if (regexStyle.test(inputName.value)) {
    inputName.classList.add("is-valid");
    inputName.classList.remove("is-invalid");
    document.getElementById("alertName").classList.add("d-none");
    return true;
  } else {
    inputName.classList.add("is-invalid");
    inputName.classList.remove("is-valid");
    document.getElementById("alertName").classList.remove("d-none");
    return false;
  }
}
// ! email
function validationEmail(inputEmail) {
  const regexStyle =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  if (regexStyle.test(inputEmail.value)) {
    inputEmail.classList.add("is-valid");
    inputEmail.classList.remove("is-invalid");
    document.getElementById("alertEmail").classList.add("d-none");
    return true;
  } else {
    inputEmail.classList.add("is-invalid");
    inputEmail.classList.remove("is-valid");
    document.getElementById("alertEmail").classList.remove("d-none");
    return false;
  }
}
// ! password
function validationPassword(inputPassword) {
  const regexStyle = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (regexStyle.test(inputPassword.value)) {
    inputPassword.classList.add("is-valid");
    inputPassword.classList.remove("is-invalid");
    document.getElementById("alertPassWord").classList.add("d-none");
    return true;
  } else {
    inputPassword.classList.add("is-invalid");
    inputPassword.classList.remove("is-valid");
    document.getElementById("alertPassWord").classList.remove("d-none");
    return false;
  }
}
