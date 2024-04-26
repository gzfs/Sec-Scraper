import axios from "axios";
import SearchBar from "./components/SearchBar";
import { useEffect, useState } from "react";
import { Post } from "./types/Post.types";
import PostBox from "./components/Post";
import Pagination from "./components/Pagination";

function App() {
  const [initialContent, setInitialContent] = useState<Post[]>();
  const [pageNumber, setPageNumber] = useState<number>(0);
  useEffect(() => {
    if (!initialContent) {
      axios.get("http://localhost:8000/").then(function (resp) {
        setInitialContent(resp.data);
      });
    }
  }, []);

  return (
    <main className="max-w-[330px] md:max-w-[500px] m-auto">
      <h1 className="font-Oswald font-bold text-[80px] text-center">
        <span className="text-red-700">SEC</span>
        <span> NEWS</span>
      </h1>
      <SearchBar setInitialContent={setInitialContent} />
      {initialContent && (
        <div className="grid gap-y-4">
          {initialContent &&
            initialContent
              .slice(pageNumber * 5, pageNumber * 5 + 5)
              .map((initalPost: Post) => {
                return (
                  <PostBox
                    key={initalPost._id}
                    postDate={initalPost._source.date_modified}
                    postDesc={initalPost._source.content}
                    postTitle={initalPost._source.title}
                  />
                );
              })}
        </div>
      )}
      {initialContent && (
        <Pagination
          pageNumber={pageNumber}
          arrLen={initialContent?.length}
          setPageNumber={setPageNumber}
        />
      )}
    </main>
  );
}

export default App;
