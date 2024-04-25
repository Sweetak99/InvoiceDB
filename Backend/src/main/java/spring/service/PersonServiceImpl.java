package spring.service;

import spring.dto.PersonDTO;
import spring.dto.mapper.PersonMapper;
import spring.entity.PersonEntity;
import spring.entity.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class PersonServiceImpl implements PersonService {

    @Autowired
    private PersonMapper personMapper;

    @Autowired
    private PersonRepository personRepository;

    @Override
    public PersonDTO addPerson(PersonDTO personDTO) {
        PersonEntity entity = personMapper.toEntity(personDTO);
        entity = personRepository.save(entity);

        return personMapper.toDTO(entity);
    }

    @Override
    public void removePerson(long personId) {
        try {
            PersonEntity person = fetchPersonById(personId);
            person.setHidden(true);

            personRepository.save(person);
        } catch (NotFoundException ignored) {
        }
    }

    @Override
    public PersonDTO editPerson(PersonDTO personDTO, long personId) {

        personDTO.setId(null);
        PersonEntity entity = personMapper.toEntity(personDTO);
        PersonEntity person = fetchPersonById(personId);
        person.setHidden(true);

        entity = personRepository.save(entity);
        person = personRepository.save(person);
        return personMapper.toDTO(entity);
    }

    @Override
    public List<PersonDTO> getAll() {
        return personRepository.findByHidden(false)
                .stream()
                .map(i -> personMapper.toDTO(i))
                .collect(Collectors.toList());
    }

    @Override
    public PersonDTO getPerson(long id) {
        PersonEntity personEntity = fetchPersonById(id);

        return personMapper.toDTO(personEntity);
    }

    private PersonEntity fetchPersonById(long id) {
        return personRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Person with id " + id + " wasn't found in the database."));
    }

    @Override
    public PersonDTO getById(long personId) {
        PersonEntity fetchedPerson = getPersonOrThrow(personId);

        return personMapper.toDTO(fetchedPerson);
    }

    private PersonEntity getPersonOrThrow(long personId) {
        return personRepository
                .findById(personId)
                .orElseThrow();
    }

    @Override
    public List<Map<String, Object>> getPersonStatistics() {
        List<Object[]> statisticsList = personRepository.getPersonStatistics();
        List<Map<String, Object>> statistics = new ArrayList<>();
        for (Object[] statistic : statisticsList) {
            Map<String, Object> statisticMap = new HashMap<>();
            statisticMap.put("personId", statistic[0]);
            statisticMap.put("personName", statistic[1]);
            statisticMap.put("revenue", statistic[2]);
            statistics.add(statisticMap);
        }
        return statistics;
    }
}