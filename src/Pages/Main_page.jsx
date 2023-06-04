import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FormControl, MenuItem, Select } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Main_page = () => {
  const [destination, setDestination] = useState('');
  const [interests, setInterests] = useState('');
  const [travelers, setTravelers] = useState(0);
  const [budget, setBudget] = useState(0);
  const [email, setEmail] = useState('');
  const [carouselImages, setCarouselImages] = useState([]);

  const notify = (text) => toast(text);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const obj = {
      destination,
      interests,
      travelers,
      budget,
      email
    };

    try {
      const response = await axios.post(`https://travelopiabe-production.up.railway.app/travel-request`, obj);

      if (response.status === 200) {
        notify('Request Sent Successfully');
        setDestination('');
        setInterests('');
        setTravelers(0);
        setBudget(0);
        setEmail('');
      }
    } catch (error) {
      console.error('Failed to submit form:', error);
      notify('Failed to submit form');
    }
  };

  const fetchCarouselImages = async () => {
    try {
      const response = await axios.get('https://api.unsplash.com/photos/random', {
        params: {
          query: 'destination',
          count: 5,
          client_id: 'mu7afrcEkn_xrkAtAQdAj-_oGcbL9FRjvEIdoDJFK5I',
        },
      });
      const images = response.data.map((item) => item.urls.regular);
      setCarouselImages(images);
    } catch (error) {
      console.error('Error fetching carousel images:', error);
    }
  };

  useEffect(() => {
    fetchCarouselImages();
  }, []);

  return (
    <>
   
      {/* Carousel */}
      {carouselImages.length > 0 && (
        <Carousel
          showArrows={true}
          infiniteLoop={true}
          autoPlay={true}
          interval={5000}
          showThumbs={false}
          showStatus={false}
          height={'200px'}
        >
          {carouselImages.map((image, index) => (
            <div key={index}>
              <img style={{height:'900px', width:'100%',  objectFit:"cover"}}  src={image} alt={`Image ${index}`} />
            </div>
          ))}
        </Carousel>
      )}
    <Box
      component="main"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        padding: '2rem',
      }}
    >
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    
      <FormControl component="form" onSubmit={handleSubmit}>
        <TextField
          label="Where do you want to go"
          variant="outlined"
          fullWidth
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          sx={{ marginBottom: '1rem' }}
        />
        <Select
          value={interests}
          onChange={(e) => setInterests(e.target.value)}
          variant="outlined"
          fullWidth
          displayEmpty
          sx={{ marginBottom: '1rem' }}
        >
          <MenuItem value="" disabled>
            Select Interests
          </MenuItem>
          <MenuItem value="Beach">Beach</MenuItem>
          <MenuItem value="Adventure">Adventure</MenuItem>
          <MenuItem value="Culture">Culture</MenuItem>
          <MenuItem value="Nature">Nature</MenuItem>
        </Select>
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
          required
          label="Your Email"
          variant="outlined"
          fullWidth
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ marginBottom: '1rem' }}
        />
        <Button variant="contained" type="submit">
          Create my Trip
        </Button>
      </FormControl>
    </Box>
    </>
  );
};

export default Main_page;
