// Importon React dhe hooks-at qe duhen per state, context dhe efektet.
import React, { useState, useContext, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom"
// Importon context-in global te perdoruesit.
import { UserContext } from "./UserContext";
const LogIn = () => {
    // Merr userInfo dhe funksionin per perditesimin e tij nga context-i.
    const { userInfo, setUserInfo, authLoading } = useContext(UserContext);
    const [userLog, setUserLog] = useState({
        email: "",
        password: "",
    });
    const nav = useNavigate()
    const handleChange = (e) => { setUserLog({ ...userLog, [e.target.name]: e.target.value }); };
    useEffect(() => {
        if (authLoading) {
            return;
        }
        // Nese userInfo ekziston dhe ka id, atehere eshte i autentikuar.
        if (userInfo && userInfo.id) {
            // Navigon te faqja e perdoruesit.
            nav("/user");
        }
    }, [authLoading, userInfo, nav]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Dergon kredencialet te endpoint-i i login-it me cookie credentials.
        await axios.post("http://localhost:5000/login/", userLog, { withCredentials: true })
            .then((res) => {
                setUserInfo(res.data || {});
                nav("/user/");
            })
            .catch((err) => console.log("Error not loged" + err));
    };
    return (
        <Container>
            <h1>Login Form</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" value={userLog.email} name="email" onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={userLog.password} name="password" onChange={handleChange} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
        </Container>
    );
};
export default LogIn;