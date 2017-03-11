import React from 'react';
import { connect } from 'react-redux';
import Box from 'grommet/components/Box';
import Value from 'grommet/components/Value';
import Accordion from 'grommet/components/Accordion';
import AccordionPanel from 'grommet/components/AccordionPanel';
import AllIcon from 'grommet/components/icons/base/Robot';
import Status from 'grommet/components/icons/Status';

import Navbar from './navigation/Navbar';
import Loading from '../common/Loading';

export class DashboardIndex extends React.Component {
  render() {
    const { mediaType, user, devicesCount } = this.props;
    let valueSize = 'large';
    let iconSize = 'large';
    if (mediaType === 'palm') {
      valueSize = 'medium';
    }
    let devicesInfo = <Loading />;
    if ( devicesCount ) {
      devicesInfo = (
        <Box
          direction='row' flex={true} justify='between'
          pad={{between:'small'}}
        >
          <Box
            direction='row' responsive={false} justify='between' flex={true}
            pad={{between:'small'}}
          >
            <Box
              align='center' direction='column' pad='small'
              colorIndex='grey-5' flex={true}
            >
              <Value
                icon={<AllIcon size={iconSize} />}
                label='All Devices' value={devicesCount.all} size={valueSize}
              />
            </Box>
            <Box
              align='center' direction='column' pad='small'
              colorIndex={ status.online.colorIndex } flex={true}
            >
              <Value
                icon={<Status value={ status.online.value } size={iconSize} />}
                label='Online' value={devicesCount.online} size={valueSize}
              />
            </Box>
          </Box>
          <Box
            direction='row' responsive={false} justify='between' flex={true}
            pad={{between:'small'}}
          >
            <Box
              align='center' direction='column' pad='small'
              colorIndex={ status.offline.colorIndex } flex={true}
            >
              <Value
                icon={<Status value={ status.offline.value } size={iconSize} />}
                label='Offline' value={devicesCount.offline} size={valueSize}
              />
            </Box>
            <Box
              align='center' direction='column' pad='small'
              colorIndex={ status.deactivated.colorIndex } flex={true}
            >
              <Value
                icon={<Status value={ status.deactivated.value } size={iconSize} />}
                label='Deactivated' value={devicesCount.deactivated} size={valueSize}
              />
            </Box>
          </Box>
        </Box>
      );
    }
    return (
      <Box>
        <Navbar page='Dashboard'/>
        <Box margin={{top: 'small', horizontal: 'small'}} pad='none'>
          { devicesInfo }
        </Box>
        <Box margin={{top: 'small', horizontal: 'small'}} pad='none' colorIndex='light-2'>
          <Accordion openMulti={true} animate={false}>
            <AccordionPanel heading='User Information' pad='small'>
              <Box>
                <strong>Owner ID:</strong>
                <span>{ user.id }</span>
              </Box>
            </AccordionPanel>
            <AccordionPanel heading='Shortcuts and Actions' pad='small'>
              <Box>
                Shortcuts && Actions
              </Box>
            </AccordionPanel>
          </Accordion>
        </Box>
      </Box>
    );
  }
}

const mapStateToProps = (state) => ({
  mediaType: state.browser.mediaType,
  user: state.auth.user
});

export default connect(mapStateToProps)(DashboardIndex);
