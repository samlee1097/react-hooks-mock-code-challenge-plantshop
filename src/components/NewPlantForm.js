import React from "react";

function NewPlantForm({handleNewPlant}) {

  function handleSubmit(event){
    event.preventDefault();
    const newPlant = {
      name: event.target.name.value,
      image: event.target.image.value,
      price: event.target.price.value
    }

    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers:{
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(newPlant)
    })
    .then(r=>r.json())
    .then(newPlant => handleNewPlant(newPlant))

    //Clears Form
    event.target.name.value = ""
    event.target.image.value = ""
    event.target.price.value = ""
  }

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Plant name" />
        <input type="text" name="image" placeholder="Image URL" />
        <input type="number" name="price" step="0.01" placeholder="Price" />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
