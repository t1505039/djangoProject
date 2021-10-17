import React, {useEffect, useState} from "react";
import { Button, Form, Row, Col, FormControl } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import moment from "moment"
import {  useParams } from 'react-router-dom';

import { saveUserData, getUserData, updateUserData } from "../../api/api";

function SignUp(props) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState(new Date());
    const [avatar, setAvatar] = useState();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { id } = useParams();

    useEffect( async () => {
        if (id) {
            const userData = await getUserData(id);
            setFirstName(userData.first_name);
            setLastName(userData.last_name);
            setAvatar(userData.avatar);
            setEmail(userData.email);
            setPassword(userData.password);
        }
    }, [])

    const onFirstNameChange = e => {
        setFirstName(e.target.value);
    };

    const onLastNameChange = e => {
        setLastName(e.target.value);
    };

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const onPictureChange = async e => {
        const base_string = await toBase64(e.target.files[0]);
        setAvatar(base_string);
    };

    const onEmailChange = e => {
        setEmail(e.target.value);
    };

    const onPasswordChange = e => {
        setPassword(e.target.value);
    };

    const onSubmit = async () => {
        const payload = {
            first_name: firstName,
            last_name: lastName,
            date_of_birth: moment(dateOfBirth).format('YYYY-MM-DD'),
            avatar,
            email,
            password,
        };

        try {
            const response = await saveUserData(payload);
            window.location.href=`http://localhost:3000/${response.id}/dashboard`;
        } catch (error) {
            console.log("=============>", error);
        }

    };

    const onUpdate = async () => {
        const payload = {
            first_name: firstName,
            last_name: lastName,
            date_of_birth: moment(dateOfBirth).format('YYYY-MM-DD'),
            avatar,
            email,
            password,
        };

        try {
            const response = await updateUserData(id, payload);
            window.location.href=`http://localhost:3000/${response.id}/dashboard`;
        } catch (error) {
            console.log("=============>", error);
        }
    };

    const isInvalidForm = () => {
        return !firstName || !lastName || !dateOfBirth ||
        !avatar || !email || !password;
    };


    return(
        <div>
            {id && <div><img src={avatar} style={{'width': '100px', 'height': '100px'}}/></div>}
            <div style={{width: '40%'}}>
                <Row>
                    <Col>
                    <Form.Label>First Name</Form.Label>
                    </Col>
                    <Col>
                    <FormControl type="text" value={firstName} placeholder="First Name" onChange={onFirstNameChange} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <Form.Label>Last Name</Form.Label>
                    </Col>
                    <Col>
                    <FormControl type="text" value={lastName} placeholder="Last Name" onChange={onLastNameChange} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <Form.Label>Date Of Birth</Form.Label>
                    </Col>
                    <Col>
                        <DatePicker selected={dateOfBirth} onChange={(date) => setDateOfBirth(date)} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <Form.Label>Email address</Form.Label>
                    </Col>
                    <Col>
                    <FormControl type="email" value={email} placeholder="Enter email" onChange={onEmailChange}  disabled={!!id}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <Form.Label>Picture</Form.Label>
                    </Col>
                    <Col>
                        <input type="file" onChange={onPictureChange} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <Form.Label>Password</Form.Label>
                    </Col>
                    <Col>
                    <FormControl type="password" value={password} placeholder="Password" onChange={onPasswordChange} />
                    </Col>
                </Row>
                <Row style={{marginTop: '20px'}}>
                    <Col  />
                    <Col>
                    {!id ?(<Button onClick={onSubmit} disabled={isInvalidForm()} variant={isInvalidForm() ? "danger" : "primary"}>
                        submit
                    </Button>) :
                    (<Button onClick={onUpdate} disabled={isInvalidForm()} variant={isInvalidForm() ? "danger" : "primary"}>
                        update
                    </Button>)}
                    </Col>
                </Row>
            </div>
        </div>
    );

};

export default SignUp;
