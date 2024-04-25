import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiGet } from "../utils/api";
import Country from "../persons/Country";

const InvoiceDetail = () => {
    const { id } = useParams();
    const [invoice, setInvoice] = useState({});

    useEffect(() => {
        apiGet("/api/invoices/" + id).then((data) => setInvoice(data));
    }, [id]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = {
            year: "numeric",
            month: "long",
            day: "numeric"
        };
        return date.toLocaleDateString("en-US", options);
    };

    return (
        <>
            <div>
                <h1>Invoice details</h1>
                <hr />
                <p><strong>Invoice number:</strong> {invoice.invoiceNumber}</p>
                <h2>Seller</h2>
                <p>
                    <strong>Name:</strong> {invoice.seller ? invoice.seller.name : ""}
                    <br />
                    <strong>Identification number:</strong> {invoice.seller ? invoice.seller.identificationNumber : ""}
                    <br />
                    <strong>TIN:</strong> {invoice.seller ? invoice.seller.taxNumber : ""}
                    <br />
                    <strong>Account number:</strong> {invoice.seller ? invoice.seller.accountNumber : ""}
                    <br />
                    <strong>Bank code:</strong> {invoice.seller ? invoice.seller.bankCode : ""}
                    <br />
                    <strong>IBAN:</strong> {invoice.seller ? invoice.seller.iban : ""}
                    <br />
                    <strong>Phone number:</strong> {invoice.seller ? invoice.seller.telephone : ""}
                    <br />
                    <strong>Email:</strong> {invoice.seller ? invoice.seller.mail : ""}
                    <br />
                    <strong>Adress:</strong> {invoice.seller ? `${invoice.seller.street}, ${invoice.seller.city}, ${invoice.seller.zip}, ${Country[invoice.seller.country]}` : ""}
                    <br />
                    <strong>Comment:</strong> {invoice.seller ? invoice.seller.note : ""}
                </p>
                <h2>Buyer</h2>
                <p>
                    <strong>Name:</strong> {invoice.buyer ? invoice.buyer.name : ""}
                    <br />
                    <strong>Identification number:</strong> {invoice.buyer ? invoice.buyer.identificationNumber : ""}
                    <br />
                    <strong>TIN:</strong> {invoice.buyer ? invoice.buyer.taxNumber : ""}
                    <br />
                    <strong>Account number:</strong> {invoice.buyer ? invoice.buyer.accountNumber : ""}
                    <br />
                    <strong>Bank code:</strong> {invoice.buyer ? invoice.buyer.bankCode : ""}
                    <br />
                    <strong>IBAN:</strong> {invoice.buyer ? invoice.buyer.iban : ""}
                    <br />
                    <strong>Phone number:</strong> {invoice.buyer ? invoice.buyer.telephone : ""}
                    <br />
                    <strong>Email:</strong> {invoice.buyer ? invoice.buyer.mail : ""}
                    <br />
                    <strong>Adress:</strong> {invoice.buyer ? `${invoice.buyer.street}, ${invoice.buyer.city}, ${invoice.buyer.zip}, ${Country[invoice.buyer.country]}` : ""}
                    <br />
                    <strong>Comment:</strong> {invoice.buyer ? invoice.buyer.note : ""}
                </p>
                <h2>Invoice details</h2>
                <p>
                    <strong>Issue date:</strong> {invoice.issued ? formatDate(invoice.issued) : ""}
                    <br />
                    <strong>Due date:</strong> {invoice.dueDate ? formatDate(invoice.dueDate) : ""}
                    <br />
                    <strong>Product:</strong> {invoice.product}
                    <br />
                    <strong>Price:</strong> {invoice.price}
                    <br />
                    <strong>VAT:</strong> {invoice.vat}
                    <br />
                    <strong>Comment:</strong> {invoice.note}
                </p>
            </div>
        </>
    );
};

export default InvoiceDetail;