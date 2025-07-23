import React from 'react';
import './What_We_Do.css';
import { Container, Row, Col, Card } from 'react-bootstrap';

const WhatWeDo = () => {
  const services = [
    {
      title: 'Waste Management',
      description:
        'We ensure systematic garbage collection, segregation, recycling, and disposal to maintain cleanliness across the city.',
    },
    {
      title: 'Water Supply',
      description:
        'Providing clean and safe drinking water to all citizens through pipelines, tanks, and regular quality monitoring.',
    },
    {
      title: 'Public Health & Sanitation',
      description:
        'Maintaining hygiene through regular cleaning of roads, public toilets, drainage systems, and fogging drives to control diseases.',
    },
    {
      title: 'Infrastructure Development',
      description:
        'Building and maintaining roads, bridges, street lighting, and other essential civic infrastructure.',
    },
    {
      title: 'Urban Planning & Building Approval',
      description:
        'Controlling city development through zoning, land use regulation, and issuing construction permissions.',
    },
    {
      title: 'Grievance Redressal',
      description:
        'Providing online and offline support for citizens to lodge complaints and track resolution status.',
    },
  ];

  return (
    <div className="what-we-do bg-light min-vh-100 py-5">
      <Container>
        <h2 className="text-center mb-4">🏛️ What We Do – Mahanagar Palika</h2>
        <p className="text-center mb-5">
          The Municipal Corporation is committed to delivering efficient and sustainable civic services to all urban citizens.
        </p>

        <Row>
          {services.map((item, index) => (
            <Col md={6} lg={4} key={index} className="mb-4">
              <Card className="shadow-sm h-100 card-hover">
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>{item.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default WhatWeDo;
