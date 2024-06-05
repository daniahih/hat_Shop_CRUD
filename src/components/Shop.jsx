// src/HatShop.js
import { useState, useEffect } from "react";
import axios from "axios";
import "./HatShop.css";

const API_URL = "https://666008c95425580055b1d7f7.mockapi.io/hat"; // Mock API endpoint

const HatShop = () => {
  const [hats, setHats] = useState([]);
  const [newHat, setNewHat] = useState("");
  const [newHatImage, setNewHatImage] = useState("");
  const [editHatId, setEditHatId] = useState(null);
  const [editHatText, setEditHatText] = useState("");
  const [editHatImage, setEditHatImage] = useState("");

  // Fetch hats from API
  const fetchHats = async () => {
    try {
      const response = await axios.get(API_URL);
      setHats(response.data.slice(0, 10)); // Only get the first 10 hats for simplicity
    } catch (error) {
      console.error("Error fetching hats: ", error);
    }
  };

  // Load hats on component mount
  useEffect(() => {
    fetchHats();
  }, []);

  // Add new hat
  const addHat = async () => {
    try {
      const response = await axios.post(API_URL, {
        name: newHat,
        avatar: newHatImage,
        userId: 1,
      });
      setHats([...hats, response.data]);
      setNewHat("");
      setNewHatImage("");
    } catch (error) {
      console.error("Error adding hat: ", error);
    }
  };

  // Update hat
  const updateHat = async (id) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, {
        name: editHatText,
        avatar: editHatImage,
        userId: 1,
      });
      setHats(hats.map((hat) => (hat.id === id ? response.data : hat)));
      setEditHatId(null);
      setEditHatText("");
      setEditHatImage("");
    } catch (error) {
      console.error("Error updating hat: ", error);
    }
  };

  // Delete hat
  const deleteHat = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setHats(hats.filter((hat) => hat.id !== id));
    } catch (error) {
      console.error("Error deleting hat: ", error);
    }
  };

  return (
    <div className="hat-shop">
      <h1>Small Hat Shop</h1>
      <input
        type="text"
        value={newHat}
        onChange={(e) => setNewHat(e.target.value)}
        placeholder="Add a new hat"
      />
      <input
        type="text"
        value={newHatImage}
        onChange={(e) => setNewHatImage(e.target.value)}
        placeholder="Image URL"
      />
      <button onClick={addHat}>Add Hat</button>
      <ul>
        {hats.map((hat) => (
          <li key={hat.id}>
            {editHatId === hat.id ? (
              <div>
                <input
                  type="text"
                  value={editHatText}
                  onChange={(e) => setEditHatText(e.target.value)}
                />
                <input
                  type="text"
                  value={editHatImage}
                  onChange={(e) => setEditHatImage(e.target.value)}
                  placeholder="Image URL"
                />
                <button onClick={() => updateHat(hat.id)}>Update</button>
              </div>
            ) : (
              <div>
                <img src={hat.avatar} alt={hat.name} className="hat-image" />
                {hat.name}
                <button
                  onClick={() => {
                    setEditHatId(hat.id);
                    setEditHatText(hat.name);
                    setEditHatImage(hat.avatar);
                  }}
                >
                  ✏️ Edit
                </button>
                <button onClick={() => deleteHat(hat.id)}>❌ Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HatShop;
