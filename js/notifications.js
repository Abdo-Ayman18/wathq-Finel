document.addEventListener("DOMContentLoaded", () => {
  const notiList = document.getElementById("notiList");
  const notiCount = document.getElementById("notiCount");
  const bellBtn = document.querySelector('[data-bs-toggle="dropdown"]');
  const tokenUser = localStorage.getItem("tokenUser");

  // ================== لما المستخدم يفتح الجرس ==================
  bellBtn.addEventListener("show.bs.dropdown", async () => {
    const notifications = await getNotifications();
    renderDropdownNotifications(notifications);
    updateUnreadCount(notifications);
  });

  // ================== جلب الإشعارات من السيرفر ==================
  async function getNotifications() {
    try {
      const res = await fetch(
        "https://graduation-backend-production-b53d.up.railway.app/api/v1/notifications",
        {
          headers: { Authorization: `Bearer ${tokenUser}` },
        },
      );

      const data = await res.json();

      if (data.success) {
        return data?.data?.notifications || [];
      }

      return [];
    } catch (err) {
      console.error("Failed to fetch notifications", err);
      return [];
    }
  }

  // ================== عرض الإشعارات داخل الـ dropdown ==================
  function renderDropdownNotifications(notifications) {
    notiList.innerHTML = "";

    if (!notifications.length) {
      notiList.innerHTML = `
        <li class="dropdown-item text-center text-muted">
          لا يوجد إشعارات
        </li>`;
      return;
    }

    notifications.forEach((n) => {
      const li = document.createElement("li");

      li.className =
        "dropdown-item border-bottom py-2 " +
        (n.isRead ? "" : "bg-light fw-bold");

      li.style.cursor = "pointer";

      li.innerHTML = `
        <div>${n.title}</div>
        <div class="small text-muted">${n.message}</div>
      `;

      li.addEventListener("click", async () => {
        if (!n.isRead) {
          await markAsRead(n._id);
          n.isRead = true;

          li.classList.remove("bg-light", "fw-bold");
          const current = parseInt(notiCount.textContent || "0", 10) - 1;
          updateBadge(current);
        }
      });

      notiList.appendChild(li);
    });
  }

  // ================== تعليم الإشعار كمقروء ==================
  async function markAsRead(id) {
    try {
      await fetch(
        `https://graduation-backend-production-b53d.up.railway.app/api/v1/notifications/${id}/read`,
        {
          method: "PATCH",
          headers: { Authorization: `Bearer ${tokenUser}` },
        },
      );
    } catch (err) {
      console.error("Failed to mark as read", err);
    }
  }

  // ================== تحديث العداد ==================
  function updateUnreadCount(notifications) {
    const unread = notifications.filter((n) => !n.isRead).length;
    updateBadge(unread);
  }

  function updateBadge(count) {
    notiCount.textContent = count;

    if (count <= 0) {
      notiCount.classList.add("d-none");
    } else {
      notiCount.classList.remove("d-none");
    }
  }
});
