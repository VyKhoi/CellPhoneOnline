import React, { useState, useContext, useEffect } from "react";
import { Container } from "react-bootstrap";
import HeaderType from "../../component/layout/component/headerType";
import LogNews from "../../component/layout/component/technologyNews";
import { SearchContext } from "../../component/searchKeyWord/searchKeyWord";
import { BranchContext } from "../../component/branchSelect/BranchContext";
import LogLaptopCard from "../../component/layout/component/logLaptopCard";
import { useParams } from "react-router-dom";

function Search({ keySearch }) {
  const { search, setSearch } = useContext(SearchContext);
  const { branchID, setBranchID } = useContext(BranchContext);
  const [listProduct, setListProduct] = useState([]);
  const { from_price, to_price, type_product } = useParams();

  if (from_price && to_price) {
    useEffect(() => {
      fetch(
        `https://localhost:8000/home/branch/${branchID}/search-price/${from_price}/${to_price}/${type_product}`
      )
        .then((response) => response.json())
        .then((data) => {
          setListProduct(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }, [branchID, search]);
  } else {
    if (search) {
      useEffect(() => {
        fetch(`https://localhost:8000/home/branch/${branchID}/search/${search}`)
          .then((response) => response.json())
          .then((data) => {
            setListProduct(data);
          })
          .catch((error) => {
            console.error(error);
          });
      }, [branchID, search]);
    }
  }

  function oke() {
    console.log("key word search la ", search);
  }

  return (
    <div className="container_body_content_page">
      {/* <button onClick={oke}>xem search</button> */}
      <h1>Danh sách cách sản phẩm tìm kiếm {search ? search : "khong"}</h1>
      <hr></hr>
      {listProduct && <LogLaptopCard listLaptop={listProduct}></LogLaptopCard>}

      <h1>Tin tức công nghệ</h1>
      <hr></hr>
      <LogNews></LogNews>
    </div>
  );
}

export default Search;
