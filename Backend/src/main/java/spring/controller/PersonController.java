package spring.controller;

import spring.dto.PersonDTO;
import spring.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class PersonController {

    @Autowired
    private PersonService personService;

    @PostMapping("/persons")
    public PersonDTO addPerson(@RequestBody PersonDTO personDTO) {
        return  personService.addPerson(personDTO);
    }

    @GetMapping("/persons")
    public List<PersonDTO> getPersons() {
        return personService.getAll();
    }

    @DeleteMapping("/persons/{personId}")
    public void deletePerson(@PathVariable Long personId) {
        personService.removePerson(personId);
    }

    @GetMapping("/persons/{personId}")
    public PersonDTO getPerson(@PathVariable Long personId) {
        return personService.getPerson(personId);
    }

    @PutMapping("/persons/{personId}")
    public PersonDTO editPerson(
            @PathVariable long personId,
            @RequestBody PersonDTO personDTO
    ) {
        return personService.editPerson(personDTO, personId);
    }
    @GetMapping("/persons/statistics")
    public List<Map<String, Object>> getPersonStatistics() {
        return personService.getPersonStatistics();
    }
}

