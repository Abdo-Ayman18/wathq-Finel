// ?=====>  globel   <====
const loooder = document.getElementById("loooder");
const tokenUser = localStorage.getItem("tokenUser");

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
//!=====>  function   <====
async function getDataMe() {
  loooder.classList.remove("d-none"); //اظهار looder
  const api = await fetch(
    `https://graduation-backend-production-b53d.up.railway.app/api/v1/users/me`,
    {
      method: "GEt",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenUser}`,
      },
    },
  );
  let dat = await api.json();
  //   console.log(dat.data.user);
  const data = dat.data.user;
  const date = new Date(data.createdAt);

  const formatted = date.toLocaleString("ar-EG", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    // second: "2-digit",
    hour12: true,
  });

  //   console.log(formatted);
  document.getElementById("Name").innerHTML = data.name;
  document.getElementById("email").innerHTML = data.email;
  document.getElementById("role").innerHTML = data.role;
  document.getElementById("createdAt").innerHTML = formatted;
  loooder.classList.add("d-none"); //اخفاء looder
}
//?=====>  validation   <====
getDataMe();
