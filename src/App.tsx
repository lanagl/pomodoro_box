import React from 'react';
import './App.css';
import {Layout} from "./shared/Layout";
import {Header} from "./shared/Header";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import {NoMatch} from "./shared/NoMatch";
import {Statistic} from "./shared/Statistic";
import {Content} from "./shared/Content";

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Header/>
                <Switch>
                    <Redirect to={"/home"} from={"/"} exact/>
                    <Route path="/home" component={Content}/>
                    <Route path="/statistic" component={Statistic}/>
                    <Route component={NoMatch}/>
                </Switch>

            </Layout>
        </BrowserRouter>
    );
}

export default App;