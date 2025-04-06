const generateBtn = document.getElementById("generate");
const outputDiv = document.getElementById("output");
const promptInput = document.getElementById("prompt");

const HUGGINGFACE_API_TOKEN = ""; // your token here

generateBtn.addEventListener("click", async () => {
  const prompt = promptInput.value.trim();
  if (!prompt) return alert("Please enter a prompt");

  outputDiv.innerHTML = "Generating...";

  try {
    const response = await fetch("https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${HUGGINGFACE_API_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        inputs: prompt
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${errorText}`);
    }

    const blob = await response.blob();
    const imageUrl = URL.createObjectURL(blob);

    outputDiv.innerHTML = `
      <img src="${imageUrl}" alt="Generated Avatar" width="512" />
      <a href="${imageUrl}" download="avatar.png">Download Avatar</a>
    `;
  } catch (err) {
    outputDiv.innerHTML = "Error: " + err.message;
    console.error(err);
  }
});
