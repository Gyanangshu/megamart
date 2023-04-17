import React, { useRef } from 'react'
import "./header.css"

import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import useAuth from "../../custom-hooks/useAuth";
import { signOut } from 'firebase/auth';
import {auth} from "../../firebase.config"
import { toast } from 'react-toastify';

import logo from "../../assets/images/eco-logo.png";
import userIcon from "../../assets/images/user-icon.png";

const nav__links = [
  {
    path: 'home',
    display: 'Home'
  },
  {
    path: 'shop',
    display: 'Shop'
  },
  {
    path: 'cart',
    display: 'Cart'
  }
]

const Header = () => {

  const menuRef = React.useRef(null)
  const profileActionRef = React.useRef(null)
  
  const navigate = useNavigate()
  const { currentUser } = useAuth();

  const totalQuantity = useSelector(state => state.cart.totalQuantity)

  const [scrolled, setScrolled] = React.useState(false);

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 200) {
      setScrolled(true);
    }
    else {
      setScrolled(false);
    }
  }

  const logout = () => {
    signOut(auth).then(() => {
      toast.success("Logged Out")
      navigate('/home')
    }).catch(err =>{
      toast.error(err.message)
    })
  }

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll)
  }, [])

  let x = ['header'];
  if (scrolled) {
    x.push('sticky__header')
  }

  const menuToggle = () => menuRef.current.classList.toggle('active__menu')

  const navigateToCart = () => {
    navigate("/cart")
  }

  const toggleProfileActions = () => profileActionRef.current.classList.toggle('show__profileActions')

  return (
    <header className={x.join(" ")}>
      <Container>
        <Row>
          <div className="nav__wrapper">
            <div className="logo">
              <img src={logo} alt="logo" />
              <div>
                <h1>Megamart</h1>
              </div>
            </div>

            <div className='navigation' ref={menuRef} onClick={menuToggle}>
              <ul className='menu'>
                {
                  nav__links.map((item, index) => (
                    <li className='nav__item' key={index}>
                      <NavLink
                        to={item.path}
                        className={(navClass) => navClass.isActive ? "nav__active" : ""
                        }
                      >
                        {item.display}
                      </NavLink>
                    </li>
                  ))
                }
              </ul>
            </div>

            <div className="nav__icons">
              <span className='fav__icon'>
                <i className="ri-heart-line"></i>
                <span className='badge'>1</span>
              </span>
              <span className='cart__icon' onClick={navigateToCart}>
                <i className="ri-shopping-bag-line"></i>
                <span className='badge'>{totalQuantity}</span>
              </span>

              <div className='profile'>
                <motion.img
                  whileTap={{ scale: 1.2 }}
                  src={currentUser ? currentUser.photoURL : userIcon}
                  alt="user"
                  ref={profileActionRef}
                  onClick={toggleProfileActions}
                />

                <div className="profile__actions" ref={profileActionRef} onClick={toggleProfileActions}>
                  {
                    currentUser ? (
                      <span onClick={logout}>Logout</span>
                    ) : (
                      <div className='d-flex align-items-center justify-content-center flex-column'>
                        <Link to='/signup'>Signup</Link>
                        <Link to='/login'>Login</Link>
                      </div>
                    )}
                </div>
              </div>

              <div className="mobile__menu">
                <span onClick={menuToggle}><i className="ri-menu-line"></i></span>
              </div>

            </div>

          </div>
        </Row>
      </Container>
    </header>
  )
}

export default Header
