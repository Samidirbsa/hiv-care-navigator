import { z } from "zod";

export const patientEntrySchema = z.object({
  no: z.string().min(1, "Required"),
  dateTested: z.date(),
  clientSerialNumber: z.string().min(1, "Serial Number is required"),
  age: z.coerce.number().min(0),
  sex: z.enum(["Male", "Female"]),
  htcProvider: z.string().min(1, "HTC Provider is required"),
  artEnrollmentDate: z.date(),
  uniqueArtNumber: z.string().min(1, "Unique ART Number is required"),
  nextAppointmentDate: z.date(),
  remarks: z.string().optional(),
});

export type PatientEntryFormValues = z.infer<typeof patientEntrySchema>;