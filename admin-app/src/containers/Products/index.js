import React, {useState} from 'react';
import Layout from '../../components/Layout';
import { Button, Row, Col, Container, Table } from 'react-bootstrap';
import Input from '../../components/UI/Input';
import { useDispatch, useSelector } from 'react-redux';
import {addProduct} from '../../actions';
import Modal from '../../components/UI/Modal';
import { productConstants } from '../../actions/constants';

/**
* @author
* @function Products
**/

const Products = (props) => {
  const product = useSelector(state=> state.product);
  const category = useSelector(state=> state.category);
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [productPictures, setProductPictures] = useState([]);

  const handleSave = () => {
    const form = new FormData();
      form.append('name', name);
      form.append('quantity', quantity);
      form.append('price', price);
      form.append('description', description);
      form.append('category', categoryId);
      for (let pic of productPictures){
        form.append('productPicture', pic);
      }
      dispatch(addProduct(form));
      setShow(false);
  };

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);


  const createCategoryList = (categories, options = []) => {
    for (let category of categories){
      options.push({
        value: category._id,
        name: category.name
      });
      if(category.children.length > 0){
        createCategoryList(category.children, options);
      }
    };
    return options;
  };

  const handleProductPictures = (e) => {
    setProductPictures([...productPictures, e.target.files[0]]);
  };

  const renderProducts = () => {
    return (
      <Table style={{ fontSize: 12 }} responsive="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
            {
              product.products.length > 0 ?
              product.products.map(product => 
                <tr key={product._id} >
                  <td> 2 </td>
                  <td> {product.name} </td>
                  <td> {product.price} </td>
                  <td> {product.quantity} </td>
                  <td> -- </td>
                </tr>
              )
              : null
            }
        </tbody>
      </Table>
    );
  };


  return(
    <Layout sidebar >
      <Container>
        <Row>
          <Col md={12} >
            <div style={{ display: 'flex', justifyContent: 'space-between' }} >
              <h3>Products</h3>
              <Button variant="primary" onClick={handleShow}>
                Add
              </Button>
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            {renderProducts()}
          </Col>  
        </Row>

      </Container>

      <Modal
        show={show}
        handleClose={handleClose}
        handleSave={handleSave}
        handleShow={handleShow}
        modalTitle={'Add a New Product'}
      >
        <Input 
          Label="Product Name "
          value={name}
          placeholder={`Product Name`}
          onChange={(e) => setName(e.target.value)}
        />
        <Input 
          Label="Quantity"
          value={quantity}
          placeholder={`Quantity`}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <Input 
          Label="Price"
          value={price}
          placeholder={`Price`}
          onChange={(e) => setPrice(e.target.value)}
        />
        <Input 
          Label="Description"
          value={description}
          placeholder={`Description`}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select 
          className="form-control" 
          value={categoryId}
          onChange={(e)=> setCategoryId(e.target.value)} 
        >
          <option>select category</option>
          {
            createCategoryList(category.categories).map(option => 
              <option key={option.value} value={option.value} >{option.name}</option>
            )
          }
        </select>
        <label>Images</label>  
          {
            productPictures.length > 0 ? 
            productPictures.map((pic, index) => 
              <div key={index} > {pic.name} </div>
            ) : null
          }
        <input className="form-control" type="file" name={productPictures} onChange={handleProductPictures} />  
      </Modal>

      
    </Layout>
  )      
}

export default Products;