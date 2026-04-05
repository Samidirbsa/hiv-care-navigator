import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { 
  Calendar as CalendarIcon, 
  Save, 
  User, 
  ClipboardList, 
  Stethoscope, 
  CalendarRange 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import { patientEntrySchema, type PatientEntryFormValues } from '@/types/registration';

const PatientEntryForm = ({ onCancel }: { onCancel?: () => void }) => {
  // Use any to avoid strict type checking issues with zodResolver in this environment
  const form = useForm<any>({
    resolver: zodResolver(patientEntrySchema),
    defaultValues: {
      no: '',
      clientSerialNumber: '',
      age: 0,
      sex: 'Male',
      htcProvider: '',
      uniqueArtNumber: '',
      remarks: '',
    },
  });

  const onSubmit = (data: any) => {
    console.log('Submitted data:', data);
    toast.success('Patient record created successfully!');
    if (onCancel) onCancel();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Section 1: Basic Info */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="md:col-span-2 lg:col-span-3"
          >
            <Card className="border-none shadow-none bg-slate-50/50 p-6 rounded-2xl">
               <div className="flex items-center gap-2 mb-4 text-blue-600">
                 <User className="h-5 w-5" />
                 <h3 className="font-bold uppercase tracking-wider text-xs">Patient Identification</h3>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="no"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-600 font-semibold">No.</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. 1" {...field} className="bg-white rounded-xl border-slate-200 focus:ring-blue-500/20" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="clientSerialNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-600 font-semibold">Client Serial Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Testing Register Serial" {...field} className="bg-white rounded-xl border-slate-200 focus:ring-blue-500/20" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="uniqueArtNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-600 font-semibold">Unique ART Number</FormLabel>
                        <FormControl>
                          <Input placeholder="ART No." {...field} className="bg-white rounded-xl border-slate-200 focus:ring-blue-500/20" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
               </div>
            </Card>
          </motion.div>

          {/* Section 2: Demographics & Testing */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card className="border-none shadow-none bg-slate-50/50 p-6 rounded-2xl h-full">
               <div className="flex items-center gap-2 mb-4 text-indigo-600">
                 <Stethoscope className="h-5 w-5" />
                 <h3 className="font-bold uppercase tracking-wider text-xs">Clinical Testing</h3>
               </div>
               <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="dateTested"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="text-slate-600 font-semibold">Date Tested</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal bg-white rounded-xl border-slate-200",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() || date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="age"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-600 font-semibold">Age</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} className="bg-white rounded-xl border-slate-200 focus:ring-blue-500/20" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="sex"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-600 font-semibold">Sex</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-white rounded-xl border-slate-200">
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Male">Male</SelectItem>
                              <SelectItem value="Female">Female</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="htcProvider"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-600 font-semibold">HTC Provider</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-white rounded-xl border-slate-200">
                              <SelectValue placeholder="Select provider" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="OPD 203">OPD 203</SelectItem>
                            <SelectItem value="TB">TB Clinic</SelectItem>
                            <SelectItem value="VCT">VCT Centre</SelectItem>
                            <SelectItem value="PMTCT">PMTCT</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
               </div>
            </Card>
          </motion.div>

          {/* Section 3: Enrollment & Follow-up */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card className="border-none shadow-none bg-slate-50/50 p-6 rounded-2xl h-full">
               <div className="flex items-center gap-2 mb-4 text-emerald-600">
                 <CalendarRange className="h-5 w-5" />
                 <h3 className="font-bold uppercase tracking-wider text-xs">ART Enrollment</h3>
               </div>
               <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="artEnrollmentDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="text-slate-600 font-semibold">Date Enrolled to ART</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal bg-white rounded-xl border-slate-200",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() || date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="nextAppointmentDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="text-slate-600 font-semibold">Next Appointment Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal bg-white rounded-xl border-slate-200",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
               </div>
            </Card>
          </motion.div>

          {/* Section 4: Remarks */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Card className="border-none shadow-none bg-slate-50/50 p-6 rounded-2xl h-full">
               <div className="flex items-center gap-2 mb-4 text-amber-600">
                 <ClipboardList className="h-5 w-5" />
                 <h3 className="font-bold uppercase tracking-wider text-xs">Remarks & Notes</h3>
               </div>
               <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="remarks"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-600 font-semibold">Additional Remarks</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Enter any additional information or observations..." 
                            className="min-h-[148px] bg-white rounded-xl border-slate-200 focus:ring-blue-500/20 resize-none" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
               </div>
            </Card>
          </motion.div>
        </div>

        <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-100">
          <Button 
            type="button" 
            variant="ghost" 
            onClick={onCancel} 
            className="px-8 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors"
          >
            Discard Changes
          </Button>
          <Button 
            type="submit" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 rounded-xl shadow-lg shadow-blue-500/20 active:scale-95 transition-all h-11"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Record
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PatientEntryForm;