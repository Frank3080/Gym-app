import React, { useState, useEffect } from "react";
import todoService from "../services/todo";

const TodoList = () => {
  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    todoService.getAll().then((initialItems) => {
      setItems(initialItems);
    });
  }, []);

  const addItem = () => {
    if (!newItem) {
      alert("Please enter an item.");
      return;
    }

    todoService.create(newItem).then((createdItem) => {
      setItems((oldList) => [...oldList, createdItem]);
    });

    setNewItem("");
  };

  const deleteItem = async (itemToDelete) => {
    if (itemToDelete !== undefined && itemToDelete.hasOwnProperty("id")) {
      try {
        console.log(`Deleting item with ID: ${itemToDelete.id}`);
        await todoService.remove(itemToDelete.id);
        setItems((oldList) => oldList.filter((item) => item !== itemToDelete));
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    } else {
      console.error("Invalid item to delete:", itemToDelete);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h1 className="text-xl mb-2 p-5">My Todo List</h1>
      <input
        type="text"
        placeholder="Add an item..."
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        className="bg-zinc-200 text-zinc-600 font-mono ring-1 ring-zinc-400 focus:ring-2 focus:ring-rose-500 outline-none duration-300 placeholder:text-zinc-600 placeholder:opacity-50 rounded-full px-4 py-1 shadow-md focus:shadow-lg focus:shadow-purple-600"
      />
      <button
        onClick={() => addItem()}
        className="px-8 mx-auto py-4 rounded-md border-[2px] bg-slate-950 border-purple-600 border-solid purpleShadow duration-200 mt-6"
      >
        Add
      </button>

      <ul>
        {items.map((item) => (
          <div key={item.id}>
            <li>
              {item.value}
              <button
                className="delete-button"
                onClick={() => deleteItem(item)}
              >
                ❌
              </button>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
