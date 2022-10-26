import React, { useState, useEffect } from "react";
import PostList from "../components/PostList";
import PostFilter from "../components/PostFilter";
import MyButton from "../components/UI/button/MyButton";
import { usePosts } from "../components/hooks/usePosts";
import MyModal from "../components/UI/MyModal/MyModal";
import PostForm from "../components/PostForm";
import PostService from "../API/PostService";
import Pagination from "../components/UI/pagination/Pagination";
import Loader from "../components/UI/loader/Loader";
import { useFetching } from "../components/hooks/useFetching";
import { getPagesCount } from "../utils/pages";

import "../styles/app.css";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({
    sort: "",
    query: "",
  });
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const sortedAndSearchingPost = usePosts(posts, filter.sort, filter.query);

  const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
    const response = await PostService.getAll(limit, page);
    setPosts(response.data);
    const totalCount = response.headers["x-total-count"];
    setTotalPages(getPagesCount(totalCount, limit));
  });

  const createPost = (newPost) => {
    setPosts([...posts, newPost]); // создание поста (добавление поста в posts)
    setModal(false);
  };

  useEffect(() => {
    fetchPosts();
  }, [page]); // в качестве объекта отслеживания пустой массив, чтобы функция вызвалась только один раз

  useEffect(() => {
    fetchPosts();
  }, []); // в качестве объекта отслеживания пустой массив, чтобы функция вызвалась только один раз

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id)); // удаление поста по его id
  };

  const changePage = (page) => {
    setPage(page);
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
      <Pagination page={page} totalPages={totalPages} changePage={changePage} />
    </div>
  );
}

export default Posts;
