import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

import { api } from "@/services/apis";
import { useEffect, useState } from "react";
import { Input } from "./Form/Input";
import { Tags } from "./Form/Tags";
import moment from "moment";

interface CalendarSetSchedullingType {
  isOpen: boolean;
  onClose: () => void;
  data: {
    id: string;
    title: string;
    description: string;
    time: Date;
    duration: Date;
    isHoliday: boolean;
  };
}

export default function CalendarSetSchedulling({
  isOpen,
  onClose,
  data,
}: CalendarSetSchedullingType) {
  const [isLoading, setIsLoading] = useState(false);

  const [title, setTitle] = useState(data?.title);
  const [description, setDescription] = useState(data?.description);
  const [tags, setTags] = useState<{ title: string; id: string }[]>([]);
  const [newTags, setNewTags] = useState<string[]>([]);

  const [intervalDuration, setIntervalDuration] = useState<{
    time: Date;
    duration: Date;
  }>({ time: data?.time, duration: data?.duration });

  async function setData() {
    if (title == undefined || title == "" || data?.isHoliday) return;

    setIsLoading(true);
    try {
      await api.put("/calendar", {
        id: data.id,
        title,
        description,
        ...intervalDuration,
      });

      // await api.put("/calendar/tag", {
      //   tags,
      // });
      onClose();
      setIsLoading(false);
    } catch {
      setIsLoading(false);
    }
  }

  async function getTags() {
    try {
      const { data: apidata } = await api.get("/calendar/tag/" + data?.id);

      setTags(apidata);
    } catch {
      console.log("Error ao deletar!");
    }
  }

  async function removeScheduling() {
    await api.delete("/calendar/" + data?.id);

    onClose();
  }

  useEffect(() => {
    getTags();
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered autoFocus>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {data?.isHoliday ? (
            <p>
              {title} - {moment(data?.time).format("DD/MM/yyyy")}
            </p>
          ) : (
            <>
              Event scheduled for
              <p>
                {moment(data?.time).format("DD/MM/yyyy - HH:mm")} to{" "}
                {moment(data?.duration).format("DD/MM/yyyy - HH:mm")}
              </p>
            </>
          )}
        </ModalHeader>
        <ModalBody columnGap="1rem">
          <Flex gap="1rem" flexDir="column">
            <Input
              label="Title:"
              onChange={(event: any) => {
                setTitle(event.target.value);
              }}
              value={title}
              placeholder="Description for scheduling."
              type="title"
              isReadOnly={data?.isHoliday}
            />

            <Input
              label="Description:"
              onChange={(event: any) => {
                setDescription(event.target.value);
              }}
              placeholder="Description for scheduling. (optional)"
              value={description}
              type="description"
              isReadOnly={data?.isHoliday}
            />

            <Tags
              label="Tags:"
              setTags={setNewTags}
              tags={newTags}
              disabled={data?.isHoliday}
            />
          </Flex>
        </ModalBody>
        <ModalFooter gap="0.5rem">
          <Box></Box>

          <Button
            onClick={removeScheduling}
            isLoading={isLoading}
            isDisabled={title == undefined || title == ""}
            hidden={data?.isHoliday}
          >
            Delete
          </Button>

          <Button
            onClick={setData}
            colorScheme="cyan"
            isLoading={isLoading}
            isDisabled={title == undefined || title == ""}
            hidden={data?.isHoliday}
          >
            Save
          </Button>

          <Button
            onClick={() => {
              setTitle("");
              setDescription("");
              onClose();
            }}
            colorScheme="red"
          >
            {data?.isHoliday ? "Close" : "Cancel"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
