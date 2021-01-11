import React, {Component} from "react";
import {baseUrl} from "./baseUrl";
import {Button, ListGroup} from "react-bootstrap";
import {Loading} from "./loading";
import {Link} from "react-router-dom";

class Cart extends Component{
    constructor(props) {
        super(props);

        this.state={
            isLoading:true,
            products:[],
            sum:0
        };
        this.deleteProduct = this.deleteProduct.bind(this);
        this.getProducts = this.getProducts.bind(this);
    }

    getProducts (){
        fetch(baseUrl + 'cart/' + localStorage.getItem('userId'))
            .then(res => res.json())
            .then(res => {
                this.setState({isLoading: false, products: res, sum:0});
            })
            .catch(e => console.error(e));
    }
    componentDidMount() {
        this.getProducts();
    }

    deleteProduct(id) {
        fetch(baseUrl + 'cart/delete', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: id
            })
        })
            .then(()=>this.getProducts())
            .catch(e=> console.error(e));
    }

    render() {
        if (this.state.isLoading)
            return (<Loading/>);

        const products=[];
        this.state.products.forEach(p=> {
           products.push(
               <ListGroup.Item>
                   <div className='container'>
                      <div className='row'>
                          <div className='col-md-9'>
                              <h3>{p.product.name}</h3>
                              <p><em>{p.product.price}</em></p>
                          </div>
                          <div className='col'>
                              <Button variant={'flush'} onClick={()=>this.deleteProduct(p.id)}>
                                  <span className='fa fa-lg fa-trash' />
                              </Button>
                          </div>
                      </div>
                   </div>
               </ListGroup.Item>
           ) ;
            this.state.sum+= p.product.price;
        });

        return(
            <div className='container'>
                <Link to={'/'}>Back</Link>
                <h1 style={{marginLeft: '35%', color: 'green'}}>CART</h1>
                <ListGroup variant='flush'>
                    {products}
                </ListGroup>
                <p>TOTAL: <span style={{color: 'brown'}}>Rs. {this.state.sum}</span> </p>
            </div>
        )
    }
}

export default Cart;
