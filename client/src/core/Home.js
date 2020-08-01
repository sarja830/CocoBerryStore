import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getProducts } from './apiCore';
import Card from './Card';
import Search from './Search';
import Spinner from 'react-bootstrap/esm/Spinner';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'

const Home = () => {
    const [productsBySell, setProductsBySell] = useState([]);
    const [productsByArrival, setProductsByArrival] = useState([]);
    const [error, setError] = useState(false);
const [loading1, setLoading1] = useState(false)
const [loading2, setLoading2] = useState(false)
    const loadProductsBySell = () => {
        
        getProducts('sold').then(data => {
            if (data.error) {
                setLoading1(false)
                setError(data.error);
            } else {
                setLoading1(false)
                setProductsBySell(data);
            }
        });
    };

    const loadProductsByArrival = () => {
        getProducts('createdAt').then(data => {
            
            if (data.error) {
                setLoading2(false)
                setError(data.error);
            } else {
                setLoading2(false)
                setProductsByArrival(data);
            }
        });
    };

    useEffect(() => {
        setLoading1(true)
        setLoading2(true)
        loadProductsByArrival();
        loadProductsBySell();
    }, []);

    return (
        <Layout title="Home Page" description="Node React ecomeerce" className="container-fluid">
        <Search />
        <h2 className="mb-4 ">
            Best Sellers
        </h2>
        {loading1?
         <div className="text-center "  style={{margin:"200px auto"}}><Spinner animation="border" variant="warning"  size="lg"> <span className="sr-only">Loading...</span> </Spinner></div>
        :<Row>
            {productsBySell.map((product, i) => (
            <Col xl={3} lg={4} md={4} sm className="mb-3"  key={i}>
            <Card product={product} />
        </Col>
            ))}
         </Row>}
<hr/>
        < h2 className="mb-4">
            New Arrivals
        </h2>
        {loading2?
         <div className="text-center "  style={{margin:"200px auto"}}><Spinner animation="border" variant="warning"  size="lg"> <span className="sr-only">Loading...</span> </Spinner></div>
        :
        <Row>
            {productsByArrival.map((product, i) => (
                <Col xl={3} lg={4} md={4} sm className="mb-3"  key={i}>
                    <Card product={product} />
                </Col>
            ))}
        </Row>}

    </Layout >
    );
};

export default Home;
