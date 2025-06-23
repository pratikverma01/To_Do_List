const apiKey = "41ff6483e2f9e92400f27bc2588e0ba9"; // Replace with your GNews API key
const url = `https://gnews.io/api/v4/top-headlines?lang=en&max=10&token=${apiKey}`;

async function fetchNews() {
  const container = document.getElementById("news-container");
  container.innerHTML = "Loading...";

  try {
    const response = await fetch(url);
    const data = await response.json();

    console.log("API URL:", url);
    console.log("Full response:", data);

    if (!data.articles || data.articles.length === 0) {
      container.innerHTML = "<p>No news found.</p>";
      return;
    }

    container.innerHTML = ""; // Clear loading

    data.articles.forEach(article => {
      const div = document.createElement("div");
      div.className = "article";
      div.innerHTML = `
        <img src="${article.image || 'https://via.placeholder.com/300'}" />
        <h2>${article.title}</h2>
        <p>${article.description || "No description available"}</p>
        <a href="${article.url}" target="_blank">Read more</a>
      `;
      container.appendChild(div);
    });

  } catch (err) {
    container.innerHTML = `<p style="color:red;">Failed to fetch news: ${err.message}</p>`;
    console.error("Error fetching news:", err);
  }
}

fetchNews();
