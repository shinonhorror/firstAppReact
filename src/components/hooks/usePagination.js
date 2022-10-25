import { useMemo } from "react";

export const usePagination = (totalPages) => {
  const pagesArray = useMemo(() => {
    let result = [];
    for (let i = 0; i < totalPages; i++) {
      result.push(i + 1);
    }
    return result; // Сортировка по поисковому запросу
  }, [totalPages]); // функция запускается при изменении общего кол-ва постов

  return pagesArray;
};
