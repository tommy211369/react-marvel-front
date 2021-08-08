import React from "react";

export default function PaginationComics({
  setSkip,
  page,
  setPage,
  comicsTotal,
  limit,
}) {
  const pagesComicsTab = [];
  let updateComicsPages = comicsTotal / 100;
  for (let i = 1; i <= Math.ceil(updateComicsPages); i++) {
    pagesComicsTab.push(i);
  }

  return (
    <div className="pagination">
      {page > 1 && (
        <button
          onClick={() => {
            setPage((page -= 1));
            setSkip((page - 1) * 100);
          }}
        >
          Precedent
        </button>
      )}

      <select
        className="select-page"
        value={page}
        onChange={(e) => {
          setPage(Number(e.target.value));
          setSkip(Number(e.target.value - 1) * 100);
        }}
      >
        {pagesComicsTab.map((elemPage, index) => {
          return (
            <option key={index} value={elemPage}>
              {elemPage}
            </option>
          );
        })}
      </select>

      {limit < comicsTotal && (
        <button
          onClick={() => {
            setPage((page += 1));
            setSkip((page - 1) * 100);
          }}
        >
          Suivant
        </button>
      )}
    </div>
  );
}
