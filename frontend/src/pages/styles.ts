import { Button, TextField } from "@mui/material";
import { styled } from "@mui/system";

type ToggleButtonStyledProps = {
  last?: boolean;
};

export const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#836ea0",
    },
    "&:hover fieldset": {
      borderColor: "#836ea0",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#836ea0",
    },
  },
});

export const ButtonStyled = styled(Button)(({ theme }) => ({
  paddingTop: 10,
  paddingRight: 25,
  paddingBottom: 10,
  paddingLeft: 25,
  backgroundColor: theme.palette.primary.dark,
  color: "#ffffff",
  borderRadius: "25px",
  textTransform: "capitalize",
  "&:hover": {
    backgroundColor: theme.palette.primary.light,
  },
}));

export const ToggleButtonStyled = styled(Button)<ToggleButtonStyledProps>(
  ({ theme, last }) => ({
    paddingTop: 10,
    paddingRight: 15,
    paddingBottom: 10,
    paddingLeft: 15,
    marginRight: last ? 0 : 15,
    backgroundColor: theme.palette.primary.dark,
    color: "#c5a0f1",
    borderRadius: "25px",
    textTransform: "capitalize",
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
    },
  })
);
