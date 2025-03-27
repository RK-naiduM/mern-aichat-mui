import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Box, MenuItem, Select, FormControl, InputLabel, Paper } from "@mui/material";
import { styled } from "@mui/system";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    tier: "", // Default to Silver
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Registration successful! Redirecting to login...");
        navigate("/"); // Redirect to login page after successful registration
      } else {
        setError(data.msg || "Registration failed. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please check your connection.");
    }
  };

  return (
    <StyledContainer>
      <Paper elevation={6} sx={{ padding: 4, borderRadius: 3, textAlign: "center", transition: "transform 0.3s ease", "&:hover": { transform: "scale(1.05)" } }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: "bold", color: "#333", textShadow: "1px 1px 4px rgba(0, 0, 0, 0.4)" }}>
          Register
        </Typography>
        {error && <Typography color="error" sx={{ marginBottom: 2, fontWeight: "bold", fontSize: "1rem" }}>{error}</Typography>}
        
        <form onSubmit={handleSubmit}>
          <StyledTextField
            fullWidth
            label="Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            margin="normal"
            variant="outlined"
          />
          <StyledTextField
            fullWidth
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            margin="normal"
            variant="outlined"
          />
          <StyledTextField
            fullWidth
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            margin="normal"
            variant="outlined"
          />
          <StyledFormControl fullWidth margin="normal">
            <InputLabel>Select Tier</InputLabel>
            <StyledSelect name="tier" value={formData.tier} onChange={handleChange}>
              <MenuItem value="Platinum">Platinum</MenuItem>
              <MenuItem value="Gold">Gold</MenuItem>
              <MenuItem value="Silver">Silver</MenuItem>
            </StyledSelect>
          </StyledFormControl>
          <StyledButton
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 2 }}
          >
            Register
          </StyledButton>
        </form>
      </Paper>
    </StyledContainer>
  );
};

// Styled components for consistent styling
const StyledContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  background: "linear-gradient(135deg, #6E7DFF, #A2C2FF)", // Gradient background with soft blues
  padding: 2,
});

const StyledTextField = styled(TextField)({
  borderRadius: "20px",
  transition: "all 0.3s ease",
  "& .MuiOutlinedInput-root": {
    borderRadius: "20px",
  },
  "& .MuiInputLabel-root": {
    fontWeight: "bold",
    color: "#333", // Darker label color for visibility
  },
  "& .MuiInputBase-root": {
    "&:hover": {
      transform: "scale(1.05)", // Slightly zoom on hover
      transition: "transform 0.2s ease",
    },
  },
  "& .MuiOutlinedInput-root.Mui-focused": {
    borderColor: "#A2C2FF", // Focus effect with a light blue border
    boxShadow: "0 0 5px 2px rgba(162, 194, 255, 0.5)",
  },
});

const StyledFormControl = styled(FormControl)({
  "& .MuiInputLabel-root": {
    fontWeight: "bold",
    color: "#333", // Darker label color for visibility
  },
  "& .MuiSelect-root": {
    borderRadius: "20px",
  },
  "& .MuiSelect-select": {
    padding: "12px 14px",
  },
  "& .MuiSelect-root:hover": {
    transform: "scale(1.05)", // Slight zoom effect on hover
    transition: "transform 0.3s ease",
  },
  "& .MuiOutlinedInput-root.Mui-focused": {
    borderColor: "#A2C2FF", // Focus effect with a light blue border
    boxShadow: "0 0 5px 2px rgba(162, 194, 255, 0.5)",
  },
});

const StyledSelect = styled(Select)({
  borderRadius: "20px",
  "& .MuiSelect-icon": {
    color: "#333", // Dark color for the dropdown arrow
  },
});

const StyledButton = styled(Button)({
  borderRadius: "20px",
  padding: "12px",
  fontWeight: "bold",
  backgroundColor: "#4D6CFF",
  color: "#FFFFFF",
  "&:hover": {
    backgroundColor: "#1C2858",
    transform: "scale(1.1)", // Button scale effect
    transition: "transform 0.3s ease",
  },
});

export default Register;
