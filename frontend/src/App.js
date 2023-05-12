import './App.css';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router';
import NotFound from './screens/NotFound/NotFound';
import Home from './screens/Home/Home';
import DevicesMenu from './screens/DevicesMenu/DevicesMenu';
import PlaylistsMenu from './screens/PlaylistsMenu/PlaylistsMenu';
import MediaMenu from './screens/MediaMenu/MediaMenu';
import NewPlaylist from './screens/NewPlaylist/NewPlaylist';
import AddDevice from './screens/AddDevice/AddDevice';
import ViewDevices from './screens/ViewDevices/ViewDevices';
import ModifyDevice from './screens/ModifyDevice/ModifyDevice';
import AddMedia from './screens/AddMedia/AddMedia';
import ViewMedia from './screens/ViewMedia/ViewMedia';
import ViewPlaylists from './screens/ViewPlaylists/ViewPlaylists';
import AssignFile from './screens/AssignFile/AssignFile';

function App() {
  return (
    <Routes>
      <Route path="/home" element={<Home />}></Route>
      <Route path="/" element={<Home />}></Route>
      <Route path="/devices-menu" element={<DevicesMenu />}></Route>
      <Route path="/playlists-menu" element={<PlaylistsMenu />}></Route>
      <Route path="/media-menu" element={<MediaMenu />}></Route>
      <Route path="/new-playlist" element={<NewPlaylist />}></Route>
      <Route path="/add-device" element={<AddDevice />}></Route>
      <Route path="/view-devices" element={<ViewDevices />}></Route>
      <Route path="/modify-device/:device_id" element={<ModifyDevice />}></Route>
      <Route path="/add-media" element={<AddMedia />}></Route>
      <Route path="/view-media" element={<ViewMedia />}></Route>
      <Route path="/view-playlists" element={<ViewPlaylists />}></Route>
      <Route path="/assigned-files/:playlist_id" element={<AssignFile />}></Route>
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
}

export default App;
