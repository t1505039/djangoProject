import React, {useEffect, useState} from "react";
import { Button, Form, Row, Col, FormControl } from 'react-bootstrap';

import { userLogin } from "../../api/api";

import './style.css';

function Login(props) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const onEmailChange = e => {
        setEmail(e.target.value);
    };

    const onPasswordChange = e => {
        setPassword(e.target.value)
    };

    const onLogin = async () => {
        const payload = {
            email,
            password,
        };
        try {
            const response = await userLogin(payload);
            window.location.href=`http://localhost:3000/${response.id}/dashboard`;
        } catch (error) {
            
        }
        
    };

    const onSignup = () => {
        window.location.href='http://localhost:3000/sign-up';
    };

    const renderLoginForm = () => {
        return(
            <div>
                <div style={{width: '40%'}}>
                    <Row>
                        <Col>
                        <Form.Label>Email address</Form.Label>
                        </Col>
                        <Col>
                        <FormControl type="email" value={email} placeholder="Enter email" onChange={onEmailChange} />
                        </Col>
                    </Row>
                    <Row className="mb-3" style={{marginTop: '20px'}}>
                        <Col>
                        <Form.Label>Password</Form.Label>
                        </Col>
                        <Col>
                        <FormControl type="password" value={password} placeholder="Enter password"  onChange={onPasswordChange}/>
                        </Col>
                    </Row>
                    <Row style={{marginTop: '20px'}}>
                        <Col  />
                        <Col>
                        <Button onClick={onLogin}>
                            Login
                        </Button>
                        <Button onClick={onSignup} style={{marginLeft: '20px'}}>
                            Signup
                        </Button>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    };

    return renderLoginForm();
};

export default Login;
