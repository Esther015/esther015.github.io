// Elements
const openBtn = document.getElementById("openFormBtn");
const closeBtn = document.getElementById("closeBtn");
const overlay = document.getElementById("modalOverlay");
const form = document.getElementById("contactForm");
const statusMsg = document.getElementById("statusMsg");

// Show popup
openBtn.onclick = () => {
    overlay.style.display = "flex";
    history.pushState({ formOpen: true }, "", "#contact");
};

// Hide popup
closeBtn.onclick = closeForm;
function closeForm() {
    overlay.style.display = "none";
    if (location.hash === "#contact") history.back();
}

// Close by clicking outside
overlay.onclick = (e) => {
    if (e.target === overlay) closeForm();
};

// Browser back button
window.onpopstate = (e) => {
    if (!e.state || !e.state.formOpen) overlay.style.display = "none";
};

// Save to localStorage
form.addEventListener("input", () => {
    const data = Object.fromEntries(new FormData(form));
    localStorage.setItem("savedContactForm", JSON.stringify(data));
});

// Restore saved data
window.onload = () => {
    const saved = JSON.parse(localStorage.getItem("savedContactForm") || "{}");
    for (let key in saved) {
        if (form[key]) {
            if (form[key].type === "checkbox") {
                form[key].checked = saved[key] === "on";
            } else {
                form[key].value = saved[key];
            }
        }
    }
};

// Submit form via AJAX
form.onsubmit = async (e) => {
    e.preventDefault();
    statusMsg.textContent = "Отправка...";

    const formData = new FormData(form);

    try {
        const res = await fetch("https://formcarry.com/s/LvZFpDJW8NI", {
            method: "POST",
            headers: { "Accept": "application/json" },
            body: formData
        });

        if (res.ok) {
            statusMsg.textContent = "Сообщение успешно отправлено!";
            localStorage.removeItem("savedContactForm");
            form.reset();
        } else {
            const err = await res.json();
            statusMsg.textContent = "Ошибка: " + (err.message || "Ошибка сервера");
        }
    } catch {
        statusMsg.textContent = "Ошибка соединения.";
    }
};
