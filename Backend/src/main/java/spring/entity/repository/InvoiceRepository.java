package spring.entity.repository;

import spring.entity.InvoiceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
public interface InvoiceRepository extends JpaRepository<InvoiceEntity, Long>, JpaSpecificationExecutor<InvoiceEntity> {

    @Query("SELECT SUM(price) FROM invoice WHERE issued >= :startDate")
    long sumPricesByCurrentYear(@Param("startDate") Date startDate);

    @Query("SELECT SUM(price) FROM invoice")
    long sumAllPrices();

}