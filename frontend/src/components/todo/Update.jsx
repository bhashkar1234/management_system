import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Update = ({ display, update }) => {
  const [Inputs, setInputs] = useState({
    title: "",
    body: "",
    priority: "",
    category: "",
  });

  useEffect(() => {
    if (update) {
      setInputs({
        title: update.title,
        body: update.body,
        priority: update.priority,
        category: update.category,
      });
    }
  }, [update]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      if (!update) {
        // Handle the case where update is null or undefined
        toast.error("Task details not found for updating");
        return;
      }
  
      const response = await axios.put(
        `http://localhost:8010/api/v2/updateTask/${update._id}`,
        Inputs
      );
      toast.success(response.data.message);
      display("none");
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Failed to update task. Please try again.");
    }
  };

  return (
    <div className="update">
      <h3>Update Task</h3>
      <input
        type="text"
        name="title"
        value={Inputs.title}
        onChange={handleChange}
      />
      <textarea
        name="body"
        value={Inputs.body}
        onChange={handleChange}
      />
      <select
        name="priority"
        value={Inputs.priority}
        onChange={handleChange}
      >
        <option value="">Select Priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <select
        name="category"
        value={Inputs.category}
        onChange={handleChange}
      >
        <option value="">Select Category</option>
        <option value="work">Work</option>
        <option value="personal">Personal</option>
        <option value="others">Others</option>
      </select>
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={() => display("none")}>Cancel</button>
    </div>
  );
};

export default Update;
