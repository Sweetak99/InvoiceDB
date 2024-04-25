import React from "react";
import { Link, useLocation } from "react-router-dom";

const InvoiceTable = ({ label, items, deleteInvoice }) => {
    const location = useLocation();
    const showNewInvoiceButton = !location.pathname.includes("persons/show");

    return (
        <div>
            <p>
                {label} {items.length}
            </p>

            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Invoice number</th>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Issued date</th>
                        <th>Buyer</th>
                        <th>Seller</th>
                        <th colSpan={3}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={index + 1}>
                            <td>{index + 1}</td>
                            <td>{item.invoiceNumber}</td>
                            <td>{item.product}</td>
                            <td>{item.price + " Kč"}</td>
                            <td>{item.issued}</td>
                            <td><Link to={`/persons/show/${item.buyer._id}`}>{item.buyer.name}</Link></td>
                            <td><Link to={`/persons/show/${item.seller._id}`}>{item.seller.name}</Link></td>
                            <td>
                                <div className="btn-group">
                                    <Link
                                        to={"/invoices/show/" + item._id}
                                        className="btn btn-sm btn-info"
                                    >
                                        Show
                                    </Link>
                                    <Link
                                        to={"/invoices/edit/" + item._id}
                                        className="btn btn-sm btn-warning"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => deleteInvoice(item._id)}
                                        className="btn btn-sm btn-danger"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showNewInvoiceButton && (
                <Link to={"/invoices/create"} className="btn btn-success">
                    Create invoice
                </Link>
            )}
        </div>
    );
};

export default InvoiceTable;