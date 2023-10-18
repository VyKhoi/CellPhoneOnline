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

  var requestSearchName = {
    search: search,
    branchId: branchID
  };
  var requestSearchPrice = {
      type: type_product,
      branchId: branchID,
      priceFrom: from_price,
      priceTo: to_price
    
  };


  if (from_price && to_price) {
    useEffect(() => {
      fetch(`https://localhost:7242/product/search/price`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestSearchPrice),
        })
        .then((response) => response.json())
        .then((data) => {
          setListProduct(data.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }, [branchID, search]);
  } else {  
    if (search) {
      useEffect(() => {
        fetch(`https://localhost:7242/product/search/name`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestSearchName),
        })
          .then((response) => response.json())
          .then((data) => {
            setListProduct(data.data);
            console.log(data.data)
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
