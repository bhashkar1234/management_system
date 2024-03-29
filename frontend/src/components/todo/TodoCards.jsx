import React, { useState, useEffect } from "react";

const TodoCards = ({
  title: initialTitle,
  body: initialBody,
  priority: initialPriority,
  category: initialCategory,
  id,
  delid,
  update,
}) => {
  const [editing, setEditing] = useState(false);
  const [editedAttributes, setEditedAttributes] = useState({
    title: initialTitle,
    body: initialBody,
    priority: initialPriority,
    category: initialCategory,
  });

  useEffect(() => {
    setEditedAttributes({
      title: initialTitle,
      body: initialBody,
      priority: initialPriority,
      category: initialCategory,
    });
  }, [initialTitle, initialBody, initialPriority, initialCategory]);

  const handleEdit = () => {
    setEditing(true); // Set editing mode to true
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedAttributes({ ...editedAttributes, [name]: value });
  };

  const handleCancel = () => {
    setEditing(false); // Cancel editing mode
    setEditedAttributes({
      title: initialTitle,
      body: initialBody,
      priority: initialPriority,
      category: initialCategory,
    }); // Reset editedAttributes to initial values
  };

  const handleSave = () => {
    update({ ...editedAttributes, _id: id }); // Call the update function with edited attributes
    setEditing(false); // Exit editing mode
  };

  return (
    <div className="todo-card p-3">
      {editing ? ( // Show input fields in editing mode
        <div>
          <input
            type="text"
            name="title"
            value={editedAttributes.title}
            onChange={handleChange}
          />
          <textarea
            name="body"
            value={editedAttributes.body}
            onChange={handleChange}
          />
          <select
            name="priority"
            value={editedAttributes.priority}
            onChange={handleChange}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <select
            name="category"
            value={editedAttributes.category}
            onChange={handleChange}
          >
            <option value="work">Work</option>
            <option value="personal">Personal</option>
            <option value="others">Others</option>
          </select>
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        // Show task details in non-editing mode
        <div>
          <h3 className="todo-title">{initialTitle}</h3>
          <p className="todo-body">{initialBody}</p>
          <p className="todo-priority">Priority: {initialPriority}</p>
          <p className="todo-category">Category: {initialCategory}</p>
          <div className="todo-buttons d-flex justify-content-between">
            <button className="btn btn-warning" onClick={handleEdit}>
              Edit
            </button>
            <button className="btn btn-danger" onClick={() => delid(id)}>
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoCards;
