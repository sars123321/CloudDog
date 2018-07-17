import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import Layout from './components/Layout';
import './styles/app.css'
import * as containers from './containers'

export default () => (
  <Layout>
    <Switch>
      <Route path='/pic' component={containers.PicList} />
      <Route path='/video' component={containers.VideoList} />
      <Route path='/upload' component={containers.Upload} />
      <Redirect path="*" to="/pic"></Redirect>
      {/* <Route path='/fetchdata/:startDateIndex?' component={FetchData} /> */}
    </Switch>
  </Layout>
);
