import React from "react";
import { Col, Card, Button } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";

const Menus = ({ menu, masukKeranjang }) => {
  return (
    <Col md={4} xs={6} className="mb-4" style={{ cursor: "pointer" }}>
      <Card className="shadow" onClick={() => masukKeranjang(menu)}>
        <Card.Img
          className="slctd"
          height={180}
          style={{ cursor: "pointer" }}
          variant="top"
          src={
            "assets/images/" +
            menu.category.nama.toLowerCase() +
            "/" +
            menu.gambar
          }
        />
        <Card.Body>
          <Card.Title style={{ cursor: "pointer" }}>
            {menu.nama} <strong>{menu.kode}</strong>
          </Card.Title>
          <Card.Text>
            <strong>Rp. {numberWithCommas(menu.harga)}</strong>
          </Card.Text>
          <Button variant="outline-success" className="btn-byr">
            Pesan!
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Menus;
