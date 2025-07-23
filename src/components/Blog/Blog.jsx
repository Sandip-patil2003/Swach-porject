import React, { useState } from 'react';
import './Blog.css';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

// Helper to generate recent dates
function getRecentDate(daysAgo) {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
}

const blogPosts = [
  {
    title: 'Swachh Bharat Success Stories',
    date: getRecentDate(2),
    author: 'Mahanagar Palika Team',
    excerpt:
      'Discover inspiring case studies from various city wards where citizen participation transformed sanitation efforts.',
  },
  {
    title: 'Rainwater Harvesting Initiatives',
    date: getRecentDate(5),
    author: 'Environmental Cell',
    excerpt:
      'Explore how the city is embracing sustainable water solutions through rooftop harvesting and groundwater recharge.',
  },
  {
    title: 'Smart Waste Segregation Tips',
    date: getRecentDate(9),
    author: 'Waste Management Dept.',
    excerpt:
      'Learn simple, effective tips to segregate your household waste correctly and support municipal recycling.',
  },
  {
    title: 'Urban Greening Projects',
    date: getRecentDate(15),
    author: 'Parks & Gardens Department',
    excerpt:
      'From community gardens to vertical green walls, see how the city is adding more green to urban spaces.',
  },
  {
    title: 'Plastic-Free Campaign Drive',
    date: getRecentDate(20),
    author: 'Eco Awareness Committee',
    excerpt:
      'See how schools, markets, and societies are adopting plastic-free practices and contributing to a cleaner environment.',
  },
  {
    title: 'Smart Lighting in Public Spaces',
    date: getRecentDate(25),
    author: 'Urban Infrastructure Dept.',
    excerpt:
      'Discover how smart lighting systems are improving safety and reducing power consumption across the city.',
  },
];

const Blog = () => {
  const [selectedPost, setSelectedPost] = useState(null);

  return (
    <div className="blog-page bg-light min-vh-100 py-5">
      <Container>
        <h2 className="text-center mb-4">📝 Mahanagar Palika Blog</h2>
        <p className="text-center mb-5">
          Stay updated with civic insights, environmental efforts, and citizen-led initiatives.
        </p>

        {selectedPost ? (
          <Row className="justify-content-center">
            <Col md={10} lg={8}>
              <Card className="shadow-sm p-4">
                <Card.Body>
                  <Card.Title>{selectedPost.title}</Card.Title>
                  <Card.Subtitle className="mb-3 text-muted">
                    {selectedPost.date} • {selectedPost.author}
                  </Card.Subtitle>
                  <Card.Text>{selectedPost.excerpt}</Card.Text>
                  <div className="d-flex justify-content-center mt-4">
                    <Button variant="secondary" onClick={() => setSelectedPost(null)}>
                      Back to Blog List
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        ) : (
          <Row>
            {blogPosts.map((post, index) => (
              <Col md={6} lg={4} key={index} className="mb-4">
                <Card className="h-100 shadow-sm blog-card">
                  <Card.Body>
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {post.date} • {post.author}
                    </Card.Subtitle>
                    <Card.Text>{post.excerpt}</Card.Text>
                    <div className="d-flex justify-content-center mt-3">
                      <Button variant="primary" onClick={() => setSelectedPost(post)}>
                        Read More
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
};

export default Blog;
