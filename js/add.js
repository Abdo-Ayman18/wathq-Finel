// ?=====>  globel   <====
const loooder = document.getElementById("loooder");
const tokenUser = localStorage.getItem("tokenUser");
let allData = document.getElementById("kolo");
let validData = document.getElementById("valid");
let about_to_expireData = document.getElementById("about_to_expire");
let expiredData = document.getElementById("expired");
let searchInput = document.getElementById("searchInput");
let allDocs = [];

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
// allDocs.title.toLowerCase().includes("searchInput.v".toLowerCase);
function searcData() {
  // console.log(searchInput.value);
  let term = searchInput.value; // text user
  let cartonaAll = ``;
  for (let i = 0; i < allDocs.length; i++) {
    if (allDocs[i].title.toLowerCase().includes(term.toLowerCase())) {
      if (allDocs[i].status === "valid") {
        cartonaAll += `
      <tr>
        <th class="py-3" style="font-size: 0.9rem; font-weight: 700">
          <i
            class="fa-solid fa-id-card"
            style="
                                    border: 1px solid #e5e7eb;
                                    color: #1e40af;
                                    background-color: #78a3d9cb;
                                    border-radius: 0.375rem;
                                    padding: 0.375rem;
                                    font-size: 0.625rem;
                                  "
          ></i>
          ${allDocs[i].title}
        </th>
        <td class="py-3" style="font-size: 0.7875rem; color: #64748b">
          ${allDocs[i].documentId}
        </td>
        <td class="py-3" style="font-size: 0.75rem; font-weight: 700">
          ${new Date(allDocs[i].expiryDate).toLocaleDateString()}
        </td>
        
        <td class="py-3" style="font-size: 0.675rem; font-weight: bold">
          <span
            style="
                                    color: #000;
                                    border: 1px solid #10b981;
                                    background-color: #2ef7a6d7;
                                    padding: 2px 6px;
                                    border-radius: 6px;
                                  "
          >
            سارية
          </span>
        </td>
           <td class="py-3">
          <div class="d-flex">
             <span onclick="upDate('${allDocs[i]._id}')" class="btn btn-outline-info" font-size: 14.4px">
              <i class="fa-regular fa-pen-to-square"></i>
            </span>
            <span onclick="deletItem('${allDocs[i]._id}')" class=" me-3 btn btn-outline-danger"  font-size: 14.4px">
             <i class="fa-solid fa-trash"></i>
            </span>
          </div>
        </td>
      </tr>
      `;
      } else if (allDocs[i].status === "about_to_expire") {
        cartonaAll += `
      <tr>
        <th class="py-3" style="font-size: 0.9rem; font-weight: 700">
          <i
            class="fa-solid fa-id-card"
            style="
                                    border: 1px solid #e5e7eb;
                                    color: #1e40af;
                                    background-color: #78a3d9cb;
                                    border-radius: 0.375rem;
                                    padding: 0.375rem;
                                    font-size: 0.625rem;
                                  "
          ></i>
          ${allDocs[i].title}
        </th>
        <td class="py-3" style="font-size: 0.7875rem; color: #64748b">
          ${allDocs[i].documentId}
        </td>
        <td class="py-3" style="font-size: 0.75rem; font-weight: 700">
          ${new Date(allDocs[i].expiryDate).toLocaleDateString()}
        </td>
        
        <td class="py-3" style="font-size: 0.675rem; font-weight: bold">
          <span
            style="
                                    color: #000;
                                    border: 1px solid #F2D7A8;
                                    background-color: #F2D7A8;
                                    padding: 2px 6px;
                                    border-radius: 6px;
                                  "
          >
            على وشك الانتهاء
          </span>
        </td>
           <td class="py-3">
          <div class="d-flex">
           <span onclick="upDate('${allDocs[i]._id}')" class="btn btn-outline-info" font-size: 14.4px">
              <i class="fa-regular fa-pen-to-square"></i>
            </span>
           <span onclick="deletItem('${allDocs[i]._id}')" class=" me-3 btn btn-outline-danger"  font-size: 14.4px">
             <i class="fa-solid fa-trash"></i>
            </span>
          </div>
        </td>
      </tr>
      `;
      } else {
        cartonaAll += `
      <tr>
        <th class="py-3" style="font-size: 0.9rem; font-weight: 700">
          <i
            class="fa-solid fa-id-card"
            style="
                                    border: 1px solid #e5e7eb;
                                    color: #1e40af;
                                    background-color: #78a3d9cb;
                                    border-radius: 0.375rem;
                                    padding: 0.375rem;
                                    font-size: 0.625rem;
                                  "
          ></i>
          ${allDocs[i].title}
        </th>
        <td class="py-3" style="font-size: 0.7875rem; color: #64748b">
          ${allDocs[i].documentId}
        </td>
        <td class="py-3" style="font-size: 0.75rem; font-weight: 700">
          ${new Date(allDocs[i].expiryDate).toLocaleDateString()}
        </td>
        
        <td class="py-3" style="font-size: 0.675rem; font-weight: bold">
          <span
            style="
                                    color: #000;
                                    border: 1px solid #FAAFAF;
                                    background-color:#FAAFAF;
                                    padding: 2px 6px;
                                    border-radius: 6px;
                                  "
          >
           منتهي الصلاحية
          </span>
        </td>
           <td class="py-3">
          <div class="d-flex">
           <span onclick="upDate('${allDocs[i]._id}')" class="btn btn-outline-info" font-size: 14.4px">
              <i class="fa-regular fa-pen-to-square"></i>
            </span>
           <span onclick="deletItem('${allDocs[i]._id}')" class=" me-3 btn btn-outline-danger"  font-size: 14.4px">
             <i class="fa-solid fa-trash"></i>
            </span>
          </div>
        </td>
      </tr>
      `;
      }
    }
  }
  allData.innerHTML = cartonaAll;
  document.getElementById("koloFoter").innerHTML =
    ` عرض ${allDocs.length} من أصل ${allDocs.length} وثائق`;
}
//!=====>  function   <====
//* عرض البيانات
async function getData() {
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
    // console.log(dat);
    let data = dat.data.documents;

    allDocs = data;
    console.log(allDocs);
    // allData
    let cartonaAll = ``;
    for (let i = 0; i < data.length; i++) {
      if (data[i].status === "valid") {
        cartonaAll += `
      <tr>
        <th class="py-3" style="font-size: 0.9rem; font-weight: 700">
          <i
            class="fa-solid fa-id-card"
            style="
                                    border: 1px solid #e5e7eb;
                                    color: #1e40af;
                                    background-color: #78a3d9cb;
                                    border-radius: 0.375rem;
                                    padding: 0.375rem;
                                    font-size: 0.625rem;
                                  "
          ></i>
          ${data[i].title}
        </th>
        <td class="py-3" style="font-size: 0.7875rem; color: #64748b">
          ${data[i].documentId}
        </td>
        <td class="py-3" style="font-size: 0.75rem; font-weight: 700">
          ${new Date(data[i].expiryDate).toLocaleDateString()}
        </td>
        
        <td class="py-3" style="font-size: 0.675rem; font-weight: bold">
          <span
            style="
                                    color: #000;
                                    border: 1px solid #10b981;
                                    background-color: #2ef7a6d7;
                                    padding: 2px 6px;
                                    border-radius: 6px;
                                  "
          >
            سارية
          </span>
        </td>
           <td class="py-3">
          <div class="d-flex">
             <span onclick="upDate('${data[i]._id}')" class="btn btn-outline-info" font-size: 14.4px">
              <i class="fa-regular fa-pen-to-square"></i>
            </span>
            <span onclick="deletItem('${data[i]._id}')" class=" me-3 btn btn-outline-danger"  font-size: 14.4px">
             <i class="fa-solid fa-trash"></i>
            </span>
          </div>
        </td>
      </tr>
      `;
      } else if (data[i].status === "about_to_expire") {
        cartonaAll += `
      <tr>
        <th class="py-3" style="font-size: 0.9rem; font-weight: 700">
          <i
            class="fa-solid fa-id-card"
            style="
                                    border: 1px solid #e5e7eb;
                                    color: #1e40af;
                                    background-color: #78a3d9cb;
                                    border-radius: 0.375rem;
                                    padding: 0.375rem;
                                    font-size: 0.625rem;
                                  "
          ></i>
          ${data[i].title}
        </th>
        <td class="py-3" style="font-size: 0.7875rem; color: #64748b">
          ${data[i].documentId}
        </td>
        <td class="py-3" style="font-size: 0.75rem; font-weight: 700">
          ${new Date(data[i].expiryDate).toLocaleDateString()}
        </td>
        
        <td class="py-3" style="font-size: 0.675rem; font-weight: bold">
          <span
            style="
                                    color: #000;
                                    border: 1px solid #F2D7A8;
                                    background-color: #F2D7A8;
                                    padding: 2px 6px;
                                    border-radius: 6px;
                                  "
          >
            على وشك الانتهاء
          </span>
        </td>
           <td class="py-3">
          <div class="d-flex">
           <span onclick="upDate('${data[i]._id}')" class="btn btn-outline-info" font-size: 14.4px">
              <i class="fa-regular fa-pen-to-square"></i>
            </span>
           <span onclick="deletItem('${data[i]._id}')" class=" me-3 btn btn-outline-danger"  font-size: 14.4px">
             <i class="fa-solid fa-trash"></i>
            </span>
          </div>
        </td>
      </tr>
      `;
      } else {
        cartonaAll += `
      <tr>
        <th class="py-3" style="font-size: 0.9rem; font-weight: 700">
          <i
            class="fa-solid fa-id-card"
            style="
                                    border: 1px solid #e5e7eb;
                                    color: #1e40af;
                                    background-color: #78a3d9cb;
                                    border-radius: 0.375rem;
                                    padding: 0.375rem;
                                    font-size: 0.625rem;
                                  "
          ></i>
          ${data[i].title}
        </th>
        <td class="py-3" style="font-size: 0.7875rem; color: #64748b">
          ${data[i].documentId}
        </td>
        <td class="py-3" style="font-size: 0.75rem; font-weight: 700">
          ${new Date(data[i].expiryDate).toLocaleDateString()}
        </td>
        
        <td class="py-3" style="font-size: 0.675rem; font-weight: bold">
          <span
            style="
                                    color: #000;
                                    border: 1px solid #FAAFAF;
                                    background-color:#FAAFAF;
                                    padding: 2px 6px;
                                    border-radius: 6px;
                                  "
          >
           منتهي الصلاحية
          </span>
        </td>
           <td class="py-3">
          <div class="d-flex">
           <span onclick="upDate('${data[i]._id}')" class="btn btn-outline-info" font-size: 14.4px">
              <i class="fa-regular fa-pen-to-square"></i>
            </span>
           <span onclick="deletItem('${data[i]._id}')" class=" me-3 btn btn-outline-danger"  font-size: 14.4px">
             <i class="fa-solid fa-trash"></i>
            </span>
          </div>
        </td>
      </tr>
      `;
      }
    }
    // allData
    allData.innerHTML = cartonaAll;
    document.getElementById("koloFoter").innerHTML =
      ` عرض ${data.length} من أصل ${data.length} وثائق`;

    // validData
    let cartonaValid = ``;
    for (let i = 0; i < data.length; i++) {
      if (data[i].status === "valid") {
        cartonaValid += `
      <tr>
        <th class="py-3" style="font-size: 0.9rem; font-weight: 700">
          <i
            class="fa-solid fa-id-card"
            style="
                                    border: 1px solid #e5e7eb;
                                    color: #1e40af;
                                    background-color: #78a3d9cb;
                                    border-radius: 0.375rem;
                                    padding: 0.375rem;
                                    font-size: 0.625rem;
                                  "
          ></i>
          ${data[i].title}
        </th>
        <td class="py-3" style="font-size: 0.7875rem; color: #64748b">
          ${data[i].documentId}
        </td>
        <td class="py-3" style="font-size: 0.75rem; font-weight: 700">
          ${new Date(data[i].expiryDate).toLocaleDateString()}
        </td>
        
        <td class="py-3" style="font-size: 0.675rem; font-weight: bold">
          <span
            style="
                                    color: #000;
                                    border: 1px solid #10b981;
                                    background-color: #2ef7a6d7;
                                    padding: 2px 6px;
                                    border-radius: 6px;
                                  "
          >
            سارية
          </span>
        </td>
         <td class="py-3">
          <div class="d-flex">
           <span onclick="upDate('${data[i]._id}')" class="btn btn-outline-info" font-size: 14.4px">
              <i class="fa-regular fa-pen-to-square"></i>
            </span>
            <span onclick="deletItem('${data[i]._id}')" class=" me-3 btn btn-outline-danger"  font-size: 14.4px">
             <i class="fa-solid fa-trash"></i>
            </span>
          </div>
        </td>
      </tr>
      `;
      }
    }
    // validData
    validData.innerHTML = cartonaValid;
    const validCount = data.filter((doc) => doc.status === "valid").length; //علشان اجيب عدد الوثائق الساريه
    document.getElementById("validFoter").innerHTML =
      ` عرض ${validCount} من أصل ${data.length} وثائق`;

    // about_to_expire
    let cartonaAboutToExpire = ``;
    for (let i = 0; i < data.length; i++) {
      if (data[i].status === "about_to_expire") {
        cartonaAboutToExpire += `
      <tr>
        <th class="py-3" style="font-size: 0.9rem; font-weight: 700">
          <i
            class="fa-solid fa-id-card"
            style="
                                    border: 1px solid #e5e7eb;
                                    color: #1e40af;
                                    background-color: #78a3d9cb;
                                    border-radius: 0.375rem;
                                    padding: 0.375rem;
                                    font-size: 0.625rem;
                                  "
          ></i>
          ${data[i].title}
        </th>
        <td class="py-3" style="font-size: 0.7875rem; color: #64748b">
          ${data[i].documentId}
        </td>
        <td class="py-3" style="font-size: 0.75rem; font-weight: 700">
          ${new Date(data[i].expiryDate).toLocaleDateString()}
        </td>
        
        <td class="py-3" style="font-size: 0.675rem; font-weight: bold">
          <span
            style="
                                    color: #000;
                                    border: 1px solid #F2D7A8;
                                    background-color: #F2D7A8;
                                    padding: 2px 6px;
                                    border-radius: 6px;
                                  "
          >
            على وشك الانتهاء
          </span>
        </td>
           <td class="py-3">
          <div class="d-flex">
            <span onclick="upDate('${data[i]._id}')" class="btn btn-outline-info" font-size: 14.4px">
              <i class="fa-regular fa-pen-to-square"></i>
            </span>
           <span onclick="deletItem('${data[i]._id}')" class=" me-3 btn btn-outline-danger"  font-size: 14.4px">
             <i class="fa-solid fa-trash"></i>
            </span>
          </div>
        </td>
      </tr>
      `;
      }
    }
    // about_to_expire
    about_to_expireData.innerHTML = cartonaAboutToExpire;
    const about_to_expireCount = data.filter(
      (doc) => doc.status === "about_to_expire",
    ).length; //علشان اجيب عدد الوثائق قربت تنتهي
    document.getElementById("about_to_expireFoter").innerHTML =
      ` عرض ${about_to_expireCount} من أصل ${data.length} وثائق`;

    //expired
    let cartonaExpired = ``;
    for (let i = 0; i < data.length; i++) {
      if (data[i].status === "expired") {
        cartonaExpired += `
      <tr>
        <th class="py-3" style="font-size: 0.9rem; font-weight: 700">
          <i
            class="fa-solid fa-id-card"
            style="
                                    border: 1px solid #e5e7eb;
                                    color: #1e40af;
                                    background-color: #78a3d9cb;
                                    border-radius: 0.375rem;
                                    padding: 0.375rem;
                                    font-size: 0.625rem;
                                  "
          ></i>
          ${data[i].title}
        </th>
        <td class="py-3" style="font-size: 0.7875rem; color: #64748b">
          ${data[i].documentId}
        </td>
        <td class="py-3" style="font-size: 0.75rem; font-weight: 700">
          ${new Date(data[i].expiryDate).toLocaleDateString()}
        </td>
        
        <td class="py-3" style="font-size: 0.675rem; font-weight: bold">
          <span
            style="
                                    color: #000;
                                    border: 1px solid #FAAFAF;
                                    background-color:#FAAFAF;
                                    padding: 2px 6px;
                                    border-radius: 6px;
                                  "
          >
           منتهي الصلاحية
          </span>
        </td>
           <td class="py-3">
          <div class="d-flex">
            <span onclick="upDate('${data[i]._id}')" class="btn btn-outline-info" font-size: 14.4px">
              <i class="fa-regular fa-pen-to-square"></i>
            </span>
            <span onclick="deletItem('${data[i]._id}')" class=" me-3 btn btn-outline-danger"  font-size: 14.4px">
             <i class="fa-solid fa-trash"></i>
            </span>
          </div>
        </td>
      </tr>
      `;
      }
    }
    //expired
    expiredData.innerHTML = cartonaExpired;
    const expiredCount = data.filter((doc) => doc.status === "expired").length; //علشان اجيب عدد الوثائق قربت تنتهي
    document.getElementById("expiredFooter").innerHTML =
      ` عرض ${expiredCount} من أصل ${data.length} وثائق`;
  }

  loooder.classList.add("d-none"); //اخفاء looder
}

