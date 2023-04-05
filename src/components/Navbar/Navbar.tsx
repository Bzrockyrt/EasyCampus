// @ts-ignore
// @ts-ignore
import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Image,
} from '@chakra-ui/react';
import DesktopSubNav from './components/DesktopNavbar';
import MobileNav from './components/MobileNavbar';
import { CloseIcon } from '@chakra-ui/icons';
import { HamburgerIcon } from '@chakra-ui/icons';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';

export default function Navbar({ userId, setUserId }) {
  const { isOpen, onToggle } = useDisclosure();
  const navigate = useNavigate()

  function logout() {
    signOut(auth).then(() => {
      setUserId(null)
      navigate('/')
    }).catch((error) => {
      console.log(error)
    });
  }

  return (
    <Box position={"sticky"} top={0} width="100%" zIndex={"1"}>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        align={'center'}
        backgroundColor="#48cae4">
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}>
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Image src="easy_campus.png" height="44px" onClick={() => navigate('/')} cursor='pointer' textAlign={useBreakpointValue({ base: 'center', md: 'left' })} />
          {/* <Text
              textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
              fontFamily={'heading'}
              color={useColorModeValue('gray.800', 'white')}>
              Logo
            </Text> */}

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopSubNav />
          </Flex>
        </Flex>
        {userId ?
          <Stack
            flex={{ base: 1, md: 0 }}
            justify={'flex-end'}
            direction={'row'}
            spacing={6}>
            <Button
              fontSize={'sm'}
              fontWeight={400}
              color={'white'}
              variant={'link'}
              onClick={logout}>
              Se déconnecter
            </Button>
            <Button
              display={{ base: 'none', md: 'inline-flex' }}
              fontSize={'sm'}
              fontWeight={600}
              color={'white'}
              bg={'#293b6b'}
              onClick={() => navigate('/profile')}
              _hover={{
                bg: 'pink.300',
              }}>
              Profil
            </Button>
          </Stack>
          : <Stack
            flex={{ base: 1, md: 0 }}
            justify={'flex-end'}
            direction={'row'}
            spacing={6}>
            <Button
              fontSize={'sm'}
              fontWeight={400}
              color={'white'}
              variant={'link'}
              onClick={() => navigate('/signin')}>
              Se connecter
            </Button>
            <Button
              display={{ base: 'none', md: 'inline-flex' }}
              fontSize={'sm'}
              fontWeight={600}
              color={'white'}
              bg={'#293b6b'}
              onClick={() => navigate('/signup')}
              _hover={{
                bg: 'pink.300',
              }}>
              Créer un compte
            </Button>
          </Stack>}
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}
