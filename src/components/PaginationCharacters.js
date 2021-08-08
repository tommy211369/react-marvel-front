import React, { Fragment } from "react";

export default function PaginationCharacters({
  setSkip,
  page,
  setPage,
  characters,
  charactersTotal,
  limit,
}) {
  const pagesCharactersTab = [];
  let updateCharactersPages = charactersTotal / 100;
  for (let i = 1; i <= Math.ceil(updateCharactersPages); i++) {
    pagesCharactersTab.push(i);
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
        {pagesCharactersTab.map((elemPage, index) => {
          return (
            <option key={index} value={elemPage}>
              {elemPage}
            </option>
          );
        })}
      </select>

      {limit < charactersTotal && (
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
