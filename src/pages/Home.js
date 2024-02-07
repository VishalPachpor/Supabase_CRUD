import { useState } from "react";
import supabase from "../config/supabaseClient";
import { useEffect } from "react";
import SmothieCard from "../components/SmothieCard";

const Home = () => {
  const [fetchError, setFetchError] = useState(null);
  const [smothies, setSmothies] = useState(null);

  const handleDelete = (id)=>{
      setSmothies(prevSmothie=> {
        return prevSmothie.filter(sm => sm.id !==id)
      })
  }

  useEffect(() => {
    const fetchSmothies = async () => {
      const { data, error } = await supabase.from("smoothies").select();

      if (error) {
        setFetchError("Could not fetch ");
        setSmothies(null);
      }

      if (data) {
        setSmothies(data);
        setFetchError(null);
      }
    };
    fetchSmothies();
  }, []);

  return (
    <div className="page home">
      {fetchError && <p>Error: {fetchError}</p>}
      {smothies && (
        <div className="">
          {smothies && (
            <div className="smoothies">
            {/*button */}
              <div className="smothie-grid">
                {smothies.map((smothie) => (
                 <SmothieCard key={smothie.id} smothie={smothie} onDelete={handleDelete} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
