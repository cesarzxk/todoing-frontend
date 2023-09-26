import { Center, useDisclosure } from "@chakra-ui/react";

import {
  Calendar as ReactBigCalendar,
  momentLocalizer,
} from "react-big-calendar";

import moment from "moment-timezone";

import { api } from "@/services/apis";
import { useEffect, useMemo, useState } from "react";
import CalendarSetSchedulling from "./CalendarSetSchedulling";
import CalendarSchedulling from "./CalendarSchedulling";

moment().tz("America/Sao_Paulo").format();
const localizer = momentLocalizer(moment);

export default function Calendar() {
  const [data, setData] = useState<any>();
  const [haveHolidays, setHaveHolidays] = useState<boolean>(false);

  const [eventSelected, setEventSelected] = useState<any>();

  const { isOpen, onClose, onOpen } = useDisclosure();

  const {
    isOpen: isOpenEvent,
    onClose: onCloseEvent,
    onOpen: onOpenEvent,
  } = useDisclosure();

  const [interval, setInterval] = useState<{
    time?: Date;
    duration?: Date;
  }>();

  async function getData() {
    const { data: schedulling } = await api.get("/calendar");
    const { data: holidays } = await api.get("/calendar/holidays/" + 2023);

    setData([...holidays, ...schedulling]);
  }

  useMemo(() => {
    getData();
  }, [isOpen, isOpenEvent]);

  return (
    <Center w="90%" h="90%">
      <ReactBigCalendar
        localizer={localizer}
        events={data?.map((data: any) => {
          return {
            ...data,
            time: new Date(data.time),
            duration: new Date(data.duration),
            isHoliday: data.isHoliday ? data.isHoliday : false,
          };
        })}
        startAccessor="time"
        endAccessor="duration"
        onSelectEvent={(e) => {
          setEventSelected(e);
          onOpenEvent();
        }}
        onSelectSlot={(e) => {
          setInterval({ time: e.start, duration: e.end });
          onOpen();
        }}
        selectable
      />

      {isOpenEvent && (
        <CalendarSchedulling
          isOpen={isOpenEvent}
          onClose={onCloseEvent}
          data={eventSelected}
        />
      )}

      {isOpen && (
        <CalendarSetSchedulling {...interval} {...{ isOpen, onClose }} />
      )}
    </Center>
  );
}
