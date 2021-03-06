import React from 'react';

const productArry = [
    {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
    {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
    {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
    {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
    {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
    {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];

class ProductTableApp extends React.Component{

    constructor(){

        super();

        this.state = {
            stockChk : false,
            filterText : ''
        }

        this.onUserInputerHandler = this.onUserInputerHandler.bind(this)

    }

    onUserInputerHandler(stockChk, filterText){
        this.setState({
            stockChk : stockChk,
            filterText : filterText
        });

    }

	render(){
		return(
			<div>
				<SearchBar stockChk={this.state.stockChk} filterText={this.state.filterText} onUserInput={this.onUserInputerHandler}/>
				<ProductTable products={productArry} filterText={this.state.filterText} stockChk={this.state.stockChk}  />
			</div>
		);
	}
}

class SearchBar extends React.Component{

    constructor(){
        super();
        this.handlerChange = this.handlerChange.bind(this);
    }

    handlerChange(){
        this.props.onUserInput(
            this.refs.refChk.checked,
            this.refs.refInput.value
        );
    }

	render(){
		return(
			<form>
                <input type="text" placeholder="search" value={this.props.filterText} ref="refInput"  onChange={this.handlerChange}/> <br/>
                <input type="checkbox" checked={this.props.stockChk}  ref="refChk" onChange={this.handlerChange} />  재고만 보이기
            </form>
		);
	}
}

class ProductTable extends React.Component{
	render(){

		let rows = [];
        let categoryChk = null;

		this.props.products.forEach(function(data){

			//console.log(data);
            if(data.category !== categoryChk){
                rows.push(<ProductCategory products={data} key={data.category} />);
            }
            if(this.props.stockChk && !data.stocked || data.name.indexOf(this.props.filterText) === -1){
                return;
            }
			rows.push(<ProductItem products={data} key={data.name} />);
            categoryChk = data.category;

		}.bind(this));

		return(
			<table>
				<thead>
					<tr>
						<th>Name</th><th>Price</th>
					</tr>
				</thead>
				<tbody>
					{rows}
				</tbody>
			</table>
		);
	}
}

class ProductCategory extends React.Component {
	render() {
		return(
			<tr>
				<td colSpan="2"><b>{this.props.products.category}</b></td>
			</tr>

		);
	}
}

class ProductItem extends React.Component {
	render() {

        let name = this.props.products.stocked ? this.props.products.name : <span style={{"color":"red"}}>{this.props.products.name}</span>

		return(
			<tr>
				<td>{name}</td>
                <td>{this.props.products.price}</td>
			</tr>
		);
	}
}

export default ProductTableApp;
