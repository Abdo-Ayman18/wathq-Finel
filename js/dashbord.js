// ?=====>  globel   <====
const loooder = document.getElementById("loooder");
const tokenUser = localStorage.getItem("tokenUser");
let searchInput = document.getElementById("searchInput");
let allDocs = [];

getDataMe();
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
//* عرض البيانات
async function getDataDashbord() {
  loooder.classList.remove("d-none"); //اظهار looder
  const api = await fetch(
    `https://graduation-backend-production-b53d.up.railway.app/api/v1/documents`,
    {
      method: "GEt",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenUser}`,
      },
    },
  );
  let dat = await api.json();
  if (dat.success === true) {
    console.log(dat);
    let data = dat.data.documents;
    allDocs = data;
    // allData
    let cartonaAll = ``;
    for (let i = 0; i < data.length; i++) {
      if (data[i].status === "valid") {
        cartonaAll += `
        <!-- Card -->
                    <div class="col-12 col-md-6 col-lg-4">
                      <div class="doc-card green national">
                        <div class="card-header">
                          <div class="icon-box icon-green">
                            <i class="fa-solid fa-id-card"></i>
                          </div>
  
                          <span class="status status-green">سارية</span>
                        </div>
  
                        <div class="title">  ${data[i].title}</div>
  
                        <div class="subtitle">${data[i].documentId}</div>
  
                        <div class="card-footer">
                          <a class="details" href="#"></a>
  
                          <div class="expire">
                            تاريخ الانتهاء
                            <strong>${new Date(data[i].expiryDate).toLocaleDateString()}</strong>
                          </div>
                        </div>
                      </div>
                    </div>
        `;
      } else if (data[i].status === "about_to_expire") {
        cartonaAll += `
         <!-- Card 2 -->
                    <div class="col-12 col-md-6 col-lg-4">
                      <div class="doc-card yellow license">
                        <div class="card-header">
                          <div class="icon-box icon-yellow">
                            <i class="fa-solid fa-id-card"></i>
                          </div>
  
                          <span class="status status-yellow">قريب الانتهاء</span>
                        </div>
  
                        <div class="title">  ${data[i].title}</div>
  
                        <div class="subtitle">  ${data[i].documentId}</div>
  
                        <div class="card-footer">
                          <a class="details" href="#"></a>
  
                          <div class="expire">
                            تاريخ الانتهاء
                            <strong>${new Date(data[i].expiryDate).toLocaleDateString()}</strong>
                          </div>
                        </div>
                      </div>
                    </div>
        `;
      } else {
        cartonaAll += `
         <div class="col-12 col-md-6 col-lg-4">
                      <div class="doc-card yellow denger">
                        <div class="card-header">
                          <div class="icon-box icon-denger">
                            <i class="fa-solid fa-id-card"></i>
                          </div>
  
                          <span class="status status-denger"> منتهيه</span>
                        </div>
  
                        <div class="title"> ${data[i].title}</div>
  
                        <div class="subtitle">${data[i].documentId}</div>
  
                        <div class="card-footer">
                          <a class="details" href="#"></a>
  
                          <div class="expire">
                            تاريخ الانتهاء
                            <strong> ${new Date(data[i].expiryDate).toLocaleDateString()}/strong>
                          </div>
                        </div>
                      </div>
                    </div>
        `;
      }
    }
    // allData
    document.getElementById("allData").innerHTML = cartonaAll;

    //valid
    let cartonaValid = ``;
    for (let i = 0; i < data.length; i++) {
      if (data[i].status === "valid") {
        cartonaValid += `
        <!-- Card -->
                    <div class="col-12 col-md-6 col-lg-4">
                      <div class="doc-card green national">
                        <div class="card-header">
                          <div class="icon-box icon-green">
                            <i class="fa-solid fa-id-card"></i>
                          </div>
  
                          <span class="status status-green">سارية</span>
                        </div>
  
                        <div class="title">  ${data[i].title}</div>
  
                        <div class="subtitle">${data[i].documentId}</div>
  
                        <div class="card-footer">
                          <a class="details" href="#"></a>
  
                          <div class="expire">
                            تاريخ الانتهاء
                            <strong>${new Date(data[i].expiryDate).toLocaleDateString()}</strong>
                          </div>
                        </div>
                      </div>
                    </div>
        `;
      }
    }
    document.getElementById("validData").innerHTML = cartonaValid;
    //about-about_to_expire
    let cartonaAbout_to_expire = ``;
    for (let i = 0; i < data.length; i++) {
      if (data[i].status === "about_to_expire") {
        cartonaAbout_to_expire += `
         <!-- Card 2 -->
                    <div class="col-12 col-md-6 col-lg-4">
                      <div class="doc-card yellow license">
                        <div class="card-header">
                          <div class="icon-box icon-yellow">
                            <i class="fa-solid fa-id-card"></i>
                          </div>
  
                          <span class="status status-yellow">قريب الانتهاء</span>
                        </div>
  
                        <div class="title">  ${data[i].title}</div>
  
                        <div class="subtitle">  ${data[i].documentId}</div>
  
                        <div class="card-footer">
                          <a class="details" href="#"></a>
  
                          <div class="expire">
                            تاريخ الانتهاء
                            <strong>${new Date(data[i].expiryDate).toLocaleDateString()}</strong>
                          </div>
                        </div>
                      </div>
                    </div>
        `;
      }
    }
    document.getElementById("about_to_expireData").innerHTML =
      cartonaAbout_to_expire;

    //expireData
    let cartonaExpire = ``;
    for (let i = 0; i < data.length; i++) {
      if (data[i].status === "expired") {
        cartonaExpire += `
         <div class="col-12 col-md-6 col-lg-4">
                      <div class="doc-card yellow denger">
                        <div class="card-header">
                          <div class="icon-box icon-denger">
                            <i class="fa-solid fa-id-card"></i>
                          </div>
  
                          <span class="status status-denger"> منتهيه</span>
                        </div>
  
                        <div class="title"> ${data[i].title}</div>
  
                        <div class="subtitle">${data[i].documentId}</div>
  
                        <div class="card-footer">
                          <a class="details" href="#"></a>
  
                          <div class="expire">
                            تاريخ الانتهاء
                            <strong> ${new Date(data[i].expiryDate).toLocaleDateString()}/strong>
                          </div>
                        </div>
                      </div>
                    </div>
        `;
      }
    }
    document.getElementById("expireData").innerHTML = cartonaExpire;
    changeRogres(data);
  }
  loooder.classList.add("d-none"); //اخفاء looder
}

function changeRogres(data) {
  const validCount = data.filter((doc) => doc.status === "valid").length; //علشان اجيب عدد الوثائق الساريه
  const aboutCount = data.filter(
    (doc) => doc.status === "about_to_expire",
  ).length; //علشان اجيب عدد الوثائق قاربت الانتهاء
  const expiredCount = data.filter((doc) => doc.status === "expired").length; //علشان اجيب عدد الوثائق منتهيه
  const allData = data.length;
  document.querySelector(".gree").style.width =
    `${(validCount / allData) * 100}%`;
  document.querySelector(".percent-green").innerHTML = `${validCount}`;
  document.querySelector(".ye").style.width =
    `${(aboutCount / allData) * 100}%`;
  document.querySelector(".percent-ye").innerHTML = `${aboutCount}`;
  document.querySelector(".re").style.width =
    `${(expiredCount / allData) * 100}%`;
  document.querySelector(".percent-red").innerHTML = `${expiredCount}`;
}
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
  const data = dat.data.user.name;
  document.getElementById("name").innerHTML = `مرحباً ${data} 👋 `;
}
function searcData() {
  // console.log(searchInput.value);
  let term = searchInput.value; // text user
  let cartonaAll = ``;
  for (let i = 0; i < allDocs.length; i++) {
    if (allDocs[i].title.toLowerCase().includes(term.toLowerCase())) {
      if (allDocs[i].status === "valid") {
        cartonaAll += `
        <!-- Card -->
                    <div class="col-12 col-md-6 col-lg-4">
                      <div class="doc-card green national">
                        <div class="card-header">
                          <div class="icon-box icon-green">
                            <i class="fa-solid fa-id-card"></i>
                          </div>
  
                          <span class="status status-green">سارية</span>
                        </div>
  
                        <div class="title">  ${allDocs[i].title}</div>
  
                        <div class="subtitle">${allDocs[i].documentId}</div>
  
                        <div class="card-footer">
                          <a class="details" href="#"></a>
  
                          <div class="expire">
                            تاريخ الانتهاء
                            <strong>${new Date(allDocs[i].expiryDate).toLocaleDateString()}</strong>
                          </div>
                        </div>
                      </div>
                    </div>
        `;
      } else if (allDocs[i].status === "about_to_expire") {
        cartonaAll += `
         <!-- Card 2 -->
                    <div class="col-12 col-md-6 col-lg-4">
                      <div class="doc-card yellow license">
                        <div class="card-header">
                          <div class="icon-box icon-yellow">
                            <i class="fa-solid fa-id-card"></i>
                          </div>
  
                          <span class="status status-yellow">قريب الانتهاء</span>
                        </div>
  
                        <div class="title">  ${allDocs[i].title}</div>
  
                        <div class="subtitle">  ${allDocs[i].documentId}</div>
  
                        <div class="card-footer">
                          <a class="details" href="#"></a>
  
                          <div class="expire">
                            تاريخ الانتهاء
                            <strong>${new Date(allDocs[i].expiryDate).toLocaleDateString()}</strong>
                          </div>
                        </div>
                      </div>
                    </div>
        `;
      } else {
        cartonaAll += `
         <div class="col-12 col-md-6 col-lg-4">
                      <div class="doc-card yellow denger">
                        <div class="card-header">
                          <div class="icon-box icon-denger">
                            <i class="fa-solid fa-id-card"></i>
                          </div>
  
                          <span class="status status-denger"> منتهيه</span>
                        </div>
  
                        <div class="title"> ${allDocs[i].title}</div>
  
                        <div class="subtitle">${allDocs[i].documentId}</div>
  
                        <div class="card-footer">
                          <a class="details" href="#"></a>
  
                          <div class="expire">
                            تاريخ الانتهاء
                            <strong> ${new Date(allDocs[i].expiryDate).toLocaleDateString()}/strong>
                          </div>
                        </div>
                      </div>
                    </div>
        `;
      }
    }
    // allData
  }
  document.getElementById("allData").innerHTML = cartonaAll;
}
//?=====>  validation   <====
//*=====>  call Function   <====
getDataDashbord();
// ================== تشغيل الإشعارات عند فتح الصفحة ==================
// أول ما الصفحة تفتح نجيب الإشعارات
getNotifications();

// ================== جلب الإشعارات من السيرفر ==================
async function getNotifications() {
  try {
    // طلب API لجلب الإشعارات غير المقروءة
    const res = await fetch(
      "https://graduation-backend-production-b53d.up.railway.app/api/v1/notifications",
      {
        method: "GET",

        headers: {
          // إرسال التوكن عشان السيرفر يعرف المستخدم
          Authorization: `Bearer ${tokenUser}`,

          // منع استخدام الكاش (عشان يجيب أحدث بيانات)
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },

        // إجبار المتصفح إنه ما يستخدمش بيانات قديمة
        cache: "no-store",
      },
    );

    // تحويل الرد إلى JSON
    const dat = await res.json();

    // طباعة النتيجة في الكونسول للتجربة
    console.log("Notifications:", dat);

    // لو العملية ناجحة
    if (dat.success) {
      // إرسال الإشعارات لدالة العرض
      renderNotifications(dat?.data?.notifications || []);
    }
  } catch (err) {
    // في حالة وجود خطأ في الاتصال
    console.error("Error:", err);
  }
}

// ================== عرض الإشعارات في الصفحة ==================
function renderNotifications(notifications) {
  // عنصر القائمة في HTML
  const list = document.getElementById("notiList");

  // عنصر العداد فوق الجرس
  const count = document.getElementById("notiCount");

  // تفريغ القائمة قبل إعادة الرسم
  list.innerHTML = "";

  // لو مفيش إشعارات
  if (notifications.length === 0) {
    list.innerHTML = `
      <li class="dropdown-item text-center text-muted">
        لا يوجد إشعارات
      </li>
    `;

    // تصفير العداد
    count.textContent = 0;

    return;
  }

  // ================== عرض كل إشعار ==================
  for (let i = 0; i < notifications.length; i++) {
    const n = notifications[i];

    // إضافة كل إشعار في القائمة
    list.innerHTML += `
      <li class="dropdown-item" style="cursor:pointer"
          onclick="markAsRead('${n._id}')">

        <!-- نص الإشعار -->
        ${n.message}

      </li>
    `;
  }

  // تحديث عدد الإشعارات
  count.textContent = notifications.length;
}

// ================== تعليم الإشعار كمقروء ==================
async function markAsRead(id) {
  try {
    // إرسال طلب للسيرفر لتغيير حالة الإشعار إلى "مقروء"
    await fetch(
      `https://graduation-backend-production-b53d.up.railway.app/api/v1/notifications/${id}/read`,
      {
        method: "PATCH",

        headers: {
          // التوكن للتأكد من المستخدم
          Authorization: `Bearer ${tokenUser}`,
        },
      },
    );

    // إعادة تحميل الإشعارات بعد التحديث
    getNotifications();
  } catch (err) {
    console.error(err);
  }
}
