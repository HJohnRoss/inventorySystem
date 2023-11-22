import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from 'axios'

const TableData = (props) => {
	const [edit, setEdit] = useState(false);

	const [oneSku, setOneSku] = useState(props.sku.sku)
	const [qty, setQty] = useState(props.sku.qty);
	const [channel, setChannel] = useState(props.sku.sellingChannel)

	const handleEdit = (e) => {
		e.preventDefault()
		if (edit) {
			setEdit(false)
		} else {
			setEdit(true)
		}
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		let tempSkus = props.product.skus;
		tempSkus[props.i] = {
			sku: oneSku,
			sellingChannel: channel,
			qty: qty
		}
		console.log(props.id)
		axios.put(`http://localhost:8000/api/product/update/${props.product._id}`, {
			skus: tempSkus
		})
			.then(res => {
				console.log(res.data)
				setEdit(false)
				window.location.reload()
			})
			.catch(err => console.log(err))
	}

	return (
		<>
			{
				edit ?
					<form onSubmit={handleSubmit} className="add__table--row">
						<div className="add__table--col"><input type="text" value={oneSku} onChange={(e) => setOneSku(e.target.value)} /></div>
						<div className="add__table--col"><input type="text" value={channel} onChange={(e) => setChannel(e.target.value)} /></div>
						<div className="add__table--col"><input type="number" value={qty} onChange={(e) => setQty(e.target.value)} /></div>
						<div className="add__table--col"><button>save</button></div>
					</form>
					:
					<div className="add__table--row">
						<div className="add__table--col">{props.sku.sku}</div>
						<div className="add__table--col">{props.sku.sellingChannel}</div>
						<div className="add__table--col">{props.sku.qty}</div>
						<div className="add__table--col"><button onClick={(e) => handleEdit(e)}>edit</button></div>
					</div>
			}
		</>
	)
}

export default TableData