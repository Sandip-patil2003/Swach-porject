import React from 'react';
import './Resources.css';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const Resources = () => {
  const resources = [
    {
      title: 'Solid Waste Management Policy',
      description: 'Guidelines for effective municipal solid waste handling.',
    },
    {
      title: 'Drinking Water Quality Report',
      description: 'Annual report on public water supply quality.',
    },
    {
      title: 'Online Grievance Redressal Portal',
      description: 'Portal for submitting and tracking civic complaints.',
    },
    {
      title: 'Public Works Project List',
      description: 'Ongoing infrastructure projects in the city.',
    },
    {
      title: 'Sanitation Worker Safety Guidelines',
      description: 'Safety and health procedures for field workers.',
    },
  ];

  return (
    <div className="resources-page bg-light min-vh-100 py-5">
      <Container>
        <h2 className="text-center mb-4">📚 Resources – Mahanagar Palika</h2>
        <p className="text-center mb-5">
          Explore municipal reports, guidelines, and citizen resources below.
        </p>

        <Row>
          {resources.map((res, index) => (
            <Col key={index} md={6} lg={4} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title>{res.title}</Card.Title>
                  <Card.Text>{res.description}</Card.Text>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="badge bg-secondary">{res.type}</span>
                    <Button variant="outline-primary" disabled>
                      View
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

    </div>
  );
};

export default Resources;
