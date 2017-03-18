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
import { removeOfficialRoute } from './store/routesActions';
import { closeSidebar } from '../navigation/sidebar/store/sidebarActions';

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
    this.props.push('/routes/create');
  }

  onEdit(routeId) {
    return () => {
      if (this.props.sidebarOpened) {
        this.props.closeSidebar();
      }
      this.props.push(`/routes/${routeId}/edit`);
    };
  }

  onRemove(routeId) {
    return () => {
      this.props.removeOfficialRoute(routeId);
    };
  }

  renderRoute(route) {
    const routeId = route.id;
    return (
      <ListItem
        key={routeId} direction="row" align="center" justify="between" separator='horizontal'
        pad={{horizontal: 'medium', vertical: 'small', between: 'medium'}} responsive={false}
      >
        <span>{route.name}</span>
        <span>{routeId}</span>
        <Anchor
          icon={<EditIcon />} path={`/routes/${routeId}`} a11yTitle={`Edit Route`}
          onClick={this.onEdit(routeId)} animateIcon={true}
        />
        <Button
          icon={<RemoveIcon />} a11yTitle={`Remove Official Route`}
          onClick={this.onRemove(routeId)}
        />
      </ListItem>
    );
  }

  render() {
    let content;
    if (this.props.busRoutes.isFetching) {
      content = <Loading />;
    } else if (this.props.children) {
      return this.props.children;
    } else {
      const addControl = (
        <Button
          icon={<AddIcon />} path='/routes/create' a11yTitle={`Create Official Route`}
          onClick={this._onCreate}
        />
      );
      const routes = this.props.busRoutes.routes;
      const filteredRoutes = routes; // dummy for now
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
            {routes.map((route) => this.renderRoute(route))}
          </GrommetList>
          <ListPlaceholder
            filteredTotal={filteredRoutes.length}
            unfilteredTotal={routes.length}
            emptyMessage='You do not have any official routes.'
          />
        </Box>
      );
    }
    return (
      <Box flex={true}>
        <Navbar page='Routes'/>
        {content}
      </Box>
    );
  }
}

const mapStateToProps = (state) => ({
  sidebarOpened: state.sidebar.opened,
  busRoutes: state.busRoutes
});

const mapDispatchToProps = { removeOfficialRoute, push: routerActions.push, closeSidebar } ;

export default connect(mapStateToProps, mapDispatchToProps)(List);