//* حذف عنصر
async function deletItem(id) {
  const api = await fetch(
    `https://graduation-backend-production-b53d.up.railway.app/api/v1/documents/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenUser}`,
      },
    },
  );
  let dat = await api.json();
  // console.log(dat);
  if (dat.success) {
    // console.log("Deleted successfully");
    Swal.fire({
      icon: "success",
      title: "تم حذف العنصر بنجاح",
      text: "",
      timer: 3000,
      showConfirmButton: false,
      buttonsStyling: false,
    });

    // إعادة تحميل البيانات بعد الحذف
    getData();
  }
}
//* تعديل العنصر

async function upDate(id) {
  // 1) نجيب العنصر الحالي من الداتا
  const item = allDocs.find((doc) => doc._id === id);
  if (!item) return; // لو مش موجود نخرج

  // 2) نفتح نافذة تعديل
  const { value } = await Swal.fire({
    title: "تعديل الوثيقة",

    // فورم بسيط فيه البيانات القديمة
    html: `
      <input id="title" class="swal2-input" value="${item.title}">
      <input id="docId" class="swal2-input" value="${item.documentId}">
      <input id="expiry" type="date" class="swal2-input" value="${item.expiryDate?.split("T")[0] || ""}">
    `,

    showCancelButton: true,
    confirmButtonText: "تحديث",
    cancelButtonText: "إلغاء",

    // 3) نتأكد إن كل حاجة متعبية
    preConfirm: () => {
      const title = document.getElementById("title").value.trim();
      const documentId = document.getElementById("docId").value.trim();
      const expiryDate = document.getElementById("expiry").value;

      if (!title || !documentId || !expiryDate) {
        Swal.showValidationMessage("كل الحقول مطلوبة");
        return false;
      }

      return { title, documentId, expiryDate };
    },
  });

  // لو المستخدم لغى
  if (!value) return;

  try {
    // 4) نظهر اللودر
    loooder.classList.remove("d-none");

    // 5) نبعت التعديل للسيرفر
    const res = await fetch(
      `https://graduation-backend-production-b53d.up.railway.app/api/v1/documents/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenUser}`,
        },
        body: JSON.stringify({
          title: value.title,
          documentId: value.documentId,
          expiryDate: new Date(value.expiryDate).toISOString(),
        }),
      },
    );

    const data = await res.json();

    // 6) نعرض النتيجة
    if (data.success) {
      Swal.fire("تم التحديث بنجاح", "", "success");
      getData(); // تحديث البيانات
    } else {
      Swal.fire("فشل التحديث", "", "error");
    }
  } catch (error) {
    console.error(error);
    Swal.fire("حصل خطأ", "", "error");
  } finally {
    // 7) نخفّي اللودر
    loooder.classList.add("d-none");
  }
}
//?=====>  validation   <====

