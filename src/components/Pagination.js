import React from "react";

export default function Pagination({ setSkip, page, setPage }) {
  return (
    <div>
      {page > 1 && (
        <button
          onClick={() => {
            setPage((page -= 1));
            setSkip((page - 1) * 20);
          }}
        >
          Précédent
        </button>
      )}
      <p style={{ color: "white" }}>{page}</p>

      <button
        onClick={() => {
          setPage((page += 1));
          setSkip((page - 1) * 20);
        }}
      >
        Suivant
      </button>
    </div>
  );
}
