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

// ================== جلب الإشعارات ==================
async function getNotifications() {
  loooder.classList.remove("d-none"); //اظهار looder

  try {
    const res = await fetch(
      "https://graduation-backend-production-b53d.up.railway.app/api/v1/notifications",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${tokenUser}`,
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
        cache: "no-store",
      },
    );

    const data = await res.json();

    if (data.success) {
      const notifications = data?.data?.notifications || [];

      renderNotifications(notifications);
      updateNearestAlert(notifications);
    }
  } catch (err) {
    console.error(err);
  }
  loooder.classList.add("d-none"); //اخفاء looder
}

// ================== عرض الإشعارات ==================
function renderNotifications(notifications) {
  loooder.classList.remove("d-none"); //اظهار looder

  const container = document.getElementById("notiTimeline");
  const count = document.getElementById("notiCount");

  // حماية من null
  if (!container) return;

  container.innerHTML = "";

  if (!notifications.length) {
    container.innerHTML = `<p class="text-center text-muted">لا يوجد إشعارات</p>`;

    if (count) count.textContent = 0;
    return;
  }

  for (let i = 0; i < notifications.length; i++) {
    const n = notifications[i];

    const date = new Date(n.createdAt || n.date);

    let icon = "fa-info";
    let color = "primary";
    let badge = "مقروء";

    if (n.type === "success") {
      icon = "fa-check";
      color = "success";
      badge = "تم التسليم";
    } else if (n.type === "warning") {
      icon = "fa-bell";
      color = "warning";
      badge = "مرسل";
    }

    container.innerHTML += `
      <div class="timeline-item d-flex align-items-start mb-4">

        <div class="status-dot-right bg-${color}-subtle border-${color} text-${color}">
          <i class="fa-solid ${icon}"></i>
        </div>

        <div class="text-end flex-grow-1 pe-2">
          <h6 class="fw-bold mb-1">${n.title || "إشعار"}</h6>
          <p class="text-muted mb-2 small">${n.message}</p>

          <span class="badge-status bg-${color}-subtle text-${color} rounded-pill px-2 pb-1">
            ${badge}
          </span>
        </div>

        <span class="text-muted time-label-left">
          ${timeAgo(date)}
        </span>

      </div>
    `;
  }

  // حماية العداد
  if (count) {
    count.textContent = notifications.length;
  }
}

// ================== أقرب تنبيه ==================
function updateNearestAlert(notifications) {
  const el = document.getElementById("nearestAlert");

  if (!el) return;

  if (!notifications.length) {
    el.textContent = "لا يوجد تنبيهات";
    return;
  }

  let nearest = null;

  for (let i = 0; i < notifications.length; i++) {
    const date = new Date(notifications[i].createdAt || notifications[i].date);

    if (!nearest || date < nearest) {
      nearest = date;
    }
  }

  const diffDays = Math.ceil((nearest - new Date()) / (1000 * 60 * 60 * 24));

  el.textContent =
    diffDays > 0 ? `بعد ${diffDays} يوم` : diffDays === 0 ? "اليوم" : "منتهي";
  loooder.classList.add("d-none"); //اخفاء looder
}

// ================== وقت النسبي ==================
function timeAgo(date) {
  loooder.classList.remove("d-none"); //اظهار looder

  const diff = Math.floor((new Date() - date) / 1000);

  if (diff < 60) return "منذ لحظات";
  if (diff < 3600) return `منذ ${Math.floor(diff / 60)} دقيقة`;
  if (diff < 86400) return `منذ ${Math.floor(diff / 3600)} ساعة`;
  return `منذ ${Math.floor(diff / 86400)} يوم`;
  loooder.classList.add("d-none"); //اخفاء looder
}

// ================== تشغيل ==================
document.addEventListener("DOMContentLoaded", () => {
  getNotifications();
});
//?=====>  validation   <====
