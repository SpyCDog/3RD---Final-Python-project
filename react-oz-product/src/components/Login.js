import React, { useState , useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Alert, Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './styles/Login.css';
import { UserContext } from './UserContext';
import Lottie from 'lottie-react';
import successAnimationData from './styles/lottie/check.json';
import { HOST_URL } from '../constants';




function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(UserContext);
    const [showSuccessAnimation, setShowSuccessAnimation] = useState(false); // New state variable for controlling the animation
            // localStorage.setItem('refreshToken', response.data.refresh); // Not in use but could be used for better security



    const handleSubmit = async (event) => {
        event.preventDefault();
        // Handle successful login
        try {
            const response = await axios.post(HOST_URL + '/token/', {
                username,
                password
            });
            login({
                username: username,
                accessToken: response.data.access, // Assuming this is the token
                refreshToken: response.data.refresh // If you're using refresh tokens
            });            
            
            
            // Show the success animation
             setShowSuccessAnimation(true);
             // Set a timeout to navigate after the animation has had time to play
             setTimeout(() => {
                 navigate('/');
             }, 2350); // Delay the navigation for 3 seconds for the ShowSuccessAnimation.
            
            console.log(username, ': Logged in successfully + checkAnimation');
            
           // Handle login failed
        } catch (error) {
            console.log("LOGIN FAILED:",error)
            const errorMessage = error.response && error.response.data && error.response.data.message
                ? error.response.data.message
                :'Login failed. Please try again.';
            setErrorMessage(errorMessage);
        }
    };

    if (showSuccessAnimation) {
        // Only show the animation and nothing else
        return (
            <div className="animation-container">
                <Lottie
                    animationData={successAnimationData}
                    play
                    className="lottie-animation" // Apply the CSS class here
                />
            </div>
        );
    }

    return (
        <Container className="login-container">
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title className="text-center">Login</Card.Title>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="username">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Enter username" 
                                        value={username} 
                                        onChange={(e) => setUsername(e.target.value)} 
                                    />
                                </Form.Group>

                                <Form.Group controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control 
                                        type="password" 
                                        placeholder="Password" 
                                        value={password} 
                                        onChange={(e) => setPassword(e.target.value)} 
                                    />
                                </Form.Group>

                                {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

                                <Button variant="primary" type="submit" className="w-100 mt-3">Login</Button>

                                <div className="text-center mt-4">
                                    <p>Don't have an account? <Link to="/register">Register here</Link></p>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;
