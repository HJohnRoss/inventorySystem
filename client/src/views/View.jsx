import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import axios from "axios"
import * as XLSX from 'xlsx';

const View = (props) => {
	const [productName, setProductName] = useState("");
	const [quantity, setQuantity] = useState(0);
	const [productErrors, setProductErrors] = useState([]);
	const [allProducts, setAllProducts] = useState([]);

	const [refresh, setRefresh] = useState(false);

	useEffect(() => {
		axios.get('http://localhost:8000/api/all')
			.then(res => {
				setAllProducts(res.data)
				setRefresh(false)
				console.log(res.data)
			})
			.catch(err => console.log(err))
	}, [refresh])

	const createProduct = (e) => {
		e.preventDefault();
		axios.post('http://localhost:8000/api/product/create', {
			productName,
			quantity
		})
			.then(res => {
				console.log(res)
				setRefresh(true)
			})
			.catch(err => {
				const errorResponse = err.response.data.errors
				const errArr = []
				for (const key of Object.keys(errorResponse)) {
					errArr.push(errorResponse[key].message)
				}
				setProductErrors(errArr)
				setProductName("")
				setQuantity(0)
				
			})
	}

	const handleUpload = (e) => {
		e.preventDefault();

		var files = e.target.files, f = files[0];
		var reader = new FileReader();
		reader.onload = function (e) {
			var data = e.target.result;
			let readedData = XLSX.read(data, { type: 'binary' });
			const wsname = readedData.SheetNames[0];
			const ws = readedData.Sheets[wsname];

			/* Convert array to json*/
			const dataParse = XLSX.utils.sheet_to_json(ws, { header: 1 });


			handleInventoryChanges(dataParse);
			console.log(dataParse)
		};
		reader.readAsBinaryString(f)
	}

	const handleInventoryChanges = (data) => {
		for (let i = 0; i < data.length; i++) {
			for (let j = 0; j < allProducts.length; j++) {
				for (let x = 0; x < allProducts[j].skus.length; x++) {
					let curr = allProducts[j].skus[x]
					if (curr.sku == data[i][0]) {
						updateProduct(allProducts[j], data[i][1], curr.qty)
						allProducts[j].quantity -= data[i][1] * curr.qty
					}
				}
			}
		}
		setRefresh(true)
	}

	const updateProduct = (product, amnt, mult) => {
		console.log(amnt * mult)
		axios.put(`http://localhost:8000/api/product/update/${product._id}`, {
			quantity: product.quantity - (amnt * mult)
		})
			.then(res => {
				console.log(res)
				setRefresh(true)
			})
			.catch(err => console.log(err))
	}


	return (
		<section className="view">

			<div className="view__forms">


				<form onSubmit={createProduct}>
					<h3>Add Product Name</h3>
					<div>
						<label htmlFor="input--product--text">Product Name: </label>
						<input type="text" id="input--product--text" value={productName} onChange={(e) => setProductName(e.target.value)} />
					</div>
					<div>
						<label htmlFor="input--product--qty">Quantity: </label>
						<input type="number" id="input--product--qty" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
					</div>

					<button>Add Product</button>
				</form>

				<div>
					<h3>Upload Excel File</h3>
					<input type="file" onInput={handleUpload} />
				</div>

			</div>
			<table className="view__table">
				<tr className="view__table--tr">
					<th className="view__table--th">Id</th>
					<th className="view__table--th">Product Name</th>
					<th className="view__table--th">Quanity</th>
					<th className="view__table--th">Edit Product</th>
				</tr>

				{
					allProducts.map((product, i) =>
						<tr className="view__table--tr" key={product._id}>
							<td className="view__table--td">{i + 1}</td>
							<td className="view__table--td">{product.productName}</td>
							<td className="view__table--td" style={product.quantity < 100 ? { backgroundColor: "red" } : { backgroundColor: "green" }}>{product.quantity}</td>
							<td className="view__table--td view__table--td--link"><Link to={`/${product._id}`}>edit</Link></td>
						</tr>
					)
				}
			</table>
		</section>
	)
}

export default View;