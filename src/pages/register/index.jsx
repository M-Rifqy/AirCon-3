import React from 'react';
import Navigation3 from '../../components/navbar3';
import Footer from '../../components/footer';
import { Form, Button, FloatingLabel } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import './style.scss';

const validationSchema = yup.object().shape({
  username: yup.string()
               .required('[ ! ] Username is required')
               .matches(/^\S*$/,'[ ! ] Username should not contain spaces'),

  email: yup.string()
            .required('[ ! ] Email is required')
            .email('[ ! ] Invalid email format'),

  password: yup.string()
               .min(8, '[ ! ] Password should more than 8 characters')
               .required('[ ! ] Password is required')
               .matches(/[a-z]/g, '[ ! ] Password should contain at least 1 lowercase')
               .matches(/[A-Z]/g, '[ ! ] Password should contain at least 1 uppercase')
               .matches(/[0-9]/g, '[ ! ] Password should contain at least 1 number')
               .matches(/^\S*$/, '[ ! ] Password should not contain spaces')
})

export default function Register() {

    const handleRegister = async () => {

      const data = formik.values

      await axios
      .post('http://localhost:8080/register', data)
      .then(res => {
        localStorage.setItem('access_token', res.data.accessToken)
        window.location = '/login'
      })
      .catch(err => {
        localStorage.setItem('access_token', 'aaaaaaaa')
        window.location = '/register'
        console.error(err)
      })
    }

    const formik = useFormik({
      initialValues: {
        username: '',
        email: '',
        password: ''
      },
      validationSchema: validationSchema,
      onSubmit: () => handleRegister

    });
    console.log(formik);

    return ( 
      <>
      <Navigation3/>
      <div className='register-page'>
        <Form className='register-container' onSubmit={formik.handleSubmit}>
          <h1 className='r-h1'>Create an Account</h1>

          <Form.Group>
            <FloatingLabel
              className='r-label'
              controlId='floatingInput'
              label='Username *'
            >
              <Form.Control
                type='text'
                name='username'
                placeholder='Username *'
                {...formik.getFieldProps('username')}
              />
            </FloatingLabel>

            {formik.touched.username && formik.errors.username && <div className='r-error'>{formik.errors.username}</div>}
          </Form.Group>

          <Form.Group>
            <FloatingLabel
              className='r-label'
              controlId='floatingInput2'
              label='Email *'
            >
              <Form.Control
                type='email'
                name='email'
                placeholder='Email *'
                {...formik.getFieldProps('email')}
              />
            </FloatingLabel>

            {formik.touched.email && formik.errors.email && <div className='r-error'>{formik.errors.email}</div>}
          </Form.Group>

          <Form.Group>
            <FloatingLabel
              className='r-label'
              controlId='floatingPassword'
              label='Password *'
            >
              <Form.Control
                type='password'
                name='password'
                autoComplete="on"
                placeholder='Password *'
                {...formik.getFieldProps('password')}
              />
            </FloatingLabel>

            {formik.touched.password && formik.errors.password && <div className='r-error'>{formik.errors.password}</div>}
          </Form.Group>

          <Button className='r-btn' type="submit" disabled={formik.isSubmitting}>Register</Button>

          <a className='registered' href='/login'>Already have an account ?</a>
          <br/><br/>
          <p className='agreed'>
            By registering, you agree to AirCon's {" "}
            <a href='/register'>Terms of Service</a> {" "} and {" "}
            <a href='/register'>Privacy Policy</a> {" "}.
          </p>


        </Form>
      </div>
      <Footer/>
      </>
     );
    }