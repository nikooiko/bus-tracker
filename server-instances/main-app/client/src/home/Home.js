import React from 'react';
import Article from 'grommet/components/Article';
import Section from 'grommet/components/Section';
import Box from 'grommet/components/Box';
import Headline from 'grommet/components/Headline';
import HomeLogo from './HomeLogo';
import HomeNav from './HomeNav';

class Home extends React.Component {
  render() {
    return (
    <Article style={{overflow:'hidden'}} colorIndex='light-2'>
      <Section full={true} pad='none'>
        <Box full='horizontal'>
          <HomeNav/>
        </Box>
        <Box flex={true} responsive={false}>
          <Box direction='row' flex={true} justify='center'>
            <Box basis='1/3' justify='center' pad={{ vertical: 'large' }}>
              <Box basis='2/3' justify='end' pad={{ vertical: 'large' }} align='center'>
                <HomeLogo/>
              </Box>
            </Box>
          </Box>
        </Box>
      </Section>
    </Article>
    )
  }
}

export default Home;
