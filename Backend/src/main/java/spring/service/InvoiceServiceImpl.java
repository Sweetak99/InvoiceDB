package spring.service;

import spring.dto.InvoiceDTO;
import spring.dto.mapper.InvoiceMapper;
import spring.entity.InvoiceEntity;
import spring.entity.PersonEntity;
import spring.entity.filter.InvoiceFilter;
import spring.entity.repository.InvoiceRepository;
import spring.entity.repository.PersonRepository;
import spring.entity.repository.specification.InvoiceSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class InvoiceServiceImpl implements InvoiceService {

    @Autowired
    private InvoiceMapper invoiceMapper;

    @Autowired
    private InvoiceRepository invoiceRepository;

    @Autowired
    private PersonRepository personRepository;

    @Override
    public InvoiceDTO addInvoice(InvoiceDTO invoiceDTO) {
        InvoiceEntity entity = invoiceMapper.toEntity(invoiceDTO);

        PersonEntity seller = personRepository.getReferenceById(invoiceDTO.getSeller().getId());
        PersonEntity buyer = personRepository.getReferenceById(invoiceDTO.getBuyer().getId());

        entity.setSeller(seller);
        entity.setBuyer(buyer);

        entity = invoiceRepository.save(entity);

        return invoiceMapper.toDTO(entity);
    }

    @Override // gets purchases invoices filtered by identificationNumber of buyers
    public List<InvoiceDTO> getPurchases(String identificationNumber) {
        // gets a list of buyers that has the queried idNumber
        List<PersonEntity> buyers = personRepository.findByIdentificationNumber(identificationNumber);

        // for every buyer I receieve:
        return buyers
                .stream()
                .map(PersonEntity::getPurchases)
                .flatMap(Collection::stream)
                .map(i -> invoiceMapper.toDTO(i))
                .collect(Collectors.toList());
    }

    @Override // gets sales invoices filtered by identificationNumber of seller
    public List<InvoiceDTO> getSales(String identificationNumber) {
        // gets a list of sellers that has the queried idNumber
        List<PersonEntity> sellers = personRepository.findByIdentificationNumber(identificationNumber);

        // for every seller I receieve:
        return sellers
                .stream()
                // a list of invoices for the single seller
                .map(PersonEntity::getSales)
                // merging of lists of all individuals into one
                .flatMap(Collection::stream)
                // every entity is transfered into DTO
                .map(i -> invoiceMapper.toDTO(i))
                .collect(Collectors.toList());
    }

    @Override
    public Map<String, Long> getInvoiceStatistics() {
        Map<String, Long> statistics = new HashMap<>();

        long allTimeSum = invoiceRepository.sumAllPrices();
        statistics.put("allTimeSum", allTimeSum);

        LocalDate currentDate = LocalDate.now();
        Date currentYearStartDate = Date.from(currentDate.atStartOfDay(ZoneId.systemDefault()).toInstant());
        long currentYearSum = invoiceRepository.sumPricesByCurrentYear(currentYearStartDate);
        statistics.put("currentYearSum", currentYearSum);

        long invoicesCount = invoiceRepository.count();
        statistics.put("invoicesCount", invoicesCount);

        return statistics;
    }

    @Override
    public InvoiceDTO editInvoice(InvoiceDTO invoiceDTO, long invoiceId) {
        // Fetch the existing invoice entity from the database
        InvoiceEntity invoice = fetchInvoiceById(invoiceId);

        invoice.setInvoiceNumber(invoiceDTO.getInvoiceNumber());
        invoice.setIssued(invoiceDTO.getIssued());
        invoice.setDueDate(invoiceDTO.getDueDate());
        invoice.setProduct(invoiceDTO.getProduct());
        invoice.setPrice(invoiceDTO.getPrice());
        invoice.setVat(invoiceDTO.getVat());
        invoice.setNote(invoiceDTO.getNote());

        // Fetch the seller and buyer entities by their IDs
        PersonEntity seller = personRepository.getReferenceById(invoiceDTO.getSeller().getId());
        PersonEntity buyer = personRepository.getReferenceById(invoiceDTO.getBuyer().getId());

        // Set the seller and buyer entities for the invoice
        invoice.setSeller(seller);
        invoice.setBuyer(buyer);

        // Save the updated invoice entity
        invoice = invoiceRepository.save(invoice);

        // Map the updated invoice entity to DTO and return
        return invoiceMapper.toDTO(invoice);
    }

    @Override
    public void deleteInvoice(long invoiceId) {
        try {
            InvoiceEntity invoice = fetchInvoiceById(invoiceId);

            invoiceRepository.delete(invoice);
        } catch (EmptyResultDataAccessException exception) {
            // Invoice was not found
            new ResponseEntity<>(null, null, HttpStatus.NOT_FOUND);
        }
    }

    @Override
    public List<InvoiceDTO> getAll(InvoiceFilter invoiceFilter) {
        InvoiceSpecification invoiceSpecification = new InvoiceSpecification(invoiceFilter);

        return invoiceRepository.findAll(invoiceSpecification, PageRequest.of(0, invoiceFilter.getLimit()))
                .stream()
                .map(invoiceMapper::toDTO)
                .collect(Collectors.toList());
    }
    @Override
    public InvoiceDTO getInvoice(long id) {
        InvoiceEntity invoiceEntity = fetchInvoiceById(id);

        return invoiceMapper.toDTO(invoiceEntity);
    }

    private InvoiceEntity fetchInvoiceById(long id) {
        return invoiceRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Invoice with id " + id + " wasn't found in the database."));
    }

    @Override
    public InvoiceDTO getInvoiceById(long invoiceId) {
        InvoiceEntity fetchedInvoice = getInvoiceOrThrow(invoiceId);

        return invoiceMapper.toDTO(fetchedInvoice);
    }

    private InvoiceEntity getInvoiceOrThrow(long invoiceId) {
        return invoiceRepository
                .findById(invoiceId)
                .orElseThrow();
    }

    @Override
    public List<String> getProducts() {
        // Implement your logic here to fetch products from invoices
        List<InvoiceEntity> invoices = invoiceRepository.findAll();
        Set<String> products = new HashSet<>();
        for (InvoiceEntity invoice : invoices) {
            products.add(invoice.getProduct());
        }
        return new ArrayList<>(products);
    }
}