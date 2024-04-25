package spring.service;

import spring.dto.PersonDTO;
import java.util.List;
import java.util.Map;

public interface PersonService {

    PersonDTO addPerson(PersonDTO personDTO);

    void removePerson(long id);

    List<PersonDTO> getAll();

    PersonDTO getPerson(long id);

    PersonDTO getById(long id);

    PersonDTO editPerson(PersonDTO personDTO, long personId);

    List<Map<String, Object>> getPersonStatistics();
}
