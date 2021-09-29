import React from "react";
import PlantCard from "./PlantCard";

function PlantList({search, plants, handleDelete, handleNewPrice}) {

  const plantCards = plants.map((plant) => <PlantCard handleNewPrice={handleNewPrice} handleDelete={handleDelete} key={plant.id} plant={plant}/>)

  const filteredList = plantCards.filter(plant => plant.props.plant.name.toLowerCase().includes(search.toLowerCase()))

  return (
     <ul className="cards">{filteredList}</ul>
  );
}

export default PlantList;
