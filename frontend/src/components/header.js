import React, {Component} from "react";
import {Jumbotron} from 'reactstrap';
import {Button} from "react-bootstrap";
import Badge from "react-bootstrap/Badge";

class Header extends Component{
    constructor(props) {
        super(props);

        this.state={
            isNavOpen:false,
        };
        this.toggleNav=this.toggleNav.bind(this);
    }

    toggleNav() {
        this.setState({isNavOpen: !this.state.isNavOpen})
    }

    render() {
        return (
            <>
                <Jumbotron className='jumbotron'>
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-10">
                                <h1>üzlet</h1>
                                <p>Just Window Shop, add to Cart.<br />
                                Feel beautiful<br />
                                There is no payment support!!</p>
                            </div>
                            <div className='col'>
                                <Button variant={'flush'} href={`/cart`} >
                                    <span className='fa fa-3x fa-cart-arrow-down'/>
                                </Button>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
            </>
        )
    }
}
export default Header;
