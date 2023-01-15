import React, { Component } from "react";
import { marketDataUrl } from '../APIs/ApiUrl';

class TableRow extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: {}
        }
    };

    componentDidMount() {

        this.setState({
            data: {
                asset: 'Bitcoin',
                price: 10,
                quantity: 10,
                avgPrice: 10,
                holdings: 10000
            }
        })
    }

    render() {
        return (
            <tr>
                <td>{this.state.data.asset}</td>
                <td>{this.state.data.price}</td>
                <td>{this.state.data.quantity}</td>
                <td>{this.state.data.avgPrice}</td>
                <td>{this.state.data.holdings}</td>
            </tr>
        )
    }
};

export default TableRow;