import { useEffect, useState } from "react";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

function ListProducts() {
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const { data, error } = useSWR(
    `http://localhost:4000/products?page=${page}`,
    fetcher
  );

  useEffect(() => {
    if (data) {
      setPageCount(data.pagination.pageCount);
    }
  }, [data]);

  function handlePrevious() {
    setPage((p) => {
      if (p === 1) return p;
      return p - 1;
    });
  }

  function handleNext() {
    setPage((p) => {
      if (p === pageCount) return p;
      return p + 1;
    });
  }

  if (error) {
    return <div>{JSON.stringify(error)}</div>;
  }

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <div className="product-list">
      {data.items.map((product) => {
        return (
          <div className="product-item" key={product._id}>
            <div className="product-inner">
              <span className="product-price">${product.price}</span>
              <h3 className="product-name">{product.productName}</h3>
              <div className="product-image">
                <img
                  src="https://via.placeholder.com/200"
                  width="100%"
                  height="100px"
                  style={{ flex: 1 }}
                />
              </div>
            </div>
          </div>
        );
      })}

      <footer>
        Page: {page}
        <br />
        Page count: {pageCount}
        <br />
        <button disabled={page === 1} onClick={handlePrevious}>
          Previous
        </button>
        <button disabled={page === pageCount} onClick={handleNext}>
          Next
        </button>
        <select
          value={page}
          onChange={(event) => {
            setPage(event.target.value);
          }}
        >
          {Array(pageCount)
            .fill(null)
            .map((_, index) => {
              return <option key={index}>{index + 1}</option>;
            })}
        </select>
      </footer>
    </div>
  );
}

export default ListProducts;
