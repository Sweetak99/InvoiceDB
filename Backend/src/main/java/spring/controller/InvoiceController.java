package spring.controller;

import spring.dto.InvoiceDTO;
import spring.entity.filter.InvoiceFilter;
import spring.service.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class InvoiceController {

    @Autowired
    private InvoiceService invoiceService;

    @PostMapping("/invoices")
    public InvoiceDTO addInvoice(@RequestBody InvoiceDTO invoiceDTO) {
        return invoiceService.addInvoice(invoiceDTO);
    }

    @GetMapping({"/invoices", "/invoices/"})
    public List<InvoiceDTO> getInvoices(InvoiceFilter invoiceFilter) {
        return invoiceService.getAll(invoiceFilter);
    }

    @GetMapping("/invoices/{identificationNumber}/sales")
    public List<InvoiceDTO> getSales(@PathVariable String identificationNumber) {
        return invoiceService.getSales(identificationNumber);
    }

    @GetMapping("/invoices/{identificationNumber}/purchases")
    public List<InvoiceDTO> getPurchases(@PathVariable String identificationNumber) {
        return invoiceService.getPurchases(identificationNumber);
    }

    @GetMapping("/invoices/{invoiceId}")
    public InvoiceDTO getInvoiceById(@PathVariable Long invoiceId) {
        return invoiceService.getInvoice(invoiceId);
    }

    @GetMapping("/invoices/statistics")
    public Map<String, Long> getInvoiceStatistics() {
        return invoiceService.getInvoiceStatistics();
    }

    @GetMapping("/invoices/products")
    public List<String> getProducts() {
        return invoiceService.getProducts();
    }

    @PutMapping("/invoices/{invoiceId}")
    public InvoiceDTO editInvoice(
            @PathVariable long invoiceId,
            @RequestBody InvoiceDTO invoiceDTO
    ) {
        return invoiceService.editInvoice(invoiceDTO, invoiceId);
    }

    @DeleteMapping("/invoices/{invoiceId}")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void deleteInvoice(@PathVariable Long invoiceId) {
        invoiceService.deleteInvoice(invoiceId);
    }
}
