import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios'

const Main_page = () => {
  const [destination, setDestination] = useState('');
  const [interests, setInterests] = useState('');
  const [travelers, setTravelers] = useState(0);
  const [budget, setBudget] = useState(0);
  const [email, setEmail] = useState('');

  const getRecordsCall = async() => {
      const data = await axios.get('http://localhost:3000/get_requests');
      console.log('data', data.data);
  }

  useEffect(()=>{
    console.log('hello')
    getRecordsCall()
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const obj = {
      destination,
      interests,
      travelers,
      budget,
      email
    };
    console.log('data_AXIOS 1', obj);

    try {
      const response = await axios.post('http://localhost:3000/travel-request', obj);
      console.log('data_AXIOS', response);
      // Handle the response data as needed
    } catch (error) {
      console.error('Failed to submit form:', error);
      // Handle the error
    }
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
        <TextField
          label="Your Email"
          variant="outlined"
          fullWidth
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
