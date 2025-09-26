import React from "react";
import "./Home.css";

const properties = [
  { id: 1, title: "Cozy Apartment", location: "Downtown", price: "$1200/mo" },
  { id: 2, title: "Spacious Villa", location: "Suburbs", price: "$2500/mo" },
  { id: 3, title: "Modern Studio", location: "City Center", price: "$900/mo" },
];

function Home() {
  return (
    <div className="home-container">
      <h2>Available Properties for Rent</h2>
      <div className="card-list">
        {properties.map((prop) => (
          <div className="property-card" key={prop.id}>
            <h3>{prop.title}</h3>
            <p>{prop.location}</p>
            <p>{prop.price}</p>
            <button>Rent Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
