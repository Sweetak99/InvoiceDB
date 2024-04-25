
import React, { useState, useEffect } from "react";
import { apiDelete, apiGet } from "../utils/api";
import InvoiceTable from "./InvoiceTable";
import InvoiceFilter from "./InvoiceFilter";

const InvoiceIndex = () => {
  const [invoices, setInvoices] = useState([]);
  const [buyerListState, setBuyerList] = useState([]);
  const [sellerListState, setSellerList] = useState([]);
  const [productListState, setProductList] = useState([]);
  const [filterState, setFilter] = useState({
    buyerID: undefined,
    sellerID: undefined,
    product: undefined,
    minPrice: undefined,
    maxPrice: undefined,
    limit: undefined,
  });

  const deleteInvoice = async (id) => {
    await apiDelete("/api/invoices/" + id);
    setInvoices(invoices.filter((invoices) => invoices._id !== id))
  }

  const [totalPrice, setTotalPrice] = useState(0);
  const [totalPriceCurrentYear, setTotalPriceCurrentYear] = useState(0);
  const [currentYear] = useState(new Date().getFullYear());
  const calculateTotalPrices = (invoices) => {
    let total = 0;
    let totalCurrentYear = 0;
    const currentYearStart = new Date(currentYear, 0, 1);
    const currentYearEnd = new Date(currentYear, 11, 31);

    invoices.forEach((invoice) => {
      total += parseFloat(invoice.price);
      const issuedDate = new Date(invoice.issued);
      if (issuedDate >= currentYearStart && issuedDate <= currentYearEnd) {
        totalCurrentYear += parseFloat(invoice.price);
      }
    });

    setTotalPrice(total);
    setTotalPriceCurrentYear(totalCurrentYear);
  };

  useEffect(() => {
    apiGet("/api/invoices").then((data) => {
      setInvoices(data);
      calculateTotalPrices(data);
    });
    apiGet("/api/persons").then((data) => setBuyerList(data));
    apiGet("/api/persons").then((data) => setSellerList(data));
    apiGet('/api/invoices/products').then((data) => setProductList(data));
  }, []);

  const handleChange = (e) => {
    if (e.target.value === "false" || e.target.value === "true" || e.target.value === "") {
      setFilter((prevState) => {
        return { ...prevState, [e.target.name]: undefined };
      });
    } else {
      setFilter((prevState) => {
        return { ...prevState, [e.target.name]: e.target.value };
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const params = filterState;

    const data = await apiGet("/api/invoices", params);
    setInvoices(data);
    calculateTotalPrices(data);
  };

  return (
    <div>
      <h1>List of invoices</h1>
      <InvoiceFilter
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        buyerList={buyerListState}
        sellerList={sellerListState}
        productList={productListState}
        filter={filterState}
        confirm="Filter invoices"
        setFilter={setFilter}
      />
      <p style={{ float: "right" }}><strong>Total price:</strong> {totalPrice} € || <strong>Total price this year:</strong> {totalPriceCurrentYear + " €"}</p>
      <InvoiceTable
        deleteInvoice={deleteInvoice}
        items={invoices}
        label="Number of invoices:"
        totalPrice={totalPrice}
        totalPriceCurrentYear={totalPriceCurrentYear}
      />
    </div>
  );
};

export default InvoiceIndex;