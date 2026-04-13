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
  const quoteActionButtons = quoteForm.querySelectorAll("[data-quote-action]");

  serviceOptions.forEach((option) => {
    const checkbox = option.querySelector('input[type="checkbox"]');

    const syncState = () => {
      option.classList.toggle("selected", checkbox.checked);
    };

    checkbox.addEventListener("change", syncState);
    syncState();
  });

  const prepareQuoteRequest = () => {
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
      return null;
    }

    if (services.length === 0) {
      quoteFormMessage.textContent = "Please choose at least one service.";
      quoteFormHelp.textContent = "";
      quoteFormHelp.classList.add("hidden");
      return null;
    }

    if (!phone) {
      quoteFormMessage.textContent = "Please include a phone number so you can receive a reply.";
      quoteFormHelp.textContent = "";
      quoteFormHelp.classList.add("hidden");
      return null;
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

    return lines.join("\n");
  };

  const openQuoteRequest = async (channel) => {
    const messageText = prepareQuoteRequest();

    if (!messageText) {
      return;
    }

    const copied = await copyText(messageText);
    quoteFormHelp.textContent = copied
      ? "Your app is opening now. If the details do not appear automatically, press Ctrl + V to paste your quote request, then hit send."
      : "Your app is opening now. If the details do not appear automatically, paste your quote request manually, then hit send.";
    quoteFormHelp.classList.remove("hidden");

    const body = encodeURIComponent(messageText);

    if (channel === "email") {
      const subject = encodeURIComponent("Quote Request");
      window.location.href = `mailto:absolutecleaningstl@gmail.com?subject=${subject}&body=${body}`;
      return;
    }

    const isMac = /Mac|Macintosh/.test(navigator.userAgent);
    window.location.href = isMac ? "sms:+13144528355" : `sms:+13144528355?body=${body}`;
  };

  quoteActionButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const channel = button.dataset.quoteAction;
      await openQuoteRequest(channel);
    });
  });
}
