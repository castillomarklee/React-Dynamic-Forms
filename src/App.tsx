import React from 'react';
import './App.css';
import { Box, Heading } from '@chakra-ui/react';
import DynamicFormBuilder from './components/dynamic-form-builder';

function App() {
  return (
    <Box
      p="40px 50px"
      w="100%"
    >
      <Heading as="h1">
        React Dynamic Form Builder
      </Heading>
      <Box mt="50px">
        <DynamicFormBuilder />
      </Box>
    </Box>
  );
}

export default App;
