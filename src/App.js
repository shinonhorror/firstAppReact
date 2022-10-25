import React, { useState, useMemo } from "react";
import PostList from "./components/PostList";
import PostFilter from "./components/PostFilter";
import MyButton from "./components/UI/button/MyButton";
import { usePosts } from "./components/hooks/usePosts";
import MyModal from "./components/UI/MyModal/MyModal";
import PostForm from "./components/PostForm";
import axios from 'axios';
import "./styles/app.css";

function App() {
  const [posts, setPosts] = useState([]);

  const [filter, setFilter] = useState({
    sort: "",
    query: "",
  });

  const [modal, setModal] = useState(false);

  const sortedAndSearchingPost = usePosts(posts, filter.sort, filter.query);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]); // создание поста (добавление поста в posts)
    setModal(false);
  };

  async function fetchPosts() {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
    setPosts(response.data)
  }
  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id)); // удаление поста по его id
  };

  return (
    <div className="App">
      <button onClick={fetchPosts}>GET POSTS</button>
      <MyButton style={{ marginTop: "15px" }} onClick={() => setModal(true)}>
        Создать пост
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <PostFilter filter={filter} setFilter={setFilter} />
      <PostList
        remove={removePost}
        posts={sortedAndSearchingPost}
        title="Список постов 1"
      />
    </div>
  );
}

export default App;
