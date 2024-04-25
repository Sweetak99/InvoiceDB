import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiGet, apiPost, apiPut } from "../utils/api";
import InputField from "../components/InputField";
import FlashMessage from "../components/FlashMessage";
import InputSelect from "../components/InputSelect";

const InvoiceForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [invoice, setInvoice] = useState({
    invoiceNumber: "",
    buyer: { _id: 0 },
    seller: { _id: 0 },
    issued: "",
    dueDate: "",
    product: "",
    price: "",
    vat: "",
    note: "",
  });
  const [sentState, setSent] = useState(false);
  const [successState, setSuccess] = useState(false);
  const [errorState, setError] = useState(null);
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    if (id) {
      apiGet("/api/invoices/" + id).then((data) => setInvoice(data));
    }

    apiGet("/api/persons").then((data) => setPersons(data));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    (id ? apiPut("/api/invoices/" + id, invoice) : apiPost("/api/invoices", invoice))
      .then((data) => {
        setSent(true);
        setSuccess(true);
        navigate("/invoices");
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
        setSent(true);
        setSuccess(false);
      });
  };

  const handleSelectChange = (e, type) => {
    const selectedPersonId = e.target.value;
    setInvoice({ ...invoice, [type]: { _id: parseInt(selectedPersonId) } });
  };

  const sent = sentState;
  const success = successState;

  return (
    <div>
      <h1>{id ? "Edit" : "Create"} invoice</h1>
      <hr />
      {errorState ? <div className="alert alert-danger">{errorState}</div> : null}
      {sent && (
        <FlashMessage
          theme={success ? "success" : ""}
          text={success ? "The invoice was saved successfully." : ""}
        />
      )}
      <form onSubmit={handleSubmit}>
        <InputField
          required={true}
          type="text"
          name="invoiceNumber"
          min="3"
          label="Invoice number"
          prompt="Enter the invoice number"
          value={invoice.invoiceNumber}
          handleChange={(e) => {
            setInvoice({ ...invoice, invoiceNumber: e.target.value });
          }}
        />

        <InputSelect
          required={true}
          label="Buyer"
          name="buyer"
          prompt="Select a buyer"
          value={invoice.buyer._id || ""}
          handleChange={(e) => handleSelectChange(e, "buyer")}
          items={persons}
        />

        <InputSelect
          required={true}
          label="Seller"
          name="seller"
          prompt="Select a seller"
          value={invoice.seller._id || ""}
          handleChange={(e) => handleSelectChange(e, "seller")}
          items={persons}
        />

        <InputField
          required={true}
          type="date"
          name="issued"
          label="Issued date"
          value={invoice.issued}
          handleChange={(e) => {
            setInvoice({ ...invoice, issued: e.target.value });
          }}
        />

        <InputField
          required={true}
          type="date"
          name="dueDate"
          label="Due date"
          value={invoice.dueDate}
          handleChange={(e) => {
            setInvoice({ ...invoice, dueDate: e.target.value });
          }}
        />

        <InputField
          required={true}
          type="text"
          name="product"
          min="3"
          label="Product"
          prompt="Enter product"
          value={invoice.product}
          handleChange={(e) => {
            setInvoice({ ...invoice, product: e.target.value });
          }}
        />

        <InputField
          required={true}
          type="number"
          name="price"
          min="0"
          label="Price"
          prompt="Enter price"
          value={invoice.price}
          handleChange={(e) => {
            setInvoice({ ...invoice, price: e.target.value });
          }}
        />

        <InputField
          required={true}
          type="number"
          name="vat"
          min="0"
          label="VAT"
          prompt="Enter VAT"
          value={invoice.vat}
          handleChange={(e) => {
            setInvoice({ ...invoice, vat: e.target.value });
          }}
        />

        <InputField
          type="text"
          name="note"
          label="Comment"
          value={invoice.note}
          handleChange={(e) => {
            setInvoice({ ...invoice, note: e.target.value });
          }}
        />

        <input type="submit" className="btn btn-primary" value="Save" />
      </form>
    </div>
  );
};

export default InvoiceForm;