import React, {useEffect, useState} from "react";
import { Button, Form, Row, Col, FormControl } from 'react-bootstrap';
import {  useParams } from 'react-router-dom';

import { getUserData } from "../../api/api";

function Dashboard(props) {
    const initialUserData = {
        first_name: "Tanvir",
        last_name: "Mahmud",
        date_of_birth: "09/28/2021",
        avatar: "",
        email: "tanvir.mahmud@enosisbd.com",
    };
    const [userData, setUserData] = useState(initialUserData);
    const { id } = useParams();
    useEffect( async () => {

        console.log('my id===============>', id)
        const userData = await getUserData(id);
        setUserData(userData);
    }, []);


    const onUpdate = () => {
        window.location.href=`http://localhost:3000/${id}/update`;
    }

    return (
        <div style={{width: '40%'}}>
            <h3 style={{textAlign: 'center'}}>User Information</h3>
            <div style={{textAlign: 'center'}}><img src={userData.avatar} style={{width: '100px'}, {height: '100px'}} /></div>
            <Row>
                <Col>Name: </Col>
                <Col>{userData.first_name} {userData.last_name}</Col>
            </Row>
            <Row>
                <Col>Email: </Col>
                <Col>{userData.email}</Col>
            </Row>
            <Row>
                <Col>Date Of Birth: </Col>
                <Col>{userData.date_of_birth}</Col>
            </Row>
            <Row style={{marginTop: '20px'}}>
                <Col  />
                <Col>
                    <Button onClick={onUpdate} style={{marginLeft: '20px'}}>
                        Update
                    </Button>
                </Col>
            </Row>
        </div>
    );

};

export default Dashboard;
