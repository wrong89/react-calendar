import React from 'react';
import './App.scss';
import Layout from "./components/Layout/Layout";
import Main from "./pages/Main";
import {Route, Routes} from "react-router-dom";
import History from "./pages/History";
import Error from "./pages/Error";

function App() {
    return (
        <div className="App">
            <Layout>
                <Routes>
                    <Route path={'/'} element={<Main/>}/>
                    <Route path={'/history'} element={<History/>}/>
                    <Route path={'*'} element={<Error/>}/>
                </Routes>
            </Layout>
        </div>
    );
}

export default App;