import React, {useState} from "react";

function PlantCard({plant, handleDelete, handleNewPrice}) {

  const [stock, SetStock] = useState(true)
  const [changePrice, SetChangePrice] = useState(false)

  function handleChange(event){
    SetChangePrice(false)
    const newPrice = event.target.previousSibling.valueAsNumber;
    fetch(`http://localhost:6001/plants/${plant.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body:JSON.stringify({
        price: newPrice
      }),
    })
    .then(r=>r.json())
    .then(updatedItem=>handleNewPrice(updatedItem))
  }

  return (
    <li className="card">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      {changePrice ? 
      <span>
        <p>Price: $
          <input style={{width:'150px', fontSize: "15px"}} placeholder="New Price..." type="number" name="newPrice">
          </input>
          <button onClick={handleChange} id="newPrice">Submit</button>
        </p>
      </span> : 
      <p>Price: ${plant.price}</p>
      }
      {stock ? (
        <button className="primary" onClick={()=>SetStock(!stock)}>In Stock</button>
      ) : (
        <button onClick={()=>SetStock(!stock)}>Out of Stock</button>
      )}
      <button style={{backgroundColor:'white'}} onClick={()=>handleDelete(plant.id)}>🗑️</button>
      {changePrice ? <button onClick={()=>SetChangePrice(!changePrice)}>Close Edit</button>: <button onClick={()=>SetChangePrice(!changePrice)}>New Price</button>}
    </li>
  );
}

export default PlantCard;
