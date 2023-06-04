import axios from "axios";
import { useEffect, useState } from "react";
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
const AdminPage = () => {
  const [travalopians, setTravalopians] = useState([]);
  const [imageUrls, setImageUrls] = useState({});

  const navigate = useNavigate();
  const navigateToHome = () => {
    navigate("/");
    }; 

  const getRecordsCall = async () => {
    try {
      const response = await axios.get("https://travelopiabe-production.up.railway.app/get_requests");
      const data = response.data;
      setTravalopians(data);

      const urls = {};
      for (const item of data) {
        const query = encodeURIComponent(item.destination);
        const url = `https://api.unsplash.com/photos/random?query=${query}&client_id=mu7afrcEkn_xrkAtAQdAj-_oGcbL9FRjvEIdoDJFK5I`;
        
        try {
          const res = await axios.get(url);
          urls[item._id] = res.data.urls.small;
        } catch (error) {
          console.log(`Error fetching image for destination ${item.destination}:`, error);
          urls[item._id] = null; // Set image URL as null for unsuccessful requests
        }
      }
      
      setImageUrls(urls);
    } catch (error) {
      console.log("Error fetching records: ", error);
    }
  };

  const StyledCard = styled(Card)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: 345,
    marginBottom: theme.spacing(2),
  }));

  useEffect(() => {
    getRecordsCall();
  }, []);

  const notify = (text) => toast(text);

  const handleDelete = async (id) => {
    setTravalopians((prev) => prev.filter((each) => each._id !== id));

    try {
      const response = await axios.delete(
        `https://travelopiabe-production.up.railway.app/delete_request/${id}`
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

  if (travalopians.length === 0) {
    return <h1 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>No records found.</h1>;
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
          <CardContent>
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
              {each.email}
            </Typography>
          </CardContent>
          <IconButton
            className="delete-button"
            aria-label="delete"
            onClick={() => handleDelete(each._id)}
          >
            <DeleteIcon />
          </IconButton>
        </StyledCard>
      ))}
    </div>
    </>

  );
};

export default AdminPage;
