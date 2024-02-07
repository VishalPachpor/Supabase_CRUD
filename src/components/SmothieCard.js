import React from 'react'
import { Link } from 'react-router-dom';
import supabase from '../config/supabaseClient';



const SmothieCard = ({ smothie, onDelete }) => {
  const handleDelete =async() =>{
      const { data, error } = await supabase
        .from("smoothies")
        .delete()
        .eq("id", smothie.id)
        .select()
    
    if (error) {
      console.log(error)
    }
    if (data) {
      console.log(data)
      onDelete(smothie.id)
    }
  }

  return (
    <div className="smoothie-card">
      <h3>{smothie.title}</h3>
      <p>{smothie.method}</p>
      <div className="rating">{smothie.rating}</div>
      <div className="buttons">
        <Link to={"/" + smothie.id}>
          <i className="material-icons">edit</i>
        </Link>
        <i className="material-icons" onClick={handleDelete}>
          delete
        </i>
      </div>
    </div>
  );
};

export default SmothieCard