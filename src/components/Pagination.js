import React from "react";

export default function Pagination({ setSkip, page, setPage }) {
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
      <p className="page">{page}</p>

      <button
        onClick={() => {
          setPage((page += 1));
          setSkip((page - 1) * 100);
        }}
      >
        Suivant
      </button>
    </div>
  );
}
