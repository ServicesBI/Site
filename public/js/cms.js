async function loadPageContent(slug) {
  const response = await fetch(`/content/pages/${slug}.md`);
  const text = await response.text();

  const [, frontmatter, body] = text.match(/---([\s\S]*?)---([\s\S]*)/);

  const titleMatch = frontmatter.match(/title:\s*(.*)/);
  const title = titleMatch ? titleMatch[1] : '';

  document.getElementById('page-title').innerText = title;
  document.getElementById('page-content').innerHTML = body.trim().replace(/\n/g, '<br>');
}

loadPageContent('home');
