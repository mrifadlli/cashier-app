import React, { Component } from "react";
import { Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../utils/constants";

export default class Success extends Component {
  componentDidMount() {
    axios
      .get(API_URL + "keranjang")
      .then((res) => {
        const keranjang = res.data;
        keranjang.map(function (item) {
          return axios
            .delete(API_URL + "keranjang/" + item.id)
            .then((res) => {
              axios
                .get(API_URL + "keranjang")
                .then((res) => {
                  const keranjang = res.data;
                  this.setState({ keranjang });
                })
                .catch((error) => {
                  console.log(error);
                });
            })
            .catch((error) => {
              console.log(error);
            });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return (
      <div className="mt-5 text-center">
        <Image src="assets/images/success.png" width={500} />
        <h1>
          <strong>Pesanan berhasil !</strong>
        </h1>
        <p>Terimakasih sudah memesan :)</p>
        <Button className="btn-success" as={Link} to="/">
          Home
        </Button>
      </div>
    );
  }
}
