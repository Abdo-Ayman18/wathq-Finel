// dark mode
document.addEventListener("DOMContentLoaded", () => {
  const darkBtn = document.querySelector(".dark-iecon");

  // لو الزرار مش موجود مفيش أي خطأ
  if (!darkBtn) return;

  const icon = darkBtn.querySelector("i");

  // ---- استعادة الوضع من LocalStorage ----
  const isSavedDark = localStorage.getItem("darkMode") === "true";

  if (isSavedDark) {
    document.body.classList.add("dark");
    icon.classList.add("fa-sun");
    icon.classList.remove("fa-moon");
  } else {
    document.body.classList.remove("dark");
    icon.classList.add("fa-moon");
    icon.classList.remove("fa-sun");
  }

  // ---- تغيير الوضع عند الضغط ----
  darkBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");

    if (isDark) {
      icon.classList.add("fa-sun");
      icon.classList.remove("fa-moon");
    } else {
      icon.classList.add("fa-moon");
      icon.classList.remove("fa-sun");
    }

    // ---- حفظ الوضع ----
    localStorage.setItem("darkMode", isDark);
  });
});
