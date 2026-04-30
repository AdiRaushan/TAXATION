/* blog js wordpress  */
const API_URL = "http://my-taxation.local:10004";

async function loadPosts() {
  const container = document.getElementById("blog-container");

  // important: run only on blog page
  if (!container) return;

  const res = await fetch(`${API_URL}/wp-json/wp/v2/posts?_embed`);
  const posts = await res.json();

  posts.forEach((post) => {
    const image = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "";

    container.innerHTML += `
      <div class="bg-white shadow rounded-xl overflow-hidden">
        ${image ? `<img src="${image}" class="w-full h-48 object-cover">` : ""}
        <div class="p-4">
          <h2 class="text-lg font-semibold">${post.title.rendered}</h2>
          <div class="text-sm text-gray-600 mt-2">${post.excerpt.rendered}</div>
          <a href="post.html?id=${post.id}" class="text-blue-500 mt-3 inline-block">Read More</a>
        </div>
      </div>
    `;
  });
}

loadPosts();
