package spring.entity.repository;

import spring.entity.PersonEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PersonRepository extends JpaRepository<PersonEntity, Long> {

    List<PersonEntity> findByHidden(boolean hidden);

    List<PersonEntity> findByIdentificationNumber(String identificationNumber);

    @Query("SELECT p.id AS personId, p.name AS personName, COALESCE(SUM(price), 0) AS revenue " +
            "FROM person p " +
            "LEFT JOIN invoice ON p.id = buyer.id OR p.id = seller.id " +
            "GROUP BY p.id, p.name")
    List<Object[]> getPersonStatistics();
}