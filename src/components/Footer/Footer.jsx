import React from 'react'
import "./footer.css"

import { Container, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Footer = () => {

  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg='4' className='mb-4' md='6'>
            <div className="logo">

              <div>
                <h1 className='text-white'>Megamart</h1>
              </div>
            </div>

            <p className='footer__text mt-4'>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae modi accusantium veritatis omnis assumenda nulla voluptatibus porro animi consequuntur ratione.
            </p>
          </Col>

          <Col lg='3' md='3' className='mb-4'>
            <div className="footer__quick-links">
              <h4 className="quick__links-title">Top Categories</h4>
              <ListGroup className='footer__contact mb-3'>
                <ListGroupItem className='list ps-0 border-0'>
                  <Link className='item' to='#'>Mobile Phones</Link>
                </ListGroupItem>

                <ListGroupItem className='list ps-0 border-0'>
                  <Link className='item' to='#'>Modern Sofa</Link>
                </ListGroupItem>

                <ListGroupItem className='list ps-0 border-0'>
                  <Link className='item' to='#'>Arm Chair</Link>
                </ListGroupItem>

                <ListGroupItem className='list ps-0 border-0'>
                  <Link className='item' to='#'>Smart Watches</Link>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>

          <Col lg='2' md='3' className='mb-4'>
            <div className="footer__quick-links">
              <h4 className="quick__links-title">Useful Links</h4>
              <ListGroup className='mb-3'>
                <ListGroupItem className='list ps-0 border-0'>
                  <Link className='item' to='/shop'>Shop</Link>
                </ListGroupItem>

                <ListGroupItem className='list ps-0 border-0'>
                  <Link className='item' to='/cart'>Cart</Link>
                </ListGroupItem>

                <ListGroupItem className='list ps-0 border-0'>
                  <Link className='item' to='/login'>Login</Link>
                </ListGroupItem>

                <ListGroupItem className='list ps-0 border-0'>
                  <Link className='item' to='#'>Privacy Policy</Link>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>

          <Col lg='3' md='4'>
            <div className="footer__quick-links">
              <h4 className="quick__links-title">Contact</h4>
              <ListGroup className='mb-3'>
                <ListGroupItem className='list ps-0 border-0'>
                  <span><i className="icon ri-map-pin-line"></i></span>
                  <p>Lorem ipsum dolor sit amet.</p>
                </ListGroupItem>

                <ListGroupItem className='list ps-0 border-0'>
                  <span><i className="icon ri-phone-line"></i></span>
                  <p>(+00)1234567891</p>
                </ListGroupItem>

                <ListGroupItem className='list ps-0 border-0'>
                  <span><i className="icon ri-mail-line"></i></span>
                  <p>example123@gmail.com</p>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>

          <Col lg='12'>
            <p className="footer__copyright">Copyright {year} developed by Gyanangshu Misra. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
