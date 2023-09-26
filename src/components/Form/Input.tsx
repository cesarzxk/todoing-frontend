import {
  Flex,
  Input as ChakraInput,
  Text,
  FormControl,
  InputProps as ChakraInputProps,
} from "@chakra-ui/react";

interface InputProps extends ChakraInputProps {
  label?: string;
  error?: string;
}

export function Input({ label, error, ...rest }: InputProps) {
  return (
    <FormControl>
      <Flex flexDir="column" gap="10px" w="100%">
        {label && (
          <Text pl="9px" borderLeft="3px solid #3499FE" fontWeight="semibold">
            {label}
          </Text>
        )}

        <Flex flexDir="column">
          <ChakraInput
            backgroundColor="#fff"
            borderRadius="0.375rem"
            fontFamily="Nunito"
            borderColor="#ccc"
            borderBottomRadius={error ? "0px" : "0.375rem"}
            {...rest}
          />
          {error && (
            <Text
              bgColor="#f8dada"
              px="0.5rem"
              py="0.5rem"
              borderRadius="0.375rem"
              color="#710000"
            >
              Teste
            </Text>
          )}
        </Flex>
      </Flex>
    </FormControl>
  );
}
