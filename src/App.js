import './App.scss';
import Home from './pages/Home';
import Login from './pages/Login';

import CaseDetail from './pages/Case/Detail';

import EntityDetectionAnnotation from './pages/EntityDetection/Annotations';
import EntityDetectionImport from './pages/EntityDetection/Import';
import EntityDetectionEntities from './pages/EntityDetection/Entities/List';
import EntityDetectionEntitiesForm from './pages/EntityDetection/Entities/Form';

import AudioTranscription from './pages/AudioTranscription';
import Paraphrase from './pages/Paraphrase';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  useParams
} from "react-router-dom";
import { Provider } from 'react-redux';
import store from './reducers/store';
import { fetchUser } from './reducers/users'
import React, { useEffect } from 'react';
import { ApiRequest } from './services/apiRequestService';
import CrudForm from './pages/Crud/CrudForm';

import CrudList from './pages/Crud/CrudList';

import userForm from './data/form/user.json';
import caseForm from './data/form/case.json';
import audioTranscriptionForm from './data/form/audio-transcription.json';

function AppWrapper() {

  return (
    <Provider store={store}>
      <Router>
        <Routes />
      </Router>
    </Provider>
  );
}

function Routes() {

  const history = useHistory();

  useEffect(() => {
    if(ApiRequest.token) {
      store.dispatch(fetchUser());
    } else {
      history.replace("/login");
    }
  }, []);

  const crudRoutes = (prefix, props) => {
    return [
        <Route exact={true} path={`${prefix}/new`}>
          <CrudForm {...props} />
        </Route>,
        <Route exact={true} path={`${prefix}/:id`}>
          <CrudForm {...props} editing={true} />
        </Route>,
        <Route exact={true} path={`${prefix}`}>
          <CrudList {...props} />
        </Route>
    ]
  }

  return (

    <Switch>

      { crudRoutes("/user", { formData: userForm }) }

      { crudRoutes("/case", { formData: caseForm }) }

      <Route path="/case/:projectId/detail">
        <CaseDetail />
      </Route>

      { crudRoutes("/case/:projectId/audio-transcription", { formData: audioTranscriptionForm }) }

      <Route path="/case/:projectId/audio-transcription/:id/view">
        <AudioTranscription />
      </Route>

      <Route path="/entity-detection/import">
        <EntityDetectionImport />
      </Route>

      <Route path="/entity-detection/entities/new">
        <EntityDetectionEntitiesForm />
      </Route>

      <Route path="/entity-detection/entities">
        <EntityDetectionEntities />
      </Route>

      <Route path="/entity-detection/:entityId">
        <EntityDetectionAnnotation />
      </Route>

      <Route path="/paraphrase/:entityId">
        <Paraphrase />
      </Route>

      <Route path="/login">
        <Login />
      </Route>

      <Route path="/">
        <Home />
      </Route>
      
    </Switch>
  )
}

export default AppWrapper;
