import { useMemo } from "react";

export const useSort = (posts, sort) => {
    const sortedPost = useMemo( () => {
        if(sort === true) {
          return [...posts].sort( (a, b) => a.name.localeCompare(b.name));
        } else {
          return posts;
        }
    }, [sort, posts]);

    return sortedPost;
}
// 
export const useSearch = (posts, sort, search) => {
    const sortedPost = useSort(posts, sort);

    const sortedAndSearchedPost = useMemo(() => {
      return sortedPost.filter(post => post.name.toLowerCase().includes(search.toLowerCase()))
    }, [search, sortedPost]);

    return sortedAndSearchedPost;
}