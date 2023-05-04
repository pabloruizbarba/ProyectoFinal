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
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
}

export default App;
