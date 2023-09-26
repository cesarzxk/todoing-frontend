import { Flex, Text, FormControl } from "@chakra-ui/react";
import { TagsInput } from "react-tag-input-component";

interface tagsProps {
  tags?: string[];
  error?: string;
  label?: string;
  disabled?: boolean;
  setTags: (value: string[]) => void;
}

export function Tags({
  tags,
  error,
  setTags,
  label,
  disabled,
  ...rest
}: tagsProps) {
  return (
    <FormControl>
      <Flex flexDir="column" gap="10px" w="100%">
        {label && (
          <Text pl="9px" borderLeft="3px solid #3499FE" fontWeight="semibold">
            {label}
          </Text>
        )}

        <Flex flexDir="column">
          <TagsInput
            value={tags}
            onChange={setTags}
            placeHolder="Insira tags aqui.(opcional)"
            disabled={disabled}
          />

          {error && (
            <Text
              bgColor="#f8dada"
              px="0.5rem"
              py="0.5rem"
              borderBottomRadius="20px"
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
