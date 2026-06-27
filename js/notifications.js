document.addEventListener("DOMContentLoaded", () => {
  const notiList = document.getElementById("notiList");
  const notiCount = document.getElementById("notiCount");
  const notiTimeline = document.getElementById("notiTimeline");
  const bellBtn = document.querySelector('[data-bs-toggle="dropdown"]');
  const tokenUser = localStorage.getItem("tokenUser");

  // ================== لما المستخدم يفتح الجرس ==================
  if (bellBtn) {
    bellBtn.addEventListener("show.bs.dropdown", async () => {
      const notifications = await getNotifications();
      renderDropdownNotifications(notifications);
      updateUnreadCount(notifications);
    });
  }

  // ================== تحميل الإشعارات عند فتح صفحة Notifications ==================
  (async () => {
    if (!notiTimeline) return;

    const notifications = await getNotifications();
    renderTimelineNotifications(notifications);
  })();

  // ================== جلب الإشعارات من السيرفر ==================
  async function getNotifications() {
    try {
      const res = await fetch(
        "https://graduation-backend-production-88eb.up.railway.app/api/v1/notifications",
        {
          headers: {
            Authorization: `Bearer ${tokenUser}`,
          },
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
    if (!notiList) return;

    notiList.innerHTML = "";

    if (!notifications.length) {
      notiList.innerHTML = `
        <li class="dropdown-item text-center text-muted">
          لا يوجد إشعارات
        </li>
      `;
      return;
    }

    notifications.forEach((n) => {
      const li = document.createElement("li");

      li.className =
        "dropdown-item border-bottom py-2 " +
        (n.isRead ? "" : "bg-light fw-bold");

      li.style.cursor = "pointer";

      li.innerHTML = `
        <div class="small text-muted">${n.message}</div>
      `;

      li.addEventListener("click", async () => {
        if (!n.isRead) {
          await markAsRead(n._id);
          n.isRead = true;

          li.classList.remove("bg-light", "fw-bold");

          const current = Math.max(
            (parseInt(notiCount.textContent, 10) || 0) - 1,
            0,
          );

          updateBadge(current);
        }
      });

      notiList.appendChild(li);
    });
  }

  // ================== عرض الإشعارات داخل صفحة Notifications ==================
  function renderTimelineNotifications(notifications) {
    if (!notiTimeline) return;

    notiTimeline.innerHTML = "";

    if (!notifications.length) {
      notiTimeline.innerHTML = `
        <div class="text-center text-muted py-3">
          لا يوجد إشعارات
        </div>
      `;
      return;
    }

    notifications.forEach((n) => {
      const item = document.createElement("div");

      item.className =
        "border rounded p-3 mb-3 " + (n.isRead ? "" : "bg-light fw-bold");

      item.style.cursor = "pointer";

      item.innerHTML = `
        <div>${n.message}</div>
        <small class="text-muted">
          ${new Date(n.createdAt).toLocaleString("ar-EG")}
        </small>
      `;

      item.addEventListener("click", async () => {
        if (!n.isRead) {
          await markAsRead(n._id);
          n.isRead = true;

          item.classList.remove("bg-light", "fw-bold");
        }
      });

      notiTimeline.appendChild(item);
    });
  }

  // ================== تعليم الإشعار كمقروء ==================
  async function markAsRead(id) {
    try {
      await fetch(
        `https://graduation-backend-production-88eb.up.railway.app/api/v1/notifications/${id}/read`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${tokenUser}`,
          },
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
    if (!notiCount) return;

    notiCount.textContent = count;

    if (count <= 0) {
      notiCount.classList.add("d-none");
    } else {
      notiCount.classList.remove("d-none");
    }
  }
});
