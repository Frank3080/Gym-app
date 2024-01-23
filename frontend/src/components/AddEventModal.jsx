import React, { useState } from "react";
import Modal from "react-modal";
import Datetime from "react-datetime";

Modal.setAppElement("#root");

export default function ({ isOpen, onClose, onEventAdded }) {
  const [title, setTitle] = useState("");
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());

  const onSubmit = (e) => {
    e.preventDefault();
    onEventAdded({
      title,
      start,
      end,
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="bg-gray-800 p-8 rounded-lg outline-none w-full h-full fixed inset-0 flex items-center justify-center"
    >
      <button
        onClick={onClose}
        className="self-end text-white hover:text-gray-400 cursor-pointer absolute top-4 right-4"
      >
        <i className="fa-solid fa-xmark"></i>
      </button>
      <form className="text-white" onSubmit={onSubmit}>
        <input
          className="block w-full h-12 bg-opacity-25 bg-white rounded-md px-3 mt-1 text-white text-sm font-normal"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="mt-4">
          <label className="block text-white text-sm font-semibold">
            Start Date
          </label>
          <Datetime
            input={false} // Disable the default input
            timeFormat="h:mm A" // Use a custom format for horizontal layout
            className="block w-full h-full bg-opacity-25 rounded-md px-3 mt-1 text-white text-sm font-normal"
            value={start}
            onChange={(date) => setStart(date)}
          />
        </div>
        <div className="mt-4">
          <label className="block text-white text-sm font-semibold">
            End Date
          </label>
          <Datetime
            input={false} // Disable the default input
            timeFormat="h:mm A" // Use a custom format for horizontal layout
            className="block w-full h-full bg-opacity-25 rounded-md px-3 mt-1 text-white text-sm font-normal"
            value={end}
            onChange={(date) => setEnd(date)}
          />
        </div>

        <button className="mt-40 w-full bg-white text-gray-800 py-3 rounded-md text-lg font-semibold cursor-pointer">
          Add event
        </button>
      </form>
    </Modal>
  );
}
