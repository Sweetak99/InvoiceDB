package spring.dto.mapper;

import spring.dto.PersonDTO;
import spring.entity.PersonEntity;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;


@Mapper(componentModel = "spring")
public interface PersonMapper {

    PersonEntity toEntity(PersonDTO source);

    PersonDTO toDTO(PersonEntity source);

    void updatePersonDTO(PersonDTO source, @MappingTarget PersonDTO target);

    void updatePersonEntity(PersonDTO source, @MappingTarget PersonEntity target);
}
