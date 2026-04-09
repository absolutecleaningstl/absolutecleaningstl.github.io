const page = document.body.dataset.page;

document.querySelectorAll(".nav-link").forEach((link) => {
  const href = link.getAttribute("href");
  if (
    (page === "home" && href === "./index.html") ||
    (page === "services" && href === "./services.html") ||
    (page === "about" && href === "./about.html") ||
    (page === "gallery" && href === "./gallery.html")
  ) {
    link.classList.add("active");
  }
});

const quoteForm = document.getElementById("quote-form");

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "absolute";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();

    try {
      document.execCommand("copy");
      document.body.removeChild(textarea);
      return true;
    } catch (fallbackError) {
      document.body.removeChild(textarea);
      return false;
    }
  }
}

if (quoteForm) {
  const quoteFormMessage = document.getElementById("quote-form-message");
  const quoteFormHelp = document.getElementById("quote-form-help");
  const serviceOptions = quoteForm.querySelectorAll(".service-option");

  serviceOptions.forEach((option) => {
    const checkbox = option.querySelector('input[type="checkbox"]');

    const syncState = () => {
      option.classList.toggle("selected", checkbox.checked);
    };

    checkbox.addEventListener("change", syncState);
    syncState();
  });

  quoteForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(quoteForm);
    const name = String(formData.get("name") || "").trim();
    const address = String(formData.get("address") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const details = String(formData.get("details") || "").trim();
    const services = formData.getAll("services").map((value) => String(value).trim()).filter(Boolean);

    if (!name || !address) {
      quoteFormMessage.textContent = "Please add your name and address.";
      quoteFormHelp.textContent = "";
      quoteFormHelp.classList.add("hidden");
      return;
    }

    if (services.length === 0) {
      quoteFormMessage.textContent = "Please choose at least one service.";
      quoteFormHelp.textContent = "";
      quoteFormHelp.classList.add("hidden");
      return;
    }

    if (!phone) {
      quoteFormMessage.textContent = "Please include a phone number so you can receive a reply.";
      quoteFormHelp.textContent = "";
      quoteFormHelp.classList.add("hidden");
      return;
    }

    quoteFormMessage.textContent = "";
    quoteFormHelp.textContent = "";
    quoteFormHelp.classList.add("hidden");

    const lines = [
      "New quote request",
      "",
      `Name: ${name}`,
      `Address: ${address}`,
      `Phone: ${phone || "Not provided"}`,
      `Email: ${email || "Not provided"}`,
      `Services: ${services.join(", ")}`,
    ];

    if (details) {
      lines.push(`Details: ${details}`);
    }

    const messageText = lines.join("\n");
    const body = encodeURIComponent(messageText);
    const isMac = /Mac|Macintosh/.test(navigator.userAgent);

    if (isMac) {
      const copied = await copyText(messageText);
      quoteFormHelp.textContent = copied
        ? "Messages is opening now. If the text does not appear automatically, create a new text to (314) 452-8355 and press Cmd+V to paste your quote request."
        : "Messages is opening now. If the text does not appear automatically, create a new text to (314) 452-8355 and paste your quote request manually.";
      quoteFormHelp.classList.remove("hidden");
      window.location.href = "sms:+13144528355";
      return;
    }

    window.location.href = `sms:+13144528355?body=${body}`;
  });
}
