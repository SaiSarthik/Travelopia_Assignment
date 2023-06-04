import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import "./AdminPageCss.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';

const AdminPage = () => {
  const [travalopians, setTravalopians] = useState([]);
  const [imageUrls, setImageUrls] = useState({});

  const [cookies, removeCookie] = useCookies(['token_travelopia'], { path: '/' });
  const token = cookies.token_travelopia;

    const isLoggedIn = token && token?.length > 9  ? true : false;
    
  
    const navigate = useNavigate();
    isLoggedIn ? '' : navigate('/admin/login')
    const navigateToHome = () => {
    navigate("/");
    }; 

  const getRecordsCall = useCallback(async () => {
    try {
      const response = await axios.get("https://travelopiabe-production.up.railway.app/get_requests", {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      const data = response.data;
      setTravalopians(data);

      const urls = {};
      for (const item of data) {
        const query = encodeURIComponent(item.destination);
        const url = `https://api.unsplash.com/photos/random?query=${query}&client_id=mu7afrcEkn_xrkAtAQdAj-_oGcbL9FRjvEIdoDJFK5I&fit=fill&w=400&h=300`;
        
        try {
          const res = await axios.get(url);
          urls[item._id] = res.data.urls.regular;
        } catch (error) {
          console.log(`Error fetching image for destination ${item.destination}:`, error);
          urls[item._id] = null; // Set image URL as null for unsuccessful requests
        }
      }
      
      setImageUrls(urls);
    } catch (error) {
      console.log("Error fetching records: ", error);
    }
  },[token])

  const StyledCard = styled(Card)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: 345,
    marginBottom: theme.spacing(2),
  }));

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/admin/login");
    } else {
      getRecordsCall();
    }
  }, []);

  const notify = (text) => toast(text);

  const handleDelete = async (id) => {
    setTravalopians((prev) => prev.filter((each) => each._id !== id));

    try {
      const response = await axios.delete(
        `https://travelopiabe-production.up.railway.app/delete_request/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
      if (response.status === 200) {
        notify("Deleted Successfully");
      } else {
        notify("Something went wrong");
      }
    } catch (error) {
      console.log("Error deleting record: ", error);
      notify("Something went wrong");
    }
  };

  const  handleLogout = () => {
    removeCookie('token_travelopia');
    navigate('/admin/login');
  }

  if (travalopians.length === 0) {
    return (
      <>
        <h1 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>No records found.</h1>
        <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%'}}>
          <Button onClick={handleLogout} variant='contained' sx={{ width: '150px', padding:'10px', margin:'40px' }}>Logout</Button>
        </div>
      </>
    );
  }

  return (
    <>
    <Button variant="contained" sx={{width:'100px', mt:'40px', ml:'40px'}} onClick={navigateToHome}>Go Back</Button>
    <div className="card-grid">
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
      {travalopians.map((each) => (
        <StyledCard key={each._id}>
          <CardContent style={{display:'flex', flexDirection:'column'}}>
            {imageUrls[each._id] && (
              <img
                src={imageUrls[each._id]}
                alt={each.destination}
                style={{ maxWidth: "100%", maxHeight: "200px", objectFit: "cover" }}
              />
            )}
            <Typography variant="h5" component="h3">
              {each.destination}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {each.interests}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <a href={`mailto:${each.email}`}>{each.email}</a>
            </Typography>
          </CardContent>
          <IconButton
            className="delete-button"
            aria-label="delete"
            style={{alignSelf:'end'}}
            onClick={() => handleDelete(each._id)}
          >
            <DeleteIcon />
          </IconButton>
        </StyledCard>
      ))}
    </div>
    <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%'}}>
      <Button onClick={handleLogout} variant='contained' sx={{ width: '150px', padding:'10px', margin:'40px' }}>Logout</Button>
    </div>
    </>

  );
};

export default AdminPage;
