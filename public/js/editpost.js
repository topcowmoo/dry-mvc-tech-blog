const editHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#title').value.trim();
  const editPost = document.querySelector('#edit-post').value.trim();
  const postId = document.querySelector('#new-post-id').dataset.postid;
  console.log(postId);

  console.log(postId);
  if (editPost) {
    const response = await fetch(`/api/posts/${postId}`, {
      method: 'PUT',
      body: JSON.stringify({ title, editPost }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      document.location.replace('/error');
    }
  }
};

document.querySelector('#new-post-id').addEventListener('submit', editHandler);
