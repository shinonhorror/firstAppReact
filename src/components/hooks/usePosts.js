import { useMemo } from "react";

export const useSortedPosts = (posts, sort) => {
  const sortedPost = useMemo(() => {
    if (sort) {
      return [...posts].sort((a, b) => a[sort].localeCompare(b[sort]));
    }
    return posts;
  }, [sort, posts]); // функция запускается при изменении способа сортировки/массива поcтов
  return sortedPost;
};

export const usePosts = (posts, sort, query) => {
  const sortedPost = useSortedPosts(posts, sort);
  const sortedAndSearchingPost = useMemo(() => {
    return sortedPost.filter((post) =>
      post.title.toLowerCase().includes(query)
    ); // Сортировка по поисковому запросу
  }, [query, sortedPost]); // функция запускается при изменении или поисковой строки/отсортированного массива

  return sortedAndSearchingPost;
};
