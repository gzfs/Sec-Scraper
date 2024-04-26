import axios from "axios";
import { SVGProps, useState } from "react";

export function MaterialSymbolsLightSearchRounded(
  props: SVGProps<SVGSVGElement>
) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M9.538 15.23q-2.398 0-4.064-1.666T3.808 9.5t1.666-4.064t4.064-1.667t4.065 1.667T15.269 9.5q0 1.042-.369 2.017t-.97 1.668l5.908 5.907q.14.14.15.345t-.15.363t-.353.16t-.354-.16l-5.908-5.908q-.75.639-1.725.989t-1.96.35m0-1q1.99 0 3.361-1.37t1.37-3.361t-1.37-3.36t-3.36-1.37t-3.361 1.37t-1.37 3.36t1.37 3.36t3.36 1.37"
      ></path>
    </svg>
  );
}

export function MaterialSymbolsLightSync(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M4.654 19.346v-1H7.75l-1.054-1.042q-1.148-1.148-1.672-2.49q-.524-1.34-.524-2.726q0-2.41 1.374-4.36T9.5 4.942v1.062q-1.82.765-2.91 2.424t-1.09 3.66q0 1.222.463 2.37q.464 1.15 1.44 2.127l1.02 1.019v-3.027h1v4.77zm9.846-.288v-1.062q1.82-.765 2.91-2.424t1.09-3.66q0-1.222-.463-2.37q-.464-1.15-1.44-2.127l-1.02-1.019v3.027h-1v-4.77h4.77v1H16.25l1.054 1.043q1.148 1.148 1.672 2.49q.524 1.34.524 2.726q0 2.41-1.374 4.36T14.5 19.058"
      ></path>
    </svg>
  );
}

export default function SearchBar({
  setInitialContent,
}: {
  setInitialContent: CallableFunction;
}) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  return (
    <div className="grid grid-cols-10 mb-3 gap-2">
      <input
        className="w-full p-3 outline-none border border-black font-Oswald col-span-8 sm:col-span-9"
        placeholder="Search"
        onChange={async (eV) => {
          const fetchedArticles = await axios.get(
            `http://localhost:8000/search?query=${eV.target.value}`
          );
          setInitialContent(fetchedArticles.data);

          if (eV.target.value.length == 0) {
            const fetchedArticles = await axios.get(`http://localhost:8000/`);
            setInitialContent(fetchedArticles.data);
          }
        }}
      ></input>
      <button
        disabled={isRefreshing}
        className={`col-span-2 sm:col-span-1 bg-black flex items-center justify-center`}
        onClick={async () => {
          setIsRefreshing(true);
          await axios.post("http://localhost:8000/refresh");
          const fetchedArticles = await axios.get(`http://localhost:8000/`);
          setInitialContent(fetchedArticles.data);
          setIsRefreshing(false);
        }}
      >
        <MaterialSymbolsLightSync
          className={`text-white text-3xl ${
            isRefreshing ? "animate-spin" : ""
          }`}
        />
      </button>
    </div>
  );
}
