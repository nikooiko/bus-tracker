import React from 'react';
import { connect } from 'react-redux';
import Image from 'grommet/components/Image';

const imgUrl = '/static/BusTrackerLogo-with-text-bottom-horizontal.png';

class HomeLogo extends React.Component {
  render() {
    let full = 'horizontal';
    const mediaType = this.props.mediaType;
    if (mediaType === 'palm') {
      full = 'vertical';
    }
    return (
      <Image src={imgUrl} alt='IotHub' full={full}/>
    )
  }
}


const mapStateToProps = (state) => ({
  mediaType: state.browser.mediaType
});

export default connect(mapStateToProps)(HomeLogo);
