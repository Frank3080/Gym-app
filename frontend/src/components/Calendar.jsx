import React, { useRef, useState } from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import AddEventModal from "./AddEventModal";
import calendarService from "../services/calendar";

const Calendar = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const calendarRef = useRef(null);

  const onEventAdded = (e) => {
    let calendarApi = calendarRef.current.getApi();
    calendarApi.addEvent(e);
  };

  const handleEventAdd = (data) => {
    calendarService.add(data.event);
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
            start: "today prev,next", // will normally be on the left. if RTL, will be on the right
            center: "title",
            end: "dayGridMonth,timeGridWeek,timeGridDay", // will normally be on the right. if RTL, will be on the left
          }}
          height={"80vh"}
          eventAdd={(event) => handleEventAdd(event)}
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
