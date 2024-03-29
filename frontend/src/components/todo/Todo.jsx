import React, { useEffect, useState } from "react";
import "./todo.css";
import TodoCards from "./TodoCards";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Update from "./Update";
import axios from "axios";

const Todo = () => {
  const id = sessionStorage.getItem("id");
  const [Inputs, setInputs] = useState({
    title: "",
    body: "",
    priority: "",
    category: "",
  });
  const [Array, setArray] = useState([]);
  const [displayUpdate, setDisplayUpdate] = useState(false);
  const [filterPriority, setFilterPriority] = useState("all"); // Default priority filter value
  const [filterCategory, setFilterCategory] = useState("all"); // Default category filter value

  const show = () => {
    document.getElementById("textarea").style.display = "block";
  };

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  };

  const submit = async () => {
    if (
      Inputs.title === "" ||
      Inputs.body === "" ||
      Inputs.category === "" ||
      Inputs.priority === ""
    ) {
      toast.error("Title, Body, Priority, or Category Can't Be Empty");
    } else {
      try {
        const response = await axios.post(
          `http://localhost:8002/api/v2/addTask`,
          Inputs
        );
        console.log(response);
        setInputs({ title: "", body: "", priority: "", category: "" });
        toast.success("Your Task Is Added");
        fetchTasks(); // Fetch tasks after adding a new one
      } catch (error) {
        console.error("Error adding task:", error);
        toast.error("Failed to add task. Please try again.");
      }
    }
  };

  const del = async (Cardid) => {
    try {
      await axios.delete(`http://localhost:8002/api/v2/deleteTask/${Cardid}`, {
        data: { id: id },
      });
      toast.success("Your Task Is Deleted");
      fetchTasks(); // Fetch tasks after deleting one
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task. Please try again.");
    }
  };

  const update = async (updatedTask) => {
    try {
      const response = await axios.put(
        `http://localhost:8002/api/v2/updateTask/${updatedTask._id}`,
        updatedTask
      );
      console.log("Update Response:", response);
      toast.success("Task updated successfully");
      fetchTasks(); // Fetch tasks after updating one
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Failed to update task. Please try again.");
    }
  };

  const fetchTasks = async () => {
    try {
      if (id) {
        const response = await axios.get(
          `http://localhost:8002/api/v2/getTasks/${id}`
        );
        setArray(response.data.tasks);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const applyPriorityFilter = (task) => {
    if (filterPriority === "all") return true;
    return task.priority === filterPriority;
  };

  const applyCategoryFilter = (task) => {
    if (filterCategory === "all") return true;
    return task.category === filterCategory;
  };

  useEffect(() => {
    fetchTasks();
  }, [id]);

  return (
    <>
      <div className="todo">
        <ToastContainer />
        <div className="todo-main container d-flex justify-content-center align-items-center my-4 flex-column">
          <div className="filter-options">
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
            >
              <option value="all">All Priorities</option>
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="work">Work</option>
              <option value="personal">Personal</option>
              <option value="others">Others</option>
            </select>
          </div>
          <div className="d-flex flex-column todo-inputs-div w-lg-50 w-100 p-1">
            <input
              type="text"
              placeholder="TITLE"
              className="my-2 p-2 todo-inputs"
              onClick={show}
              name="title"
              value={Inputs.title}
              onChange={change}
            />
            <textarea
              id="textarea"
              type="text"
              placeholder="BODY"
              name="body"
              className=" p-2 todo-inputs"
              value={Inputs.body}
              onChange={change}
            />
            <select
              name="priority"
              value={Inputs.priority}
              onChange={change}
              className="p-2 todo-inputs my-2"
            >
              <option value="">Select Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <select
              name="category"
              value={Inputs.category}
              onChange={change}
              className="p-2 todo-inputs my-2"
            >
              <option value="">Select Category</option>
              <option value="work">Work</option>
              <option value="personal">Personal</option>
              <option value="others">Others</option>
            </select>
          </div>
          <div className=" w-50 w-100 d-flex justify-content-end my-3">
            <button className="home-btn px-2 py-1" onClick={submit}>
              Add
            </button>
          </div>
        </div>
        <div className="todo-body">
          <div className="container-fluid">
            <div className="row">
              {Array.filter(applyPriorityFilter)
                .filter(applyCategoryFilter)
                .map((item, index) => (
                  <div
                    className="col-lg-3 col-11 mx-lg-5 mx-3 my-2"
                    key={index}
                  >
                    <TodoCards
                      title={item.title}
                      body={item.body}
                      priority={item.priority}
                      category={item.category}
                      id={item._id}
                      delid={del}
                      update={update}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
