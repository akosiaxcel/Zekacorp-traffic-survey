import React, { useState, useEffect } from "react";
import { Container, Grid, Button, Typography, Box } from "@mui/material";

const App = () => {
  const initialClicks = {
    A1: 0,
    A2: 0,
    A3: 0,
    A4: 0,
    B1: 0,
    B2: 0,
    B3: 0,
    B4: 0,
    C1: 0,
    C2: 0,
    C3: 0,
    C4: 0,
    D1: 0,
    D2: 0,
    D3: 0,
    D4: 0,
  };

  const [clicks, setClicks] = useState(initialClicks);
  const [keyboardEnabled, setKeyboardEnabled] = useState(false);

  const handleClick = (button, increment) => {
    setClicks((prevClicks) => ({
      ...prevClicks,
      [button]: prevClicks[button] + increment,
    }));
  };

  const handleClear = () => {
    setClicks(initialClicks);
  };

  const keyMap = {
    '1': 'A1',
    '2': 'A2',
    '3': 'A3',
    '4': 'A4',
    'q': 'B1',
    'w': 'B2',
    'e': 'B3',
    'r': 'B4',
    'a': 'C1',
    's': 'C2',
    'd': 'C3',
    'f': 'C4',
    'z': 'D1',
    'x': 'D2',
    'c': 'D3',
    'v': 'D4',
    '!': 'A1',
    '@': 'A2',
    '#': 'A3',
    '$': 'A4',
    'Q': 'B1',
    'W': 'B2',
    'E': 'B3',
    'R': 'B4',
    'A': 'C1',
    'S': 'C2',
    'D': 'C3',
    'F': 'C4',
    'Z': 'D1',
    'X': 'D2',
    'C': 'D3',
    'V': 'D4',
  };

  const displayKeyMap = {
    A1: '1',
    A2: '2',
    A3: '3',
    A4: '4',
    B1: 'Q',
    B2: 'W',
    B3: 'E',
    B4: 'R',
    C1: 'A',
    C2: 'S',
    C3: 'D',
    C4: 'F',
    D1: 'Z',
    D2: 'X',
    D3: 'C',
    D4: 'V',
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key } = event;

      if (key === ' ') {
        setKeyboardEnabled((prev) => !prev);
        event.preventDefault(); // Prevent the default action of space bar
        return;
      }

      if (keyboardEnabled) {
        const button = keyMap[key];

        if (button) {
          handleClick(button, '!@#$QWERASDFZXCV'.includes(key) ? -1 : 1);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [keyboardEnabled]);

  return (
    <Container sx={{ padding: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Click Counter App
      </Typography>
      <Grid container spacing={2}>
        {Object.keys(initialClicks).map((button) => (
          <Grid item xs={4} sm={4} md={3} key={button}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              padding={1}
            >
              <Typography variant="h6">
                {button} - {clicks[button]}
              </Typography>
              <Box display="flex" gap={0.5}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleClick(button, 1)}
                  sx={{
                    height: "100px", // Adjust height as needed
                    opacity: clicks[button] === 0 ? 0.5 : 1,
                    position: "relative",
                  }}
                >
                  +
                  {keyboardEnabled && (
                    <Typography
                      variant="caption"
                      sx={{
                        position: "absolute",
                        bottom: 5,
                        right: 5,
                        opacity: 0.5,
                      }}
                    >
                      {displayKeyMap[button]}
                    </Typography>
                  )}
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleClick(button, -1)}
                  sx={{
                    height: "50px", // Adjust height as needed
                    opacity: clicks[button] === 0 ? 0.5 : 1,
                    position: "relative",
                  }}
                >
                  -
                  {keyboardEnabled && (
                    <Typography
                      variant="caption"
                      sx={{
                        position: "absolute",
                        bottom: 5,
                        right: 5,
                        opacity: 0.5,
                      }}
                    >
                      Shift + {displayKeyMap[button]}
                    </Typography>
                  )}
                </Button>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={2} justifyContent="center" marginTop={2}>
        <Grid item>
          <Button variant="outlined" color="secondary" onClick={handleClear}>
            Clear All
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setKeyboardEnabled((prev) => !prev)}
          >
            {keyboardEnabled ? "Disable Keyboard" : "Enable Keyboard"}
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
