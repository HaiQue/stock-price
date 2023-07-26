import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { Box, Grid, TextField, Typography } from "@mui/material";
import { Autocomplete } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ButtonStyled, StyledTextField, ToggleButtonStyled } from "./styles";

const securitiesList = ["IBM"];

type TradeType = "Market" | "Limit" | "Stop";
type FormValues = { tradeType: TradeType; quantity: number; security: string };

const StockPrices = () => {
  const [price, setPrice] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [security, setSecurity] = useState<string>("IBM");
  const { handleSubmit, control, watch } = useForm<FormValues>();
  const formValues = watch();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const fetchPrice = (security: string) => {
    axios
      .get(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${security}&apikey=demo`
      )
      .then((response) => {
        const { data } = response;
        setPrice(parseFloat(data["Global Quote"]["05. price"]));
      })
      .catch((err) => {
        setError("Error fetching stock price. Please try again later.");
        console.error(err);
      });
  };

  useEffect(() => {
    fetchPrice(security);
  }, [security]);

  const onSubmit = (data: FormValues) => {
    if (price !== null) {
      alert(
        `Buy ${data.quantity} shares of ${data.security} for ${
          data.quantity * price
        } USD`
      );
    } else {
      alert("The price data is not available.");
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="stretch"
      justifyContent="top"
      height="100vh"
      bgcolor="#080808"
      color="#FFFFFF"
      p={4}
    >
      <Typography
        variant="h4"
        color="inherit"
        align="left"
        mb={10}
        fontWeight="bold"
      >
        {"Stock Order"}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={12} sm={12} md={12} mb={2}>
            <Autocomplete
              options={securitiesList}
              defaultValue="IBM"
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Security"
                  InputProps={{
                    ...params.InputProps,
                    style: {
                      color: "#e6e1ee",
                    },
                    className: "custom-outlined-input",
                  }}
                  InputLabelProps={{ style: { color: "#c5a0f1" } }}
                />
              )}
              onChange={(event, newValue) => {
                if (newValue) {
                  setSecurity(newValue);
                }
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} mb={2}>
            <Controller
              name="quantity"
              control={control}
              defaultValue={1}
              render={({ field }) => (
                <StyledTextField
                  {...field}
                  type="number"
                  label="Shares"
                  variant="outlined"
                  InputProps={{
                    style: {
                      color: "#e6e1ee",
                    },
                  }}
                  InputLabelProps={{
                    style: { color: "#c5a0f1" },
                    shrink: true,
                  }}
                  inputProps={{
                    min: 1,
                    step: 1,
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Box
              display="flex"
              justifyContent={isSmallScreen ? "flex-start" : "flex-end"}
            >
              <ToggleButtonStyled value="Market">Market</ToggleButtonStyled>
              <ToggleButtonStyled value="Limit">Limit</ToggleButtonStyled>
              <ToggleButtonStyled value="Stop" last>
                Stop
              </ToggleButtonStyled>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={12} style={{ marginBottom: "20px" }}>
            <Box
              bgcolor="#836ea0"
              borderRadius="5px"
              p={2}
              display="flex"
              justifyContent="space-between"
            >
              <Typography
                variant="h6"
                color="#e6e1ee"
                style={{ marginLeft: "10px" }}
              >
                {error || `${security}`}
              </Typography>
              <Typography
                variant="h6"
                color="#e6e1ee"
                style={{ marginRight: "10px" }}
              >
                {price ? `$${price.toFixed(2)}` : "Loading..."}
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            style={{ paddingLeft: "32px", color: "#8d8b8a" }}
          >
            <Typography variant="body1" color="inherit">
              Estimated trading amount:{" "}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            style={{ paddingLeft: "32px", marginBottom: "40px" }}
          >
            <Typography variant="body1" color="inherit">
              {price
                ? `Buy ${formValues.quantity} x $${price.toFixed(
                    2
                  )} ${security} ≈ $${(price * formValues.quantity).toFixed(
                    2
                  )} USD`
                : "Loading..."}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            mt={6}
            container
            justifyContent="flex-end"
          >
            <ButtonStyled variant="contained" type="submit">
              Buy {security}
            </ButtonStyled>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default StockPrices;
