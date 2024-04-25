package spring.dto.mapper;

import spring.dto.InvoiceDTO;
import spring.entity.InvoiceEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface InvoiceMapper {

    InvoiceEntity toEntity(InvoiceDTO source);

    InvoiceDTO toDTO(InvoiceEntity source);

    void updateInvoiceDTO(InvoiceDTO source, @MappingTarget InvoiceDTO target);

    @Mapping(target = "id", ignore = true)
    void updateInvoiceEntity(InvoiceDTO source, @MappingTarget InvoiceEntity target);
}
