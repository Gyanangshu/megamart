import React from 'react'
import "../styles/login.css"

import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col, Form, FormGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { setDoc, doc } from 'firebase/firestore';

import { auth } from '../firebase.config';
import { storage } from "../firebase.config";
import { db } from "../firebase.config";

import { toast } from 'react-toastify';

const Signup = () => {

  const [username, setUsername] = React.useState('')
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [file, setFile] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate()

  const signup = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      const storageRef = ref(storage, `images/${Date.now() + username}`)
      const uploadTask = uploadBytesResumable(storageRef, file)

      uploadTask.on((error) => {
        // Handle unsuccessful uploads 
        console.log(error.message)
      },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {

            // update user profile 
            await updateProfile(user, {
              displayName: username,
              photoURL: downloadURL,
            });

            // store user data inn fireb=store database 
            await setDoc(doc(db, 'users', user.uid), {
              uid: user.uid,
              displayName: username,
              email,
              photoURL: downloadURL,
            })
          });
        })

      setLoading(false)
      toast.success("Account created")
      navigate('/login')

    } catch (error) {
      setLoading(false)
      toast.error("Something went wrong")
    }
  }

  return (
    <Helmet title='Signup'>
      <section>
        <Container>
          <Row>
            {
              loading? <Col lg='12' className='text-center'><h5 className='fw-bold'>Loading...</h5></Col> : <Col lg='6' className='m-auto text-center'>
              <h3 className="fw-bold mb-4">Signup</h3>

              <Form className='auth__form' onSubmit={signup}>
                <FormGroup className='form__group'>
                  <input type="text" placeholder='Username' onChange={e => setUsername(e.target.value)} value={username} />
                </FormGroup>
                <FormGroup className='form__group'>
                  <input type="email" placeholder='Enter your email' onChange={e => setEmail(e.target.value)} value={email} />
                </FormGroup>
                <FormGroup className='form__group'>
                  <input type="password" placeholder='Enter password' onChange={e => setPassword(e.target.value)} value={password} />
                </FormGroup>
                <FormGroup className='form__group'>
                  <input type="file"
                    onChange={e => setFile(e.target.files[0])} />
                </FormGroup>

                <button type='submit' className="buy__btn auth__btn">Create an Account</button>
                <p>
                  Already have an account?{" "}
                  <Link to='/login'>Login</Link>
                </p>
              </Form>
            </Col>
            }
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

export default Signup
