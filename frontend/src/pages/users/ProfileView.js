import React from "react";
import { Card, Button } from 'react-bootstrap';
import Avatar from '@mui/material/Avatar';
import { deepPurple } from '@mui/material/colors';
import Pta from '../../images/pta.jpg';

const ProfileView = ({avator, name, surname, cellphone, address, zipcode, state, city})=>{
    return (
        <>
            <div className="col-md-4">
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={`${avator}`} alt="avator" />
                <Avatar sx={{ bgcolor: deepPurple[500] }}>{'OP'}</Avatar>
                <Card.Body>
                    <Card.Title>{name} {surname}</Card.Title>
                    <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
                </Card>
            </div>
            <div className="col-md-8">222</div>
        </>
    )
}
export default ProfileView;