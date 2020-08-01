import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Card from "./Card";
import { getCategories, getFilteredProducts } from "./apiCore";
import Checkbox from "./Checkbox";
import RadioBox from "./RadioBox";
import { prices } from "./fixedPrices";
import Spinner from "react-bootstrap/esm/Spinner";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

const Shop = () => {
    const [myFilters, setMyFilters] = useState({
        filters: { category: [], price: [] }
    });
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    const [limit, setLimit] = useState(20);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(0);
    const [filteredResults, setFilteredResults] = useState([]);
const [loading, setLoading] = useState(false)
    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setCategories(data);
            }
        });
    };

    const loadFilteredResults = newFilters => {
        // console.log(newFilters);
        
        getFilteredProducts(skip, limit, newFilters).then(data => {
            if (data.error) {
                setLoading(false)
                setError(data.error);
            } else {
                setLoading(false)
                setFilteredResults(data.data);
                setSize(data.size);
                setSkip(0);
            }
        });
    };

    const loadMore = () => {
        let toSkip = skip + limit;
        // console.log(newFilters);
        getFilteredProducts(toSkip, limit, myFilters.filters).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setFilteredResults([...filteredResults, ...data.data]);
                setSize(data.size);
                setSkip(toSkip);
            }
        });
    };

    const loadMoreButton = () => {
        return (
            size > 0 &&
            size >= limit && (
                <button onClick={loadMore} className="btn btn-warning mb-5">
                    Load more
                </button>
            )
        );
    };

    useEffect(() => {
        setLoading(true)
        init();
        loadFilteredResults(skip, limit, myFilters.filters);
    }, []);

    const handleFilters = (filters, filterBy) => {
        // console.log("SHOP", filters, filterBy);
        const newFilters = { ...myFilters };
        newFilters.filters[filterBy] = filters;

        if (filterBy === "price") {
            let priceValues = handlePrice(filters);
            newFilters.filters[filterBy] = priceValues;
        }
        loadFilteredResults(myFilters.filters);
        setMyFilters(newFilters);
    };

    const handlePrice = value => {
        const data = prices;
        let array = [];

        for (let key in data) {
            if (data[key]._id === parseInt(value)) {
                array = data[key].array;
            }
        }
        return array;
    };

    return (
        <Layout
            title="Shop"
            description="Find our complete range of products here "
            className='container-fluid'
        >
           
            <Row>
                <Col xl="2" md="12"  lg="3">
                    <h4>Filter by categories</h4>

                    {/* to handle the info sent by child component to parent component parent component sent a method handlefilter */}
                    <ul>
                        <Checkbox categories={categories}
                            handleFilters={filters =>
                                handleFilters(filters, 'category')}>

                        </Checkbox>
                    </ul>

                    <h4>Filter by Price(in &#8377;) </h4>

                    {/* to handle the info sent by child component to parent component parent component sent a method handlefilter */}
                    <div>
                        <RadioBox prices={prices}
                            handleFilters={filters =>
                                handleFilters(filters, 'price')}>

                        </RadioBox>
                    </div>
                </Col>
                <Col xl="10" md lg="9">
                   <h2 className="mb-4">Products</h2>             
                    {loading?
                    <div className="text-center "  style={{margin:"200px auto"}}><Spinner animation="border" variant="warning"  size="lg"> <span className="sr-only">Loading...</span> </Spinner></div>
                    :<Row>        
                     {filteredResults.map((product, i) => (
                           <Col xl="4" lg="6" className="mb-4" key={i}>
                                <Card product={product}  />
                        </Col>
                    ))}
                    <hr/>
                    {loadMoreButton()}
                    </Row>}
                    
                </Col>

            </Row>

        </Layout>
    );
};

export default Shop;
