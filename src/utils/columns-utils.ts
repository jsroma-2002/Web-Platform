export function getColumnsDisplayName(key: string) {
  switch (key) {
    case "id":
      return "ID";
    case "businessName":
      return "Razón social";
    case "tradeName":
      return "Nombre comercial";
    case "taxId":
      return "Identificación tributaria ";
    case "phoneNumber":
      return "Número telefónico";
    case "email":
      return "Correo electrónico";
    case "website":
      return "Sitio web";
    case "address":
      return "Dirección física";
    case "country":
      return "País";
    case "annualRevenue":
      return "Facturación A.";
    case "lastEdited":
      return "Última edición";
    default:
      return key;
  }
}
