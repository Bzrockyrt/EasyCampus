import { React, Button, useRef, FormLabel, Input } from 'react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, FormControl } from '@chakra-ui/react'

export default function FilterButton(){
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
      <div>
      <Button onClick={onOpen}>Open Modal</Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>First name</FormLabel>
              <Input placeholder='First name' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Last name</FormLabel>
              <Input placeholder='Last name' />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
      );
}