//!=====>  call Function   <====
getData(); //اظهار البيانات

// ================== جلب الإشعارات من السيرفر ==================
async function getNotifications() {
  try {
    // طلب جلب الإشعارات من الـ API
    const res = await fetch(
      `https://graduation-backend-production-b53d.up.railway.app/api/v1/notifications?t=${Date.now()}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${tokenUser}`, // التوكن لتحديد المستخدم
          "Cache-Control": "no-cache", // منع الكاش
          Pragma: "no-cache",
        },
        cache: "no-store", // إجبار تحديث البيانات
      },
    );

    // تحويل الرد إلى JSON
    const dat = await res.json();

    // لو الطلب ناجح
    if (dat.success) {
      const notifications = dat?.data?.notifications || [];

      // فلترة الإشعارات غير المقروءة فقط
      const unread = notifications.filter((n) => !n.read);

      // إرسالها للعرض
      renderNotifications(unread);
    }
  } catch (err) {
    // في حالة حدوث خطأ
    console.error("Error loading notifications:", err);
  }
}

// ================== عرض الإشعارات في القائمة ==================
function renderNotifications(notifications) {
  const list = document.getElementById("notiList"); // قائمة الإشعارات
  const count = document.getElementById("notiCount"); // العداد

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

  // عرض كل إشعار
  notifications.forEach((n) => {
    list.innerHTML += `
      <li class="dropdown-item" style="cursor:pointer"
          onclick="markAsRead('${n._id}')">

        <!-- نص الإشعار -->
        ${n.message}

      </li>
    `;
  });

  // تحديث عدد الإشعارات غير المقروءة
  count.textContent = notifications.length;
}

// ================== تعليم الإشعار كمقروء ==================
async function markAsRead(id) {
  try {
    // إرسال طلب لتغيير حالة الإشعار إلى مقروء
    await fetch(
      `https://graduation-backend-production-b53d.up.railway.app/api/v1/notifications/${id}/read`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${tokenUser}`, // التحقق من المستخدم
        },
      },
    );

    // إعادة تحميل الإشعارات بعد التحديث
    getNotifications();
  } catch (err) {
    // في حالة خطأ
    console.error("Error marking as read:", err);
  }
}

// ================== تشغيل الإشعارات عند فتح الصفحة ==================
// أول ما الصفحة تفتح نجيب الإشعارات
getNotifications();
