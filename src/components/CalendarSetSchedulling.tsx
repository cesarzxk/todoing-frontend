import {
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
import { useState } from "react";
import { Input } from "./Form/Input";
import { Tags } from "./Form/Tags";
import moment from "moment";

interface CalendarSetSchedullingType {
  time?: Date;
  duration?: Date;
  isOpen: boolean;
  onClose: () => void;
}

export default function CalendarSetSchedulling({
  time,
  duration,
  isOpen,
  onClose,
}: CalendarSetSchedullingType) {
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  async function setData() {
    try {
      if (title == undefined || title == "") return;
      setIsLoading(true);
      const result = await api.post("/calendar", {
        time,
        duration,
        title,
        description,
        tags,
      });
      if (result?.data?.id) onClose();
      setIsLoading(false);
    } catch {
      setIsLoading(false);
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered autoFocus>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Do you want to schedule from:
          <p>
            {moment(time).format("DD/MM/yyyy - HH:mm")} to{" "}
            {moment(duration).format("DD/MM/yyyy - HH:mm")}?
          </p>
        </ModalHeader>
        <ModalBody columnGap="1rem">
          <Flex gap="1rem" flexDir="column">
            <Input
              label="Title:"
              onChange={(event: any) => {
                setTitle(event.target.value);
              }}
              value={title}
              placeholder="Title for scheduling."
              type="title"
            />

            <Input
              label="Description:"
              onChange={(event: any) => {
                setDescription(event.target.value);
              }}
              placeholder="Description for scheduling. (optional)"
              value={description}
              type="description"
            />

            <Tags label="Tags:" setTags={setTags} tags={tags} />
          </Flex>
        </ModalBody>
        <ModalFooter gap="0.5rem">
          <Button
            onClick={setData}
            colorScheme="cyan"
            isLoading={isLoading}
            isDisabled={title == undefined || title == ""}
          >
            Create
          </Button>

          <Button
            onClick={() => {
              setTitle("");
              setDescription("");
              onClose();
            }}
            colorScheme="red"
          >
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
