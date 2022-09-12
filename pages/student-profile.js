import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import useSWR from 'swr';
import { signOut, useSession, getSession } from "next-auth/react";
import { useRouter } from 'next/router'
import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image'
import ListGroup from 'react-bootstrap/ListGroup';

const TutorialLink = ({tutorial}) => {
    return (
    <Button>
        <Link href="/add-student-preferences">
          <p>{tutorial}</p>
        </Link>
    </Button>
    )
}

export default function StudentProfile() {
  const { data: session } = useSession();
  const router = useRouter()
  //  useEffect(() => {
  //   if (!session) {
  //       router.push('/student-login')
  //   }
  // })
  //   useEffect(() => {
  //     fetch('url') 
  //       .then(res => {
  //         return res.json();
  //       })  
  //       .then(data => {
  //         console.log(data);
  //         setSession(data)
  //     })
  // }, [])

  return (
    <>
     <div>
      <h1>
        My Student Profile
      </h1>
        <Image src="https://thumbs.dreamstime.com/b/closeup-super-mario-character-nintendo-platform-game-video-red-background-photographed-site-screen-149088103.jpg" thumbnail />  
  </div> 
  
<Form>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
          <Form.Label column sm="2">
            <span style={{ fontWeight: 'bold' }}> Student Name: </span>
          </Form.Label>
          <Col sm="10">
          <Form.Control plaintext readOnly defaultValue="Mario" />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextStudentID">
          <Form.Label column sm="2">
            <span style={{ fontWeight: 'bold' }}>  Student ID: </span>
          </Form.Label>
          <Col sm="10">
            <Form.Control plaintext readOnly defaultValue="123456789" />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextStudyYear">
          <Form.Label column sm="2">
            <span style={{ fontWeight: 'bold' }}>   Study Year: </span>
          </Form.Label>
          <Col sm="10">
            <Form.Control plaintext readOnly defaultValue="2rd Year" />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
          <Form.Label column sm="2">
            <span style={{ fontWeight: 'bold' }}>   Student Email: </span>
          </Form.Label>
          <Col sm="10">
            <Form.Control plaintext readOnly defaultValue="mario.bros@student.uts.edu.au" />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextCourse">
          <Form.Label column sm="2">
            <span style={{ fontWeight: 'bold' }}>   Course: </span>
          </Form.Label>
          <Col sm="10">
            <Form.Control plaintext readOnly defaultValue="Bachelors of fixing pipe (Hons)" />
          </Col>
        </Form.Group>
      </Form>
<div>
          <ListGroup horizontal>
            <ListGroup.Item>Subject Name</ListGroup.Item>
            <ListGroup.Item>41201</ListGroup.Item>
            <ListGroup.Item>
              <a  href="https://www.google.com/">
                <p>Admin Details Link</p>
              </a>
            </ListGroup.Item>
          </ListGroup>
        </div><div>
            <ListGroup horizontal>
              <ListGroup.Item>Subject Name</ListGroup.Item>
              <ListGroup.Item>41202</ListGroup.Item>
              <ListGroup.Item><a href="https://www.google.com/">
                
                  <p>Admin Details Link</p>
              
              </a></ListGroup.Item>
            </ListGroup>
          </div><div>
            <ListGroup horizontal>
              <ListGroup.Item>Subject Name</ListGroup.Item>
              <ListGroup.Item>41203</ListGroup.Item>
              <ListGroup.Item><a href="https://www.google.com/">
                  <p>Admin Details Link</p>
              
              </a></ListGroup.Item>
            </ListGroup>
          </div>

    </>
  )
}
  
   


