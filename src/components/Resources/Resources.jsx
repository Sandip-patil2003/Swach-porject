import React, { useState } from 'react';
import './Resources.css';
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';

const Resources = () => {
  const resources = [
    {
      title: 'Solid Waste Management Policy',
      description: 'Guidelines for effective municipal solid waste handling.',
      details: `This document outlines the waste segregation, collection, recycling, and disposal protocols followed by the Mahanagar Palika. 
It serves as a framework to manage urban solid waste efficiently and sustainably.

Key aspects include:
- Mandatory segregation of waste at source into wet, dry, and hazardous categories.
- Daily door-to-door collection using GPS-enabled vehicles.
- Scientific processing of biodegradable waste into compost and biogas.
- Routing of dry waste to Material Recovery Facilities (MRFs) for recycling.
- Safe disposal of hazardous and biomedical waste through authorized handlers.
- Prohibition of open dumping and burning, with strict penalties for violators.
- Emphasis on public participation, including RWAs and institutions.
- Implementation aligned with the Solid Waste Management Rules, 2016 and Swachh Bharat Mission objectives.

The policy aims to create a cleaner, healthier city through decentralized waste management, sanitation worker safety, and active citizen engagement.`,

    },
    {
      title: 'Drinking Water Quality Report',
      description: 'Annual report on public water supply quality.',
      details: `The Drinking Water Quality Report provides an annual assessment of the municipal water supply's safety and potability.

Key highlights of the report:
- Regular sampling of water from source, treatment plants, and distribution points.
- Parameters tested include pH, turbidity, chlorine levels, total dissolved solids (TDS), and presence of harmful bacteria.
- All tests are conducted in NABL-accredited laboratories following BIS (IS 10500:2012) standards.
- Monthly water quality charts are published for public transparency.
- Immediate alerts and actions are taken in case of contamination or guideline breaches.
- Details of treatment processes like coagulation, filtration, and chlorination are included.
- Report includes feedback from ward-level water committees and user complaints.
- Ensures compliance with Swachh Jal Abhiyan and Jal Jeevan Mission targets.

The report reinforces our commitment to delivering clean, safe, and sustainable drinking water to all city residents.`,

    },
    {
      title: 'Online Grievance Redressal Portal',
      description: 'Portal for submitting and tracking civic complaints.',
      details: `The Online Grievance Redressal Portal is a digital platform designed to help citizens report civic issues and track their resolution status in real-time.

Key features of the portal:
- Citizens can log complaints related to waste management, water supply, street lighting, drainage, sanitation, and other municipal services.
- Each complaint is assigned a unique tracking ID for transparency.
- Real-time status updates are provided, including when the complaint is received, under review, in progress, or resolved.
- Citizens can upload photos or videos to support their grievance.
- Notifications are sent via SMS or email upon status change.
- Ward officers and department heads are automatically assigned tasks for faster resolution.
- A feedback system allows citizens to rate satisfaction after a complaint is closed.
- Integrated with mobile apps and WhatsApp chatbot for ease of access.
- Data analytics dashboard helps the administration track complaint trends and improve service delivery.
The portal ensures accountability, transparency, and efficient service delivery through technology-driven civic engagement.`,
    },
    {
      title: 'Public Works Project List',
      description: 'Ongoing infrastructure projects in the city.',
      details: `The Public Works Project List provides transparency into ongoing and upcoming infrastructure development projects undertaken by the Mahanagar Palika.

Project categories include:
-  Road construction, repairs, and flyover development
-  Water pipeline upgrades and sewage system expansions
-  Construction of public buildings such as schools, hospitals, and libraries
-  Urban beautification, park development, and green belt initiatives
-  Slum rehabilitation and affordable housing schemes
-  Streetlight installation and electrification drives

Each listed project includes:
- Project title and description
- Location and ward number
- Estimated budget and funding source
- Project start and expected completion dates
- Contractor or executing agency details
- Current status: Planned, In Progress, Delayed, or Completed
- Public feedback section for suggestions and complaints
Citizens can track progress and suggest improvements, promoting transparency and participatory governance.`,

    },
    {
      title: 'Sanitation Worker Safety Guidelines',
      description: 'Safety and health procedures for field workers.',
      details: `The Sanitation Worker Safety Guidelines are designed to ensure the health, dignity, and safety of frontline sanitation workers who are essential to maintaining urban hygiene.

Key components include:

🧤 **Protective Gear:**
- Mandatory use of gloves, masks, boots, safety goggles, and reflective vests.
- Regular provision and replacement of personal protective equipment (PPE).

🩺 **Health & Medical Support:**
- Periodic health check-ups and vaccinations (e.g., tetanus, hepatitis B).
- Immediate medical attention for injuries or exposure to biohazards.
- Health insurance coverage under municipal or state schemes.

🧑‍🏫 **Training & Awareness:**
- Induction and refresher training on hygiene practices and safe waste handling.
- Awareness of hazardous materials and safe disposal techniques.

🚫 **Prohibition of Manual Scavenging:**
- Strict enforcement of The Prohibition of Employment as Manual Scavengers and their Rehabilitation Act, 2013.
- Promotion of mechanized tools and equipment for sewer and septic tank cleaning.

🧑‍⚖️ **Rights & Welfare:**
- Legal protection against discrimination and harassment.
- Access to clean drinking water, rest zones, and toilet facilities at work sites.
- Emergency response protocols and grievance redressal mechanisms.

The guidelines are enforced in collaboration with labor departments, health officers, and NGOs to uphold the dignity and rights of sanitation workers.`,


    },
  ];

  const [selectedResource, setSelectedResource] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleView = (resource) => {
    setSelectedResource(resource);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedResource(null);
  };

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
              <Card className="h-100 shadow-sm resource-card">
                <Card.Body style={{ backgroundColor: '#f0f4f8' }}>
                  <Card.Title>{res.title}</Card.Title>
                  <Card.Text>{res.description}</Card.Text>
                  <div className="d-flex justify-content-end">
                    <Button variant="outline-primary" onClick={() => handleView(res)}>
                      View
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>


      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedResource?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <ReactMarkdown>{selectedResource?.details || ''}</ReactMarkdown>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Resources;
