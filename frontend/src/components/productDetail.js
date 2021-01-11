import React, {Component} from "react";
import {baseUrl} from "./baseUrl";
import {Loading} from "./loading";
import StarRatings from 'react-star-ratings';
import {Button} from "react-bootstrap";
import AddToCart from './addToCart';

class ProductDetail extends Component{
    constructor(props) {
        super(props);

        this.state = {
            isDetailLoading:true,
            isReviewLoading:true,
            productId: this.props.match.params.id,
            reviews:[],
            product:{},
            stars:0,
            desc:""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        fetch(baseUrl + 'product/' + this.state.productId)
            .then(res=> res.json())
            .then(res=>this.setState({isDetailLoading:false, product:res[0]}))
            .catch(e=> console.error(e));

        fetch(baseUrl + 'review/' + this.state.productId)
            .then(res=> res.json())
            .then(res=>this.setState({isReviewLoading:false, reviews:res}))
            .catch(e=> console.error(e));
    }

    handleSubmit(event) {
        fetch(baseUrl + 'review/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                productId: this.state.productId,
                rating: this.state.stars,
                desc: this.state.desc
            })
        })
            .then(res=> res.json())
            .then(res=>this.setState({reviews:res, stars:0, desc:''}))
            .catch(e=> console.error(e));

        event.preventDefault();
    }

    render() {
        if (this.state.isDetailLoading)
            return (<Loading/>);

        let desc=[];
        this.state.product.description.split('\n').forEach(d=> {desc.push(<li>{d}</li>)});


        const Reviews = ()=> {
            if (this.state.isReviewLoading)
                return(<Loading/>);

            let lists=[];
            this.state.reviews.forEach(r=> {
                lists.push(
                    <li>
                        <StarRatings
                            rating={r.rating}
                            starRatedColor="magenta"
                            numberOfStars={5}
                            starDimension='25px'
                        />
                        <p>{r.desc}</p>
                    </li>
                )
            });

            return (<ul style={{listStyle:'none', margin:'20px'}}>{lists}</ul>)
        };

        return(
            <div className='container'>
                <Button variant='flush' href={'/'}><span className={'fa fa-2x fa-arrow-circle-left'}/></Button>
                <div className='row'>
                    <div className='col-md-4'>
                        <img src={require('../images/'+this.state.product.image)} alt={'hello'} style={{ objectFit: 'contain',
                            maxWidth: '100%',
                            maxHeight: '100%',
                            width: 'auto',
                            height: 'auto'}} />
                    </div>
                    <div className='col-md-6'>
                        <h2>{this.state.product.name}</h2>
                        <p><em>{this.state.product.manufacturer}</em></p>
                        <ul>
                            {desc}
                        </ul>
                        <br/>
                        <p>Best Buy: <span style={{color: 'green'}}>Rs.{this.state.product.price}</span></p>
                        <Button variant={'primary'} onClick={()=> AddToCart(this.state.productId)}>Add to Cart</Button>
                    </div>
                </div>
                <div className='row' style={{marginTop:'90px'}}>
                    <div className='col-md-8'>
                        <h3>Reviews</h3>
                        <Reviews />
                    </div>
                    <div className='col'>
                        <h4 style={{marginTop:'30px'}}>Add a review</h4>
                        <form onSubmit={this.handleSubmit}>
                            <StarRatings
                                rating={this.state.stars}
                                starRatedColor="grey"
                                changeRating={(newRating, name)=> this.setState({stars:newRating})}
                                numberOfStars={5}
                            /><br/>
                            <label>
                                Review:<br/>
                                <input type="text" value={this.state.desc} onChange={(event)=> this.setState({desc:event.target.value})} />
                            </label>
                            <input type="submit" value="Submit" />
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProductDetail;
