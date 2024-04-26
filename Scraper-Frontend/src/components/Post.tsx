import { SVGProps, useState } from "react";

export function MaterialSymbolsDateRangeSharp(props: SVGProps<SVGSVGElement>) {
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
        d="M8 14q-.425 0-.712-.288T7 13t.288-.712T8 12t.713.288T9 13t-.288.713T8 14m4 0q-.425 0-.712-.288T11 13t.288-.712T12 12t.713.288T13 13t-.288.713T12 14m4 0q-.425 0-.712-.288T15 13t.288-.712T16 12t.713.288T17 13t-.288.713T16 14M3 22V4h3V2h2v2h8V2h2v2h3v18zm2-2h14V10H5z"
      ></path>
    </svg>
  );
}

export default function PostBox({
  postTitle,
  postDate,
  postDesc,
}: {
  postTitle: string;
  postDate: string;
  postDesc: string;
}) {
  const [postOpened, setPostOpened] = useState(false);
  return (
    <div
      className="w-full font-Oswald  border border-black p-3 transition-all"
      onClick={() => {
        setPostOpened(!postOpened);
      }}
    >
      <p className="text-3xl">{postTitle}</p>
      <p className="font-Outfit font-light my-2 text-justify">
        {postOpened ? postDesc : postDesc.split(".")[0]}.
      </p>
      <p className="flex items-center">
        <MaterialSymbolsDateRangeSharp className="mr-2 text-xl" /> {postDate}
      </p>
    </div>
  );
}
