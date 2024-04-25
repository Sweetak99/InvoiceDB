package spring.service;

import spring.dto.InvoiceDTO;
import spring.entity.filter.InvoiceFilter;

import java.util.List;
import java.util.Map;

public interface InvoiceService {

    InvoiceDTO addInvoice(InvoiceDTO invoiceDTO);

    List<InvoiceDTO> getAll(InvoiceFilter invoiceFilter);

    InvoiceDTO getInvoice(long id);

    InvoiceDTO getInvoiceById(long id);

    InvoiceDTO editInvoice(InvoiceDTO invoiceDTO, long id);

    void deleteInvoice(long id);

    public List<InvoiceDTO> getPurchases(String identificationNumber);

    public List<InvoiceDTO> getSales(String identificationNumber);

    Map<String, Long> getInvoiceStatistics();

    List<String> getProducts();
}
