import {
  FormControl,
  FormHelperText,
  FormLabel,
} from "@chakra-ui/form-control";
import { Input as InputBase } from "@chakra-ui/input";
import { Box } from "@chakra-ui/layout";
import { unMask, mask } from "remask";

export const Input = ({
  label,
  error,
  touched,
  onChange,
  mask: pattern,
  ...props
}) => {
  const handleChange = (event) => {
    const unmaskedValue = unMask(event.target.value);
    const maskedValue = mask(unmaskedValue, pattern);

    onChange && onChange(event.target.name)(maskedValue);
  };
  return (
    <Box>
      <FormControl id={props.name} p={4} isRequired>
        <FormLabel>{label}</FormLabel>
        <InputBase {...props} onChange={pattern ? handleChange : onChange} />
        {touched && (
          <FormHelperText textColor="#e74c3c">{error}</FormHelperText>
        )}
      </FormControl>
    </Box>
  );
};
