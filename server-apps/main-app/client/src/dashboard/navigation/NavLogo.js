import React from 'react';
import Image from 'grommet/components/Image';

class NavLogo extends React.Component {
  render() {
    let imgUrl;
    if (this.props.color === 'white') {
      imgUrl = '/static/IotHub-logo-white.png';
    } else {
      imgUrl = '/static/IotHub-logo.png';
    }
    return (
      <Image src={imgUrl} className='nav-logo' alt='IotHub'/>
    )
  }
}

export default NavLogo;
