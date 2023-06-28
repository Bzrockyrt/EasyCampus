import { useOutletContext } from 'react-router-dom'
import React from 'react'
import '../style/App.css'
import { Box, Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import UsersPanel from '../components/UsersPanel/UsersPanel';
import Userdata from '../components/Userdata/UserData';
import MatieresPanel from '../components/MatieresPanel/MatieresPanel';
import LessonsPanel from '../components/LessonsPanel/LessonsPanel';
import ReportsPanel from '../components/ReportsPanel/ReportsPanel';

export default function Profile() {
  const [userId, , isAdmin] = useOutletContext()


  return (
    <Flex className='backgroundImage' height={'calc(100vh - 60px)'} width={'100%'} justifyContent={'center'} paddingTop={'10vh'}>
      <Box className='sign-in-css' minWidth={'600px'} width={'70%'} height={'75%'}>
        <Tabs height={'100%'}>
          <TabList height={'10%'}>
            <Tab>Profil</Tab>
            <Tab>Leçons</Tab>
            {isAdmin &&
              <Tab>Utilisateurs</Tab>
            }
            {isAdmin &&
              <Tab>Matières</Tab>
            }
            {isAdmin &&
              <Tab>Signalements</Tab>
            }
          </TabList>
          <TabPanels height={'90%'}>
            <TabPanel height={'100%'} padding={0}>
              <Userdata targetedUserId={userId} dataToDisplay={isAdmin ? ['nom', 'prenom', 'email', 'phone', 'role'] : ['nom', 'prenom', 'email', 'phone']} />
            </TabPanel>
            <TabPanel height={'100%'} padding={0}>
              <LessonsPanel />
            </TabPanel>
            {isAdmin &&
              <TabPanel height={'100%'} padding={0}>
                <UsersPanel />
              </TabPanel>
            }
            {isAdmin &&
              <TabPanel height={'100%'} padding={0}>
                <MatieresPanel />
              </TabPanel>
            }
            {isAdmin &&
              <TabPanel height={'100%'} padding={0}>
                <ReportsPanel />
              </TabPanel>
            }
          </TabPanels>
        </Tabs>
      </Box>
    </Flex>
  )
}