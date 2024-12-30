import { z } from "zod";

export const editSupplierSchema = z.object({
  businessName: z
    .string({
      required_error: "El nombre del negocio es requerido",
    })
    .min(2, {
      message: "El nombre del negocio debe tener al menos 2 caracteres",
    })
    .max(100, {
      message: "El nombre del negocio debe tener como máximo 100 caracteres",
    }),
  tradeName: z
    .string({
      required_error: "El nombre comercial es requerido",
    })
    .min(2, {
      message: "El nombre comercial debe tener al menos 2 caracteres",
    })
    .max(100, {
      message: "El nombre comercial debe tener como máximo 100 caracteres",
    }),
  taxId: z
    .string({
      required_error: "La identificación tributaria es requerida",
    })
    .length(11, {
      message: "La identificación tributaria debe tener 11 caracteres",
    }),
  phoneNumber: z
    .string({
      required_error: "El número telefónico es requerido",
    })
    .min(10, {
      message: "El número telefónico debe tener al menos 10 caracteres",
    })
    .max(20, {
      message: "El número telefónico debe tener como máximo 20 caracteres",
    }),
  email: z
    .string({
      required_error: "El email es requerido",
    })
    .email({
      message: "El email no es válido",
    }),
  website: z
    .string({
      required_error: "El sitio web es requerido",
    })
    .url({
      message: "El sitio web no es una URL valida",
    }),
  address: z
    .string({
      required_error: "La dirección es requerida",
    })
    .min(10, {
      message: "La dirección debe tener al menos 10 caracteres",
    })
    .max(200, {
      message: "La dirección debe tener como máximo 200 caracteres",
    }),
  country: z
    .string({
      required_error: "El país es requerido",
    })
    .min(2, {
      message: "El país debe tener al menos 2 caracteres",
    })
    .max(100, {
      message: "El país debe tener como máximo 100 caracteres",
    }),
  annualRevenue: z
    .number({
      required_error: "La facturación anual es requerida",
    })
    .nonnegative({
      message: "La facturación anual no puede ser negativa",
    })
    .min(0, {
      message: "La facturación anual debe ser mayor o igual a 0",
    }),
});
