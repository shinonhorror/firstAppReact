import React, { useState, useEffect } from "react";
import PostList from "./components/PostList";
import PostFilter from "./components/PostFilter";
import MyButton from "./components/UI/button/MyButton";
import { usePosts } from "./components/hooks/usePosts";
import MyModal from "./components/UI/MyModal/MyModal";
import PostForm from "./components/PostForm";
import PostService from "./API/PostService";
import Loader from "./components/UI/loader/Loader";
import { useFetching } from "./components/hooks/useFetching";
import "./styles/app.css";

function App() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({
    sort: "",
    query: "",
  });
  const [modal, setModal] = useState(false);
  const sortedAndSearchingPost = usePosts(posts, filter.sort, filter.query);
  const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
    const posts = await PostService.getAll();
    setPosts(posts);
  });
  const createPost = (newPost) => {
    setPosts([...posts, newPost]); // создание поста (добавление поста в posts)
    setModal(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []); // в качестве объекта отслеживания пустой массив, чтобы функция вызвалась только один раз

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id)); // удаление поста по его id
  };

  return (
    <div className="App">
      <MyButton style={{ marginTop: "15px" }} onClick={() => setModal(true)}>
        Создать пост
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <PostFilter filter={filter} setFilter={setFilter} />
      {postError && <h1>Произошла ошибка</h1>}
      {isPostsLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "50px",
          }}
        >
          <Loader />
        </div>
      ) : (
        <PostList
          remove={removePost}
          posts={sortedAndSearchingPost}
          title="Список постов 1"
        />
      )}
    </div>
  );
}

export default App;
