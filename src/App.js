
import React from 'react';
import {Routes,Route} from 'react-router-dom';
import Novels from './components/Novels';
import CreateNovel from './components/CreateNovel';
import Footer from './components/Footer';

import Login from './components/Login';
import MenuBar from './components/MenuBar';
import MyNovels from './components/MyNovels';
import PageNotFound from './components/PageNotFound';
import Register from './components/Register';
import NovelDescription from './components/NovelDescription';
import EditNovel from './components/EditNovel';
function App() {
  return (
    <>

<MenuBar/>
    
    <Routes>
      <Route  path='/' element={<Novels/>}   />
      <Route  path='/Login' element={<Login/>}      />
      <Route  path='/Register' element={<Register/>}  />
       <Route path='/user/novels' element={<MyNovels/>}  />
       <Route  path='/create/novels' element={<CreateNovel/>}  />
      <Route path ='/novel/Edit' element={<EditNovel/>}/>
      <Route path='/novel/Description' element={<NovelDescription/>}/>
      <Route  path='*'  element={<PageNotFound/>}  />
    </Routes>

    <Footer/>
    </>
  );
}

export default App;
