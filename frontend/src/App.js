import React, {Component} from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import './App.css'
import Header from "./components/header";
import Home from "./components/homePage";
import ProductDetail from "./components/productDetail";
import Cart from "./components/cart";
import {baseUrl} from "./components/baseUrl";


export default class App extends Component{
    constructor(props) {
        super(props);

        this.state ={
            userId: localStorage.userId? localStorage.getItem('userId') : -1
        }
    }

    componentDidMount() {
        if (this.state.userId===-1) {
            fetch(baseUrl + 'cart/user')
                .then(res => res.json())
                .then(res => {
                    localStorage.setItem('userId', res);
                    this.setState({userId: res})
                })
                .catch(e=>console.error(e));
        }
    }

    render() {
        return (
            <Router>
                <div>
                    <Header/>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path='/product/:id' component={ProductDetail} />
                        <Route exact path='/cart' component={Cart} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

