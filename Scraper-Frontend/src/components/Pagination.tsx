export default function Pagination({
  arrLen,
  setPageNumber,
  pageNumber,
}: {
  arrLen: number;
  setPageNumber: CallableFunction;
  pageNumber: number;
}) {
  return (
    <div className="grid grid-flow-col-dense gap-x-2 my-5 font-Oswald">
      {Array.from({ length: arrLen / 5 }, (_, i) => i + 1).map((elem) => {
        return (
          <div
            key={elem}
            className="border border-black w-full p-2 text-xs text-center cursor-pointer"
            style={{
              backgroundColor: pageNumber == elem - 1 ? "black" : "transparent",
              color: pageNumber == elem - 1 ? "white" : "black",
            }}
            onClick={() => {
              setPageNumber(elem - 1);
            }}
          >
            {elem}
          </div>
        );
      })}
    </div>
  );
}
