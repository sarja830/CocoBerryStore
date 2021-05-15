import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { read, listRelated } from './apiCore';
import Card from './Card';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Spinner from 'react-bootstrap/esm/Spinner';

const Product = props => {
    const [product, setProduct] = useState({});
    const [relatedProduct, setRelatedProduct] = useState([]);
    const [error, setError] = useState(false);
const [loading, setLoading] = useState(false);
const [loading1, setLoading1] = useState(false);

    const loadSingleProduct = productId => {
        read(productId).then(data => {
            if (data.error) {
                setLoading(false);
                setError(data.error);
            } else {
                setLoading(false);
                setProduct(data);
                // fetch related products
                listRelated(data._id).then(data => {
                    if (data.error) {
                        setLoading1(false);
                        setError(data.error);
                    } else {
                        setLoading1(false);
                        setRelatedProduct(data);
                    }
                });
            }
        });
    };

    useEffect(() => {
        setLoading(true);
        setLoading1(true);
        const productId = props.match.params.productId;
        loadSingleProduct(productId);
    }, [props]);

    return (
        <Layout
            title={product && product.name}
            description={product && product.description && product.description.substring(0, 100)}
            className="container-fluid"
        >

<Row>

{loading?
         <div className="text-center "  style={{margin:"200px auto"}}><Spinner animation="border" variant="warning"  size="lg"> <span className="sr-only">Loading...</span> </Spinner></div>
        :
                <Col xl={8} lg={8} md={12} sm className="mb-5">
                    {product && product.description && <Card product={product} showViewProductButton={false} />}
                </Col>
            }
          
                <Col xl={4} lg={4} md={12} sm className="mb-3">
                    <h4>Related products</h4>
                    {loading1?   <div className="text-center "  style={{margin:"200px auto"}}><Spinner animation="border" variant="warning"  size="lg"> <span className="sr-only">Loading...</span> </Spinner></div>
        :<>
                    {relatedProduct.map((p, i) => (
                        <div className="mb-3" key={i}>
                            <Card product={p} />
                        </div>
                    ))}</>}
                </Col>
            </Row>
        </Layout>
    );
};

export default Product;
