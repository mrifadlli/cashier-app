import React, { Component } from "react";
import { Col, ListGroup } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../utils/constants";

export default class ListCategories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    axios
      .get(API_URL + "categories")
      .then((res) => {
        const categories = res.data;
        this.setState({ categories });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { categories } = this.state;
    const { changeCategory, categorySelected } = this.props;
    return (
      <Col md={2} mt="2">
        <h4>
          <strong>Daftar Kategori</strong>
        </h4>
        <hr />
        <ListGroup style={{ cursor: "pointer" }} className="mb-3">
          {categories &&
            categories.map((category) => (
              <ListGroup.Item
                className={
                  categorySelected === category.nama && "category-active"
                }
                key={category.id}
                onClick={() => changeCategory(category.nama)}
              >
                <h5 className="hvr">{category.nama}</h5>
              </ListGroup.Item>
            ))}
        </ListGroup>
      </Col>
    );
  }
}
