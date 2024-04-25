import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiGet } from "../utils/api";
import Country from "../persons/Country";
import InvoiceTable from "../invoices/InvoiceTable";

const PersonDetail = () => {
    const { id } = useParams();
    const [person, setPerson] = useState({});
    const [buyerInvoices, setBuyerInvoices] = useState([]);
    const [sellerInvoices, setSellerInvoices] = useState([]);
    const [totalRevenue, setTotalRevenue] = useState(0);

    useEffect(() => {
        const fetchPersonAndInvoices = async () => {
            try {
                const personResponse = await apiGet("/api/persons/" + id);
                setPerson(personResponse);

                const buyerInvoicesResponse = await apiGet("/api/invoices/" + personResponse.identificationNumber + "/purchases");
                setBuyerInvoices(buyerInvoicesResponse);

                const sellerInvoicesResponse = await apiGet("/api/invoices/" + personResponse.identificationNumber + "/sales");
                setSellerInvoices(sellerInvoicesResponse);

                let total = 0;
                buyerInvoicesResponse.forEach(invoice => {
                    total += parseFloat(invoice.price);
                });
                sellerInvoicesResponse.forEach(invoice => {
                    total += parseFloat(invoice.price);
                });
                setTotalRevenue(total);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchPersonAndInvoices();
    }, [id]);

    const country = Country.CZECHIA === person.country ? "Czech republic" : "Slovakia";

    return (
        <>
            <div>
                <h1>Person details</h1>
                <hr />
                <h3>{person.name} ({person.identificationNumber})</h3>
                <p>
                    <strong>TIN:</strong>
                    <br />
                    {person.taxNumber}
                </p>
                <p>
                    <strong>Account number:</strong>
                    <br />
                    {person.accountNumber}/{person.bankCode} ({person.iban})
                </p>
                <p>
                    <strong>Phone number:</strong>
                    <br />
                    {person.telephone}
                </p>
                <p>
                    <strong>Email:</strong>
                    <br />
                    {person.mail}
                </p>
                <p>
                    <strong>Adress:</strong>
                    <br />
                    {person.street}, {person.city},
                    {person.zip}, {country}
                </p>
                <p>
                    <strong>Comment:</strong>
                    <br />
                    {person.note}
                </p>
                <p style={{ float: "right" }}><strong>Total profit:</strong> {totalRevenue} €</p>
            </div>
            <div>
                <h2>Invoices as a Buyer</h2>
                <InvoiceTable
                    items={buyerInvoices}
                    label="Invoices as a Buyer:"
                    showIndexColumn={false}
                />
            </div>
            <div>
                <h2>Invoices as a Seller</h2>
                <InvoiceTable
                    items={sellerInvoices}
                    label="Invoices as a Seller:"
                />
            </div>
        </>
    );
};

export default PersonDetail;