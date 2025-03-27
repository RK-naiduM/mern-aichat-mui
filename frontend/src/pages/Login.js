import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Box, Grid, Link, Paper } from "@mui/material";
import { styled } from "@mui/system";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const response = await fetch("http://52.86.234.22:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      if (data.user.tier === "Platinum") {
        navigate("/platinum");
      } else if (data.user.tier === "Gold") {
        navigate("/gold");
      } else if (data.user.tier === "Silver") {
        navigate("/silver");
      }
    } else {
      setError(data.msg);
    }
  };

  return (
    <StyledContainer>
      <Paper elevation={6} sx={{ padding: 4, borderRadius: 3, textAlign: "center", transition: "transform 0.3s ease", "&:hover": { transform: "scale(1.05)" } }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: "bold", color: "#333", textShadow: "1px 1px 4px rgba(0, 0, 0, 0.4)" }}>
          Login
        </Typography>
        {error && <Typography color="error" sx={{ marginBottom: 2, fontWeight: "bold", fontSize: "1rem" }}>{error}</Typography>}
        
        <form onSubmit={handleSubmit}>
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
          
          <StyledButton
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 2 }}
          >
            Login
          </StyledButton>
        </form>
        
        <Grid container justifyContent="center" sx={{ mt: 2 }}>
          <Grid item>
            <Typography variant="body2" sx={{ fontSize: "0.9rem", color: "191919" }}>
              Not a member? {" "}
              <Link component="button" variant="body2" onClick={() => navigate("/register")}>
                Sign up here
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </StyledContainer>
  );
};

// Styled components with dynamic effects
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
    boxShadow: "0 0 5px 2px rgba(165, 195, 246, 0.5)",
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

export default Login;
