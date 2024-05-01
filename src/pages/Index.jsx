import { useState } from 'react';
import { Box, VStack, Input, IconButton, useColorModeValue, Heading, Text, Flex, Spacer, Button } from '@chakra-ui/react';
import { FaPlus, FaTrash } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  const addTask = () => {
    if (input === '') return;
    const newTask = { id: Date.now(), text: input, isCompleted: false };
    setTasks([...tasks, newTask]);
    setInput('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, isCompleted: !task.isCompleted } : task));
  };

  return (
    <Box p={5} bg={useColorModeValue('gray.100', 'gray.700')}>
      <VStack spacing={4}>
        <Flex w="100%">
          <Heading mb={4}>Todo App</Heading>
          <Spacer />
          <Button onClick={() => console.log('Navigate')}>Home</Button>
        </Flex>
        <Flex>
          <Input
            placeholder="Add a task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={event => event.key === 'Enter' && addTask()}
          />
          <IconButton
            icon={<FaPlus />}
            onClick={addTask}
            aria-label="Add task"
          />
        </Flex>
        <VStack spacing={4} align="stretch">
          {tasks.map(task => (
            <Flex key={task.id} p={2} w="100%" borderWidth="1px" borderRadius="lg" bg={useColorModeValue('white', 'gray.600')}>
              <Text as={task.isCompleted ? 's' : ''} cursor="pointer" onClick={() => toggleTask(task.id)}>
                {task.text}
              </Text>
              <Spacer />
              <IconButton
                icon={<FaTrash />}
                onClick={() => deleteTask(task.id)}
                aria-label="Delete task"
              />
            </Flex>
          ))}
        </VStack>
      </VStack>
    </Box>
  );
};

export default Index;