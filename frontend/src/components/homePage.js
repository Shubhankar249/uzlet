import React, {Component} from "react";
import {baseUrl} from "./baseUrl";
import {Loading} from "./loading";
import Card from 'react-bootstrap/Card'
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";
import AddToCart from './addToCart'

class Home extends Component {
    constructor(props) {
        super(props);

        this.state={
            isLoading:true,
            products:[]
        }
    }

    componentDidMount() {
        fetch(baseUrl)
            .then(res=> res.json())
            .then(res=>this.setState({isLoading:false, products:res}))
            .catch(e=> console.error(e));
    }


    render() {
        if (this.state.isLoading) {
            return (<Loading/>)
        }

        const Cards = [];

        this.state.products.forEach(p=> {
            Cards.push(
                <Card className='p-2 col-sm-6 col-md-4' >
                    <div className='row'>
                        <div className='col-md-6 col-sm-12' style={{width:300, height: 300}}>
                            <Link to={`/product/${p.id}`}>
                                <Card.Img variant="top" src={require('../images/' + p.image)} style={{ objectFit: 'contain',
                                    maxWidth: '100%',
                                    maxHeight: '100%',
                                    width: 'auto',
                                    height: 'auto',
                                }}/>
                            </Link>
                        </div>
                        <Card.Body className='col-6 '>
                            <Card.Title>{p.name}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{p.manufacturer}</Card.Subtitle>
                            <Card.Text><em>Rs. {p.price}</em></Card.Text>
                            <Button variant="primary" onClick={()=> AddToCart(p.id)}>ADD TO CART</Button>
                        </Card.Body>
                    </div>
                </Card>
            )
        });

        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-md-offset-2 col-md-6'>
                        <input placeholder={'Search'}/>
                    </div>
                    <div className='col'>
                        <label htmlFor="sortBy">Sort By: </label>
                        <select name={'sortBy'} style={{marginLeft:4}}>
                            <option value={'price'}>Price</option>
                            <option value={'time'}>Time</option>
                        </select>
                    </div>
                </div>
                <div className='row' style={{marginTop:20}}>
                    {Cards}
                </div>
            </div>
        );
    }
}

export default Home;
