using AspNetAngular.Dtos;
using AspNetAngular.Models;
using AutoMapper;

namespace AspNetAngular.Helpers
{
    public class AutoMapperProfiles: Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<AddSupplierDto, Suppliers>(); 
            CreateMap<EditSupplierDto, Suppliers>(); 
            CreateMap<Suppliers, SupplierResponseDto>(); 
        }
    }
}