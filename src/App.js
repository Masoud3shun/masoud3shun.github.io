import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [filterBy, setFilterBy] = useState("all");

  const getData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("https://fakestoreapi.com/products");
      setData(data);
      setLoading(false);
      setError("");
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const filteredData = data.filter((item) => {
    if (filterBy === "all") {
      return true;
    }
    return item.category.toLowerCase() === filterBy.toLowerCase();
  });

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortBy === "price-low-to-high") {
      return a.price - b.price;
    } else if (sortBy === "price-high-to-low") {
      return b.price - a.price;
    } else {
      return 0;
    }
  });

  return (
    <div className="App">
      <header className="header">
        <div className="filter-sort">
          <div className="custom-dropdown">
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="men's clothing">Men's Clothing</option>
              <option value="electronics">Electronics</option>
              <option value="jewelery">Jewelery</option>
              <option value="women's clothing">Women's Clothing</option>
            </select>
          </div>
          <div className="custom-dropdown">
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="default">Default Sorting</option>
              <option value="price-low-to-high">Price: Low to High</option>
              <option value="price-high-to-low">Price: High to Low</option>
            </select>
          </div>
        </div>
      </header>
      <div className="content">
        <div className="card-container">
          {sortedData.map((item) => (
            <Card
              key={item.id}
              className="card"
              style={{
                background: "#ffffff98",
                maxWidth: "100%",
                padding: "1em",
                margin: "1em",
                borderRadius: "2rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Card.Img
                variant="top"
                src={item.image}
                alt={item.title}
                style={{
                  maxHeight: "250px",
                  objectFit: "contain",
                  borderRadius: "1rem",
                }}
                object-fit="contained"
                loading="lazy"
              />
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>${item.price}</Card.Text>
                <Button className="custom-primary-button">Add To Cart</Button>
                <Button className="custom-primary-button">Read More</Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
