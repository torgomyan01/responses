import React from "react";
import "./review-moderation.css";
import MainTemplate from "../../features/main-template/main-template";
import { Button, Pagination } from "@mui/material";
import Shape from "../../features/shape/shape";

function ReviewModeration() {
  return (
    <MainTemplate className="reviewModeration">
      <div className="d-flex justify-content-between align-items-center">
        <Button variant="contained" className="btn-green py-3 px-4">
          вернуться к списку товаров
        </Button>
        <Shape />
      </div>
      <hr className="mt-5 mb-5" />
      <div className="filter-block">
        <div className="d-flex justify-content-start align-items-center">
          <label className="def-search me-5">
            <i className="fa-solid fa-magnifying-glass" />
            <input type="text" placeholder="Найти товар" />
          </label>
          <div className="filter-block-sorting">
            Сортировка
            <i className="fa-regular fa-chevron-down ms-2" />
          </div>
        </div>
        <div className="pagination">
          <Pagination count={23} shape="rounded" />
        </div>
      </div>
    </MainTemplate>
  );
}

export default ReviewModeration;
