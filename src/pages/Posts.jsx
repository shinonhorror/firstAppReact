import React, { useState, useEffect, useRef } from "react";
import PostList from "../components/PostList";
import PostFilter from "../components/PostFilter";
import MyButton from "../components/UI/button/MyButton";
import { usePosts } from "../components/hooks/usePosts";
import MyModal from "../components/UI/MyModal/MyModal";
import { useObserver } from "../components/hooks/useObserver";
import MySelect from "./../components/UI/select/MySelect";
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
  const lastElement = useRef();

  const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
    const response = await PostService.getAll(limit, page);
    // setPosts([...posts, ...response.data]);
    setPosts(response.data)
    const totalCount = response.headers["x-total-count"];
    setTotalPages(getPagesCount(totalCount, limit));
  });

  const createPost = (newPost) => {
    setPosts([...posts, newPost]); // создание поста (добавление поста в posts)
    setModal(false);
  };

  // useObserver(lastElement, page < totalPages, isPostsLoading, () =>
  //   setPage(page + 1)
  // );
  useEffect(() => {
    fetchPosts();
  }, [page, limit]); // в качестве объекта отслеживания пустой массив, чтобы функция вызвалась только один раз

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
      <MySelect
        value={limit}
        onChange={(value) => setLimit(value)}
        defaultValue="Количество элементов на странице"
        options={
          [{value: 5, name: "5"},
          {value: 10, name: "10"},
          {value: 25, name: "25"},
          {value: -1, name: "Показать все посты"},
        ]
        }
      />
      {postError && <h1>Произошла ошибка</h1>}
      <PostList
        remove={removePost}
        posts={sortedAndSearchingPost}
        title="Тестовые посты"
      />
      {/* <div ref={lastElement} style={{ height: "20px" }}></div> */}
      {isPostsLoading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "50px",
          }}
        >
          <Loader />
        </div>
      )}
      <Pagination page={page} totalPages={totalPages} changePage={changePage} />
    </div>
  );
}

export default Posts;
