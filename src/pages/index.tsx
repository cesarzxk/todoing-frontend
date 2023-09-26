import Calendar from "@/components/Calendar";
import { Flex } from "@chakra-ui/react";

export default function Home() {
  return (
    <Flex
      h="100%"
      w="100%"
      alignItems="center"
      justifyContent="center"
      bgImage="bg.png"
      backgroundSize="cover"
      backdropFilter="blur(10px)"
      borderX="10px solid #0F0F36"
      borderBottom="10px solid #0F0F36"
    >
      <Calendar />
    </Flex>
  );
}
