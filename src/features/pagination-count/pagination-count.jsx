import React from "react";
import { Button } from "@mui/material";
import { RandomKey } from "../../utils/helpers";

function PaginationCount({ array, active, onChange }) {
  return (
    <div className="pagination-count">
      <span className="fs-16 c-grey me-3">Товаров на странице</span>
      {array.map((item) => (
        <Button
          key={RandomKey()}
          variant="contained"
          className={`purple-gray-button outlined ${
            item === active ? "active" : ""
          }`}
          sx={{
            maxWidth: 40,
          }}
          onClick={() => onChange(item)}
        >
          {item}
        </Button>
      ))}
    </div>
  );
}

export default PaginationCount;
