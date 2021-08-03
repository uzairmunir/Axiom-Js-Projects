const filter = document.getElementById('filter');
const newsFeed = document.getElementById('news-feed-container');
const loader = document.getElementById('loader');

let page = 1;
let limit = 5;

const fetchPost = async () => {
  let res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );
  let data = await res.json();

  return data;
};

const renderPosts = async () => {
  const posts = await fetchPost();

  posts.forEach((post) => {
    const postDiv = document.createElement('div');
    postDiv.classList.add('post');
    postDiv.innerHTML = `
        <div class="post-id">
        <h2>${post.id}</h2>
      </div>
      <div class="post-content">
        <h3 class="title">${post.title}</h3>
        <p class="body">
         ${post.body}
        </p>
      </div>
        `;
    newsFeed.appendChild(postDiv);
  });
};
const showLoader = () => {
  loader.classList.add('show');
  page++;
  renderPosts();
  loader.classList.remove('show');
};
const filterPost = (e) => {
  let filterKeyword = e.target.value.toLowerCase();
  const posts = document.querySelectorAll('.post');
  posts.forEach((post) => {
    let title = document.querySelector('.title').innerText;
    let body = document.querySelector('.body').innerText;
    if (title.indexOf(filterKeyword) >= 0 || body.indexOf(filterKeyword) > 0) {
      post.style.display = 'flex';
    } else {
      post.style.display = 'none';
    }
  });
};

window.addEventListener('scroll', () => {
  // Destructuring properties from DOM
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 1) {
    showLoader();
  }
});
filter.addEventListener('input', filterPost);
renderPosts();
