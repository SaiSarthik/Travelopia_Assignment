import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Main_page = () => {
  const [destination, setDestination] = useState('');
  const [interests, setInterests] = useState('');
  const [travelers, setTravelers] = useState('');
  const [budget, setBudget] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform actions with the form data (e.g., saving, API call)
    console.log('Destination:', destination);
    console.log('Interests:', interests);
    console.log('Number of Travelers:', travelers);
    console.log('Budget per Person:', budget);
  };

  return (
    <Box component="main" sx={{ padding: '2rem' }}>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Where do you want to go"
          variant="outlined"
          fullWidth
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          sx={{ marginBottom: '1rem' }}
        />
        <TextField
          label="Interests"
          variant="outlined"
          fullWidth
          value={interests}
          onChange={(e) => setInterests(e.target.value)}
          sx={{ marginBottom: '1rem' }}
        />
        <TextField
          label="Number of travelers"
          variant="outlined"
          type="number"
          fullWidth
          value={travelers}
          onChange={(e) => setTravelers(e.target.value)}
          inputProps={{ min: 0 }}
          sx={{ marginBottom: '1rem' }}
        />
        <TextField
          label="Budget per person"
          variant="outlined"
          type="number"
          fullWidth
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          sx={{ marginBottom: '1rem' }}
        />
        <Button variant="contained" type="submit">
          Create my Trip
        </Button>
      </form>
    </Box>
  );
};

export default Main_page;
