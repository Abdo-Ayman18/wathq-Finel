// ?=====>  globel   <====
const loooder = document.getElementById("loooder");

//!=====>  when start   <====

//*=====>  events   <====
// log out
document.getElementById("logOut").addEventListener("click", function () {
  loooder.classList.remove("d-none"); //اظهار looder
  localStorage.removeItem("tokenUser");
  location.href = "./signIn.html";
  loooder.classList.add("d-none"); //اخفاء looder
});
//اجيب اول الصفحه
window.scrollTo({
  top: 0,
  // behavior: "",
});
//هنخفي تسجيل الدخول من الناف طول مهو مسجل
if (localStorage.getItem("tokenUser") != null) {
  document.getElementById("loginNave").classList.add("d-none"); //اخفاء زر تسجيل الدخول ف الناف
  document.getElementById("sideNave").classList.remove("d-none"); //اظهار السيد بار ف حاله تسجيل الدخول
  document.querySelector(".startNowHome").classList.add("d-none"); // اخفاء زر ابدا الان عند تسجيل الدخول
  document.querySelector(".startNowHomeBox").classList.add("d-none"); // اخفاء زر ابدا الان عند تسجيل الدخول
} else {
  document.getElementById("loginNave").classList.remove("d-none"); //اظهار زر تسجيل الدخول ف الناف
  document.getElementById("sideNave").classList.add("d-none"); //اخفاء السيد بار ف حاله تسجيل الدخول
  document.querySelector(".startNowHome").classList.remove("d-none"); // اظهار زر ابدا الان عند تسجيل الدخول
  document.querySelector(".startNowHomeBox").classList.remove("d-none"); // اظهار زر ابدا الان عند تسجيل الدخول
}
//!=====>  function   <====

//?=====>  validation   <====
