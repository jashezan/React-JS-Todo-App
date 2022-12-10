import React, { useState, useEffect } from "react";
import "./style.css";

// Get Todo List Data from Local  Storage
const getLocalData = () => {
  const lists = localStorage.getItem("mytodolist");
  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};

const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [isEditedItem, setIsEditedItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);

  // Add Item in list
  const addItem = () => {
    if (!inputData) {
      alert("Plz fill the Data");
    } else if (inputData && toggleButton) {
      setItems(
        items.map((curElem) => {
          if (curElem.id === isEditedItem) {
            return { ...curElem, name: inputData };
          }
          return curElem;
        })
      );
      setInputData("");
      setIsEditedItem(null);
      setToggleButton(false);
    } else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };

      setItems([...items, myNewInputData]);
      setInputData("");
    }
  };

  // Delete a single item from list
  const deleteItem = (index) => {
    const updatedItem = items.filter((curElem) => {
      return curElem.id !== index;
    });
    setItems(updatedItem);
  };

  // Delete all item from the list
  const removeAll = () => {
    setItems([]);
  };

  // Edit Item
  const editItem = (index) => {
    const item_todo_edited = items.find((curElem) => {
      return curElem.id === index;
    });
    setInputData(item_todo_edited);
    setIsEditedItem(index);
    setToggleButton(true);
  };

  // Adding Todo List in local storage
  useEffect(() => {
    localStorage.setItem("mytodolist", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img
              src="https://raw.githubusercontent.com/thapatechnical/reactjsByThapaTechnical/main/public/images/todo.svg"
              alt="todo sign"
            />
            <figcaption>♦️ Add your List Here ♦️</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="➕ Add Item"
              className="form-control"
              value={inputData}
              onChange={(event) => {
                setInputData(event.target.value);
              }}
            />
            {toggleButton ? (
              <i
                className="fa fa-plus add-btn"
                onClick={() => {
                  addItem();
                }}
              ></i>
            ) : (
              <i
                className="fas fa-edit add-btn"
                onClick={() => {
                  addItem();
                }}
              ></i>
            )}
          </div>
          {/* Show All Items  */}
          <div className="showItems">
            {items.map((curElem) => {
              return (
                <div className="eachItem" key={curElem.id}>
                  <h3>{curElem.name}</h3>
                  <div className="todo-btn">
                    <i
                      className="far fa-edit add-btn"
                      onClick={() => {
                        editItem(curElem.id);
                      }}
                    ></i>
                    <i
                      className="far fa-trash-alt add-btn"
                      onClick={() => {
                        deleteItem(curElem.id);
                      }}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>
          {/* Remove All Button  */}
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removeAll}
            >
              <span>CHECK LIST</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
