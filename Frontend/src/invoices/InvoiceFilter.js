import React from 'react';
import InputSelect from '../components/InputSelect';
import InputField from '../components/InputField';

const InvoiceFilter = (props) => {

  const handleChange = (e) => {
    props.handleChange(e);
  };

  const handleSubmit = (e) => {
    props.handleSubmit(e);
  };

  const filter = props.filter;

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col">
          <InputSelect
            name="buyerID"
            items={props.buyerList}
            handleChange={handleChange}
            label="Buyer"
            prompt="Unassigned"
            value={filter.buyerID}
          />
        </div>
        <div className="col">
          <InputSelect
            name="sellerID"
            items={props.sellerList}
            handleChange={handleChange}
            label="Seller"
            prompt="Unassigned"
            value={filter.sellerID}
          />
        </div>
        <div className="col">
          <InputField
            type="text"
            label="Product"
            name="product"
            prompt="Unassigned"
            value={filter.product}
            handleChange={handleChange}
          />
        </div>
      </div>

      <div className="row">
        <div className="col">
          <InputField
            type="number"
            label="Min. Price"
            name="minPrice"
            prompt="Unassigned"
            value={filter.minPrice}
            handleChange={handleChange}
          />
        </div>

        <div className="col">
          <InputField
            type="number"
            label="Max. price"
            name="maxPrice"
            prompt="Unassigned"
            value={filter.maxPrice}
            handleChange={handleChange}
          />
        </div>

        <div className="col">
          <InputField
            type="number"
            min="1"
            name="limit"
            handleChange={handleChange}
            label="Limit"
            prompt="neuveden"
            value={filter.limit ? filter.limit : ''}
          />
        </div>
      </div>

      <div className="row">
        <div className="col">
          <input
            type="submit"
            className="btn btn-primary float-right mt-2"
            value={props.confirm}
          />
        </div>
      </div>
    </form>
  );
};

export default InvoiceFilter;