import React from 'react';
import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux';
import Box from 'grommet/components/Box';
import Anchor from 'grommet/components/Anchor';
import Button from 'grommet/components/Button';
import Header from 'grommet/components/Header';
import Search from 'grommet/components/Search';
import AddIcon from 'grommet/components/icons/base/Add';
import EditIcon from 'grommet/components/icons/base/Edit';
import RemoveIcon from 'grommet/components/icons/base/Trash';
import GrommetList from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import ListPlaceholder from 'grommet-addons/components/ListPlaceholder';
import Navbar from '../navigation/Navbar';
import Loading from '../../common/Loading';
import bindFunctions from '../../utils/bindFunctions';
import { removeStop } from './store/actions';
import { closeSidebar } from '../navigation/sidebar/store/actions';

export class List extends React.Component {
  constructor(props, content) {
    super(props, content);
    bindFunctions(this, ['_onSearch', '_onCreate']);
  }

  _onSearch() {
    // TODO
  }

  _onCreate() {
    if (this.props.sidebarOpened) {
      this.props.closeSidebar();
    }
    this.props.push('/stops/create');
  }

  onEdit(stopId) {
    return () => {
      if (this.props.sidebarOpened) {
        this.props.closeSidebar();
      }
      this.props.push(`/stops/${stopId}/edit`);
    };
  }

  onRemove(stopId) {
    return () => {
      this.props.removeStop(stopId);
    };
  }

  renderStop(stop) {
    const stopId = stop.id;
    return (
      <ListItem
        key={stopId} direction="row" align="center" justify="between" separator='horizontal'
        pad={{horizontal: 'medium', vertical: 'small', between: 'medium'}} responsive={false}
      >
        <span>{stop.label}</span>
        <span>{stopId}</span>
        <Box direction='row'>
          <Anchor
            icon={<EditIcon />} path={`/stops/${stopId}`} a11yTitle={`Edit Stop`}
            onClick={this.onEdit(stopId)} animateIcon={true}
          />
          <Button
            icon={<RemoveIcon />} a11yTitle={`Remove  Stop`}
            onClick={this.onRemove(stopId)}
          />
        </Box>
      </ListItem>
    );
  }

  render() {
    let content;
    if (this.props.stops.isFetching) {
      content = <Loading />;
    } else if (this.props.children) {
      return this.props.children;
    } else {
      const addControl = (
        <Button
          icon={<AddIcon />} path='/stops/create' a11yTitle={`Create  Stop`}
          onClick={this._onCreate}
        />
      );
      const stops = this.props.stops.stops;
      const filteredStops = stops; // dummy for now
      content = (
        <Box>
          <Header size='medium' pad={{ horizontal: 'medium' }}>
            <Search
              inline={true} fill={true} size='medium' placeHolder='Dummy Search (TODO)'
              onDOMChange={this._onSearch} iconAlign='start' responsive={false}
            />
            {addControl}
          </Header>
          <GrommetList selectable={false}>
            <ListItem
              key={0} direction="row" align="center" justify="between" separator='horizontal'
              pad={{horizontal: 'medium', vertical: 'small', between: 'medium'}} responsive={false}
            >
              <span><b>Label</b></span>
              <span><b>Stop ID</b></span>
              <span><b>Actions</b></span>
            </ListItem>
            {stops.map((stop) => this.renderStop(stop))}
          </GrommetList>
          <ListPlaceholder
            filteredTotal={filteredStops.length}
            unfilteredTotal={stops.length}
            emptyMessage='Currently there are no stops.'
          />
        </Box>
      );
    }
    return (
      <Box flex={true}>
        <Navbar page='Stops'/>
        {content}
      </Box>
    );
  }
}

const mapStateToProps = (state) => ({
  sidebarOpened: state.sidebar.opened,
  stops: state.stops
});

const mapDispatchToProps = { removeStop, push: routerActions.push, closeSidebar } ;

export default connect(mapStateToProps, mapDispatchToProps)(List);
