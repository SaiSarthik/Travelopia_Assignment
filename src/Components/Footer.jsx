import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#333',
        color: '#fff',
        padding: '2rem',
        textAlign: 'center',
        marginTop: 'auto',
      }}
    >
      <Typography variant="body2" sx={{ marginBottom: '1rem' }}>
        &copy; {new Date().getFullYear()} Travelopia_Assignment. All rights reserved.
      </Typography>
      <Typography variant="body2">
        Created with{' '}
        <span role="img" aria-label="Love">
          ❤️
        </span>{' '}
        by <Link href="https://www.example.com" color="inherit" underline="hover">Sarthik</Link>
      </Typography>
    </Box>
  );
};

export default Footer;
