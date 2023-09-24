import React, { useEffect, useState } from "react";
import "./review-moderation.css";
import MainTemplate from "../../features/main-template/main-template";
import { Button, Pagination } from "@mui/material";
import Shape from "../../features/shape/shape";
import product from "../../assets/images/product.png";
import { STATUS_BUTTON } from "../../utils/const";
import Product from "../../features/product/product";
import { RandomKey } from "../../utils/helpers";
import PaginationCount from "../../features/pagination-count/pagination-count";

/**
 *
 * @type {{image: *, reviews: number, autoSend: boolean, title: string, list: string[], status: string}[]}
 */
const products = Array.from({ length: 100 }).map((item, index) => {
  return {
    image: product,
    title:
      "Шпатели для депиляции, шугаринга, воска, бровей деревянные -----" +
      (index + 1),
    list: [
      "Организация: ВБ ИП Шишкова О.П.",
      "Артикул: 123123123 ",
      "Артикул поставщика: Узкие-шпатели-100-ИП-Шишкова-О-П",
    ],
    status: STATUS_BUTTON.CLOSED,
    autoSend: false,
    reviews: 2,
  };
});

/**
 *
 * @type {number[]}
 */
const pageSize = [10, 50, 100];

/**
 *
 * @returns {JSX.Element}
 * @constructor
 */
function ReviewModeration() {
  const [paginationCount, setPaginationCount] = useState(pageSize[0]);
  const [activePage, setActivePage] = useState(1);
  const [activePageArray, setActivePageArray] = useState([]);

  useEffect(() => {
    const firstPageIndex = (activePage - 1) * paginationCount;
    const lastPageIndex = firstPageIndex + paginationCount;
    setActivePageArray(products.slice(firstPageIndex, lastPageIndex));
  }, [products, paginationCount, activePage]);

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
          <Pagination
            count={products.length / paginationCount}
            shape="rounded"
            page={activePage}
            onChange={(e, active) => setActivePage(active)}
          />
        </div>
      </div>
      <div className="products">
        {activePageArray.map((info) => (
          <Product key={RandomKey()} info={info} />
        ))}
      </div>
      <div className="d-flex justify-content-between align-items-center mt-5">
        <PaginationCount
          array={pageSize}
          active={paginationCount}
          onChange={(value) => setPaginationCount(value)}
        />
        <div className="pagination">
          <Pagination
            count={products.length / paginationCount}
            shape="rounded"
            page={activePage}
            onChange={(e, active) => setActivePage(active)}
          />
        </div>
      </div>
    </MainTemplate>
  );
}

export default ReviewModeration;
