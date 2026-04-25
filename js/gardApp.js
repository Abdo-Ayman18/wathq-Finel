if (localStorage.getItem("tokenUser") === null) {
  location.href = "./signIn.html";
  //==null  ===>يعني كدا مفيش توكن يعني تسجيل خروج
}
