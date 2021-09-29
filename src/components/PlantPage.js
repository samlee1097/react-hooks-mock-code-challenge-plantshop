import React, {useEffect, useState} from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [search, SetSearch] = useState("")
  const [plants, SetPlants] = useState([])
 
  useEffect(()=>{
    fetch("http://localhost:6001/plants")
    .then(r=>r.json())
    .then(data=>SetPlants(data))
  },[])

  function handleNewPlant(newPlant){
    SetPlants([...plants, newPlant])
  }

  function handleDelete(id){
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "DELETE"
    })
    .then(r=>r.json())
    .then(()=>{
      const deletedList = plants.filter(plant=> plant.id !== id)
      SetPlants(deletedList)
    })
  }

  function handleNewPrice(changedItem){
    const updatedItems = plants.map((plant) => {
      if (plant.id === changedItem.id){
        return changedItem;
      } else {
        return plant
      }
    });
    SetPlants(updatedItems)
  }

  return (
    <main>
      <NewPlantForm handleNewPlant={handleNewPlant}/>
      <Search SetSearch={SetSearch}/>
      <PlantList handleNewPrice={handleNewPrice} handleDelete={handleDelete} search={search} plants={plants}/>
    </main>
  );
}

export default PlantPage;
