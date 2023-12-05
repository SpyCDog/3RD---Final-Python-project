import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert, Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './styles/Login.css';


function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('https://oz-products-web.onrender.com/token/', {
                username,
                password
            });
            localStorage.setItem('accessToken', response.data.access);
            console.log('Logged in successfully:', response.data);
            // Handle successful login
        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('Login failed. Please try again.');
            }
        }
    };

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
