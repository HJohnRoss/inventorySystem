import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from 'axios'

import TableData from "../components/TableData";

const Add = (props) => {
	const { id } = useParams()

	const [product, setProduct] = useState(null);
	const [oneSku, setOneSku] = useState("")
	const [qty, setQty] = useState(1);
	const [channel, setChannel] = useState("UPB Amazon")

	const [productName, setProductName] = useState(null)
	const [productQty, setProductQty] = useState(null)

	useEffect(() => {
		axios.get(`http://localhost:8000/api/${id}`)
			.then(res => {
				setProduct(res.data)
				setProductName(res.data.productName)
				setProductQty(res.data.quantity)
				console.log(res.data)
			})
			.catch(err => console.log(err))
	}, [])

	const updateProduct = (e, isEdit) => {
		e.preventDefault();
		let tempSkus = product.skus
		

		if(!isEdit) {
			tempSkus.push({
				sku: oneSku,
				sellingChannel: channel,
				qty: qty
			})
		}
		axios.put(`http://localhost:8000/api/product/update/${id}`, {
			productName: productName,
			quantity: productQty,
			skus: tempSkus
		})
			.then(res => {
				console.log(res)
				window.location.reload()
			})
			.catch(err => console.log(err))
	}


	return (


		<section className="add">
			<div>
				<Link to="/" className="add--link">Dashboard</Link>
			</div>


			{/* Add Sku */}
			{
				product ?
					<>
						<div className="add__container">
							<form onSubmit={(e) => updateProduct(e, true)}>
								<h3>Edit Product</h3>

								<div>
									<label htmlFor="input--product--name">Product Name: </label>
									<input type="text" id="input--product--name" value={productName} onChange={(e) => setProductName(e.target.value)} />
								</div>
								<div>
									<label htmlFor="input--qty">product qty: </label>
									<input id="input--qty" type="number" value={productQty} onChange={(e) => setProductQty(e.target.value)} />
								</div>

								<button>Add Sku</button>
							</form>

							<form onSubmit={(e) => updateProduct(e, false)}>
								<h3>Add Sku</h3>
								<div>
									<label htmlFor="input--product">Product Name: <span style={{ backgroundColor: "yellow", color: "black" }}>{product.productName}</span></label>
								</div>
								<div>
									<label htmlFor="input--sku">sku #: </label>
									<input id="input--sku" type="text" value={oneSku} onChange={(e) => setOneSku(e.target.value)} />
								</div>
								<div>
									<label htmlFor="input--qty">sku qty: </label>
									<input id="input--qty" type="number" value={qty} onChange={(e) => setQty(e.target.value)} />
								</div>
								<div>
									<label htmlFor="input--select">Selling Channel: </label>
									<select id="input--select" onChange={(e) => setChannel(e.target.value)}>
										<option value="UPB Amazon">UPB Amazon</option>
										<option value="UPB Walmart">UPB Walmart</option>
										<option value="UPB Ebay">UPB Ebay</option>
										<option value="GMA Amazon">GMA Amazon</option>
										<option value="GMA Walmart">GMA Walmart</option>
										<option value="GMA Ebay">GMA Ebay</option>
										{/* may need to add more */}
									</select>
								</div>

								<button>Add Sku</button>
							</form>
						</div>

						<div className="add__table">

							<div className="add__table--header">
								<div className="add__table--col add__table--h">Sku</div>
								<div className="add__table--col add__table--h">Selling Channel</div>
								<div className="add__table--col add__table--h">Quantity</div>
								<div className="add__table--col add__table--h">Edit</div>
							</div>

							{
								product.skus.map((sku, i) =>
									<TableData sku={sku} i={i} product={product} />
								)
							}
						</div>
					</>
					:
					""
			}


		</section>
	)
}




export default Add;