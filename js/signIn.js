//* ================> صفحه تسجيل دخول  <===================
//* ================>   <===================

// ?=====>  globel   <====
const inputs = document.querySelectorAll("input");
const btnsingIn = document.getElementById("btnsingIn");
const formData = document.querySelector("form");
let isValid = false; //تاكد ان كل الداتا صحيحه
const loooder = document.getElementById("loooder");
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
  if (validationEmail(inputs[0]) && validationPassword(inputs[1])) {
    isValid = true; //الداتا مكتوبه صح
  } else {
    isValid = false; // الداتا فيها غلط
  }
});

// //  !    email
// inputs[0].addEventListener("blur", function () {
//   validationEmail(inputs[0]);
// });
// //  !    password
// inputs[1].addEventListener("blur", function () {
//   validationPassword(inputs[1]);
// });
//اجيب اول الصفحه
window.scrollTo({
  top: 0,
  // behavior: "",
});

// show / hide password signIn
const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.querySelector(".password-box input");

togglePassword?.addEventListener("click", () => {
  const type = passwordInput.type === "password" ? "text" : "password";

  passwordInput.type = type;

  togglePassword.classList.toggle("fa-eye");
  togglePassword.classList.toggle("fa-eye-slash");
});

//!=====>  function   <====
// هعمل فنكشن تصنع فورم
function setForm() {
  const user = {
    email: inputs[0].value,
    password: inputs[1].value,
  };
  console.log(user);
  loginForm(user);
  // user=userData
}
//callapi
async function loginForm(userData) {
  loooder.classList.remove("d-none"); //اظهار looder
  const api = await fetch(
    `https://graduation-backend-production-b53d.up.railway.app/api/v1/auth/login`,
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
  toastr.options = {
    positionClass: "toast-right-center",
    timeOut: 5000,
    closeButton: true,
    progressBar: true,
  };
  if (res.success === true) {
    loooder.classList.remove("d-none"); //اظهار looder
    toastr.success("تم  تسجيل الدخول بنجاح "); //alert
    localStorage.setItem("tokenUser", res.data.token); //حفظ التوكن ف لوكل ستورج
    location.href = "./index.html"; //وديني لصفحه الرئئئسيه لو مسجل دخول
    // console.log(res.data.token);
    loooder.classList.add("d-none"); //اخفاء looder
  } else {
    toastr.success(`${res.message}`); //alert
    loooder.classList.add("d-none"); //اخفاء looder
  }

  // console.log(res);
}

//?=====>  validation   <====

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
