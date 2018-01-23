import React from 'react';
import { Card, Col, Row } from 'antd';
import "./dashboard.css"

const cards = <div>
                <Row>
                  <Col span="8">
                  <Card title="Card title" bordered={ false }>Card content</Card>
                  </Col>
                  <Col span="8">
                  <Card title="Card title" bordered={ false }>Card content</Card>
                  </Col>
                  <Col span="8">
                  <Card title="Card title" bordered={ false }>Card content</Card>
                  </Col>
                </Row>
                <Row>
                  <Col span="16">
                  <Card title="Card title" bordered={ false }>Card content</Card>
                  </Col>
                  <Col span="8">
                  <Card title="Card title" bordered={ false }>Card content</Card>
                  </Col>
                </Row>
                <Row>
                  <Col span="8">
                  <Card title="Card title" bordered={ false }>Card content</Card>
                  </Col>
                  <Col span="16">
                  <Card title="Card title" bordered={ false }>Card content</Card>
                  </Col>
                </Row>
                <Row>
                  <Col span="24">
                  <Card title="Card title" bordered={ false }>Card content</Card>
                  </Col>
                </Row>
                <Row>
                  <Col span="6">
                  <Card title="Card title" bordered={ false }>Card content</Card>
                  </Col>
                  <Col span="6">
                  <Card title="Card title" bordered={ false }>Card content</Card>
                  </Col>
                  <Col span="6">
                  <Card title="Card title" bordered={ false }>Card content</Card>
                  </Col>
                  <Col span="6">
                  <Card title="Card title" bordered={ false }>Card content</Card>
                  </Col>
                </Row>
                <Row>
                  <Col span="6">
                  <Card title="Card title" bordered={ false }>Card content</Card>
                  </Col>
                  <Col span="6">
                  <Card title="Card title" bordered={ false }>Card content</Card>
                  </Col>
                  <Col span="6">
                  <Card title="Card title" bordered={ false }>Card content</Card>
                  </Col>
                  <Col span="6">
                  <Card title="Card title" bordered={ false }>Card content</Card>
                  </Col>
                </Row>
              </div>
class DashboardSample extends React.Component {

  render() {
    return (<div className="dashboard">
              { cards }
            </div>
    );
  }
}

export default DashboardSample;