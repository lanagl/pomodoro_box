import React from 'react';
import './App.css';
import {Layout} from "./shared/Layout";
import {Header} from "./shared/Header";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import {NoMatch} from "./shared/NoMatch";
import {Statistic} from "./shared/Statistic";
import {Content} from "./shared/Content";
import {Settings} from "./shared/Settings";
import {Wrapper} from "./shared/Wrapper";

function App() {
    return (
        <BrowserRouter>
            <Wrapper>
                <Layout>
                    <Header/>
                    <Switch>
                        <Redirect to={"/home"} from={"/"} exact/>
                        <Route path="/home" component={Content}/>
                        <Route path="/statistic" component={Statistic}/>
                        <Route path="/settings" component={Settings}/>
                        <Route component={NoMatch}/>
                    </Switch>

                </Layout>
            </Wrapper>

        </BrowserRouter>
    );
}

export default App;