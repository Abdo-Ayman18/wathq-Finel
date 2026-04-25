// ?=====>  globel   <====
const loooder = document.getElementById("loooder");
const NameInut = document.getElementById("nameDos");
const locationDosInput = document.getElementById("locationDos");
const startDateInput = document.getElementById("startDate");
const endDateInput = document.getElementById("endDate");
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

//submit Data
document.getElementById("submitData").addEventListener("click", function (e) {
  e.preventDefault();
  // setForm();
  //* تمنع ارسال البيانات لو الحقول فارغه
  if (
    !NameInut.value ||
    !locationDosInput.value ||
    !startDateInput.value ||
    !endDateInput.value
  ) {
    Swal.fire({
      icon: "error",
      title: "خطاء في حفظ البيانات...",
      text: "البيانات غير مكتمله",
      timer: 3000,
      showConfirmButton: false,
      buttonsStyling: false,
    });
    return;
  }

  Swal.fire({
    title: "هل انت متأكد؟",
    text: "لحفظ هذه البيانات ....!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "نعم، أضف",
    cancelButtonText: "إلغاء",
  }).then((result) => {
    if (result.isConfirmed) {
      setForm();

      Swal.fire({
        title: "تمت الإضافة بنجاح",
        icon: "success",
      });
    }
  });
  loooder.classList.remove("d-none"); //اظهار looder
});

//clear Data
document.getElementById("clear").addEventListener("click", function (e) {
  e.preventDefault();
  //* تمنع حذف البيانات لو الحقول فارغه
  if (
    !NameInut.value &&
    !locationDosInput.value &&
    !startDateInput.value &&
    !endDateInput.value
  ) {
    Swal.fire({
      icon: "error",
      title: "لا يوجد بيانات لحذفها",
      text: "يجب ادخال بيانات اولا",
      timer: 3000,
      showConfirmButton: false,
      buttonsStyling: false,
    });
    return;
  }
  Swal.fire({
    title: "هل انتا متاكد !",
    text: "لن تتمكن من التراجع عن هذا.....!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "نعم , أحذف",
    cancelButtonText: "إلغاء",
  }).then((result) => {
    if (result.isConfirmed) {
      clearForm();
      Swal.fire({
        title: "تم الحذف!",
        text: "",
        icon: "success",
      });
    }
  });
  // clearForm();
  // console.log("delet");
});
//!=====>  function   <====
//سحب البيانات من الفورم
function setForm() {
  const NewDos = {
    title: NameInut.value,
    documentId: locationDosInput.value,
    issueDate: new Date(startDateInput.value).toISOString(),
    expiryDate: new Date(endDateInput.value).toISOString(),
  };
  console.log(NewDos);
  sendDataBacend(NewDos);
}

//ارسال البيانات للباك اند
async function sendDataBacend(NewDos) {
  loooder.classList.remove("d-none"); //اظهار looder

  const api = await fetch(
    `https://graduation-backend-production-b53d.up.railway.app/api/v1/documents`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenUser}`,
      },
      body: JSON.stringify(NewDos),
    },
  );
  const dat = await api.json();
  loooder.classList.add("d-none"); //اخفاء looder

  // if (!api.ok) {
  //   console.log("FULL ERROR:", dat.error);
  // }
}

//clearForm
function clearForm() {
  NameInut.value = null;
  locationDosInput.value = null;
  startDateInput.value = null;
  endDateInput.value = null;
}

//?=====>  validation   <====
