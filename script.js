async function generatePrompt() {
  const idea = document.getElementById("idea").value;
  const language = document.getElementById("language").value;
  const style = document.getElementById("style").value;

  const response = await fetch("/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idea, language, style })
  });

  const data = await response.json();
  document.getElementById("output").textContent = data.prompt || "Gagal menghasilkan prompt.";
}

function copyPrompt() {
  const output = document.getElementById("output").textContent;
  navigator.clipboard.writeText(output);
  alert("Prompt disalin!");
}
