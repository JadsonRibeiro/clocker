import {
  FormControl,
  FormHelperText,
  FormLabel,
} from "@chakra-ui/form-control";
import { Input as InputBase } from "@chakra-ui/input";
import { Box } from "@chakra-ui/layout";

export const Input = ({ label, error, touched, ...props }) => {
  return (
    <Box>
      <FormControl id={props.name} p={4} isRequired>
        <FormLabel>{label}</FormLabel>
        <InputBase {...props} />
        {touched && (
          <FormHelperText textColor="#e74c3c">{error}</FormHelperText>
        )}
      </FormControl>
    </Box>
  );
};
