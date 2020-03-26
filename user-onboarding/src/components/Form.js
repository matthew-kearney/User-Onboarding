import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import styled from 'styled-components'


const Card = styled.div`
display: flex;
flex-direction: column;

width: 100%;
margin:%;
border: ridge dodgerblue 10px;
    Form {
padding: 10%;
font-size:2rem;
}
button {
    font-size:1.5rem;
    border-radius: 15px;
    color: white;
    background-color: dodgerblue;
    margin: 2%;
}
`;

const inputChange = e => {
    e.persist();
    const newFormData = {
      ...useState,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value
    };
}

const FormCard = ({values, touched, errors, status}) => {
    const [users, setUsers] = useState ([]);
    useEffect(() => {
        console.log("status has changed!", status);
        status && setUsers(users => [...users, status]);
    }, [status]);
    return (

        
<Card>
    <Form>

        <label htmlFor='name'>
            Name    
                    <Field
                id='name'
                type='text'
                name='name'
                placeholder='name'
            />
            {touched.name && errors.name && (
                <p className='errors'>{errors.name}</p>
            )}
        </label>
<br />

        <label htmlFor='email'>
            Email   
                    <Field
                id='email'
                type='text'
                name='email'
                placeholder='email'
            />
            {touched.email && errors.email && (
                <p className="errors">{errors.email}</p>
            )}
        </label>

<br />
        <label htmlFor='password'>
            Password    
                    <Field
                id='password'
                type='text'
                name='password'
                placeholder='password'
            />
            {touched.password && errors.password && (
                <p className="errors">{errors.password}</p>
            )}
        </label>

<br />
        <label htmlFor='service'>
            Terms of Service 
                    <Field as='select' className='service' name='service'>
                <option disabled>Choose an option</option>
                <option value="basic">basic</option>
                <option value="great">great</option>
                <option value="premium">premium</option>
            </Field>
        </label>

        <button type="submit">Submit!</button>

<br/>
        <label htmlFor='terms' className='terms'>
        <input
          type='checkbox'
          name='terms'
          checked={useState.terms}
          onChange={inputChange}
        />
        Terms & Conditions
      </label>


    </Form>

    <pre>{JSON.stringify(values, null, 2)}</pre>
            {users.map(user => (
                <ul key={user.id}>
                    <li>Name: {user.name}</li>
                    <li>Email: {user.email}</li>
                    <li>Password: {user.passward}</li>
                    <li>Term of service: {user.service}</li>
                </ul>
            ))}
</Card>
  )
}

const FormikUserForm = withFormik({
    mapPropsToValues({ name, email, password, service }) {
        return {
            name: name || '',
            email: email || '',
            password: password || '',
            service: service || ''
        };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().required()
    }),
    handleSubmit(values, { setStatus, resetForm }) {
        console.log('submitting', values);
        axios.post("https://reqres.in/api/users/", values)
        .then(response => {
            console.log('success', response);
            setStatus(response.data);
            resetForm();
        })
    }
})(FormCard);
export default FormikUserForm;