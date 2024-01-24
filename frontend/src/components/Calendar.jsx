import React, { useRef, useState } from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import AddEventModal from "./AddEventModal";
import calendarService from "../services/calendar";

const Calendar = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const calendarRef = useRef(null);

  const onEventAdded = async (event) => {
    const api = calendarRef.current.getApi();
    api.addEvent(event);
    setEvents([...events, event]);

    try {
      await calendarService.add(event);
      console.log("Event added to the backend:", event);
    } catch (error) {
      console.error("Error adding event to the backend:", error);
    }
  };

  const handleSelect = (info) => {
    const { start, end } = info;
    const eventNamePrompt = prompt("Enter event name");
    if (eventNamePrompt) {
      onEventAdded({
        title: eventNamePrompt,
        start,
        end,
      });
    }
  };

  return (
    <section>
      <button onClick={() => setModalOpen(true)}>Add Event</button>
      <div className="relative z-0">
        <Fullcalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView={"dayGridMonth"}
          headerToolbar={{
            start: "today prev,next",
            center: "title",
            end: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          height={"80vh"}
          editable
          selectable
          events={events}
          select={handleSelect}
        />
      </div>
      <AddEventModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onEventAdded={(event) => onEventAdded(event)}
      />
    </section>
  );
};

export default Calendar;
