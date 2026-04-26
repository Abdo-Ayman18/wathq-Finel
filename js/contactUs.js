(function () {
  emailjs.init("z1Af9t04kIYjUY9xc"); //Public Key
})();

const form = document.getElementById("contactForm");
const loader = document.getElementById("loooder");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  //اجيب اول الصفحه
  window.scrollTo({
    top: 0,
    // behavior: "",
  });
  // ✅ إظهار اللودر
  loader.classList.remove("d-none");

  // ✅ تعطيل الزر عشان ميتداسش كذا مرة
  const btn = form.querySelector("button");
  btn.disabled = true;
  btn.innerText = "جاري الإرسال...";

  emailjs
    .sendForm("service_eh4lcrd", "template_s6kxcrr", this)
    .then(function () {
      loader.classList.add("d-none");

      toastr.success("تم إرسال البيانات بنجاح");

      form.reset();
      btn.disabled = false;
      btn.innerText = "ارسال";
    })
    .catch(function (error) {
      loader.classList.add("d-none");

      console.log(error);
      toastr.error("حدث خطأ أثناء الإرسال");

      btn.disabled = false;
      btn.innerText = "ارسال";
    });
});
