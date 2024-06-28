import React, { useState } from 'react';
import { Container, Grid, Button, Typography, Box } from '@mui/material';

const App = () => {
  const initialClicks = {
    A1: 0, A2: 0, A3: 0, A4: 0,
    B1: 0, B2: 0, B3: 0, B4: 0,
    C1: 0, C2: 0, C3: 0, C4: 0,
    D1: 0, D2: 0, D3: 0, D4: 0
  };

  const [clicks, setClicks] = useState(initialClicks);

  const handleClick = (button, increment) => {
    setClicks((prevClicks) => ({
      ...prevClicks,
      [button]: prevClicks[button] + increment
    }));
  };

  const handleClear = () => {
    setClicks(initialClicks);
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Click Counter App
      </Typography>
      <Grid container spacing={2}>
        {Object.keys(initialClicks).map((button) => (
          <Grid item xs={3} key={button}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Typography variant="h6">{button} - {clicks[button]}</Typography>
              <Box display="flex" gap={0.5}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleClick(button, 1)}
                  sx={{
                    height: '100px', // Adjust height as needed
                    opacity: clicks[button] === 0 ? 0.5 : 1
                  }}
                >
                  +
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleClick(button, -1)}
                  sx={{
                    height: '50px', // Adjust height as needed
                    opacity: clicks[button] === 0 ? 0.5 : 1
                  }}
                >
                  -
                </Button>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={2} justifyContent="center" marginTop={2}>
        <Grid item>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleClear}
          >
            Clear All
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
