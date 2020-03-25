import React from 'react';
import './App.css';
import Form from './components/Form.js';
import styled from 'styled-components'

function App() {
  return (
    <div className='App'>
      <Title>Welcome New Users</Title>
      <Form />
    </div>
  );
}
const Title = styled.p`
font-size: 3rem;
color: dodgerblue;
`;
export default App;