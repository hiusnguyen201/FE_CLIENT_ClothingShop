import { FormikProps } from "formik";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils"; // nếu bạn có xài className helper

interface BirthdaySelectProps {
  formik: FormikProps<any>;
  name: string; // "birthday"
}

const BirthdaySelect = ({ formik, name }: BirthdaySelectProps) => {
  const { values, setFieldValue, errors, touched } = formik;

  const birthday = values[name] || { day: "", month: "", year: "" };

  const getDaysInMonth = (month: number, year: number) => {
    if (!month || !year) return 31;
    return new Date(year, month, 0).getDate();
  };

  const handleChange = (field: "day" | "month" | "year", value: string) => {
    const updatedBirthday = { ...birthday, [field]: value };

    // Reset day if invalid
    if (field !== "day") {
      const day = parseInt(updatedBirthday.day, 10);
      const month = parseInt(updatedBirthday.month, 10);
      const year = parseInt(updatedBirthday.year, 10);
      const maxDays = getDaysInMonth(month, year);
      if (day > maxDays) {
        updatedBirthday.day = "";
      }
    }

    setFieldValue(name, updatedBirthday);
  };

  const days = (() => {
    const month = parseInt(birthday.month, 10);
    const year = parseInt(birthday.year, 10);
    const maxDay = month && year ? getDaysInMonth(month, year) : 31;
    return Array.from({ length: maxDay }, (_, i) => (i + 1).toString());
  })();

  const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
  const years = Array.from({ length: 100 }, (_, i) => (new Date().getFullYear() - i).toString());

  const birthdayError = errors?.[name] as any;
  const birthdayTouched = touched?.[name] as any;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        {/* Day */}
        <div className="flex flex-col">
          <Select value={birthday.day} onValueChange={(val) => handleChange("day", val)}>
            <SelectTrigger
              className={cn(
                "lg:w-[150px] w-[120px] md:w-[140px] border-gray-300",
                birthdayError?.day && birthdayTouched?.day && "border-red-500"
              )}
            >
              <SelectValue placeholder="Day" />
            </SelectTrigger>
            <SelectContent className="border border-gray-200 bg-white">
              {days.map((day) => (
                <SelectItem key={day} value={day}>
                  {day.padStart(2, "0")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {birthdayError?.day && birthdayTouched?.day && (
            <div className="text-red-500 text-xs mt-1">{birthdayError.day}</div>
          )}
        </div>

        {/* Month */}
        <div className="flex flex-col">
          <Select value={birthday.month} onValueChange={(val) => handleChange("month", val)}>
            <SelectTrigger
              className={cn(
                "lg:w-[150px] w-[120px] md:w-[140px] border-gray-300",
                birthdayError?.month && birthdayTouched?.month && "border-red-500"
              )}
            >
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent className="border border-gray-200 bg-white">
              {months.map((month) => (
                <SelectItem key={month} value={month}>
                  {month.padStart(2, "0")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {birthdayError?.month && birthdayTouched?.month && (
            <div className="text-red-500 text-xs mt-1">{birthdayError.month}</div>
          )}
        </div>

        {/* Year */}
        <div className="flex flex-col">
          <Select value={birthday.year} onValueChange={(val) => handleChange("year", val)}>
            <SelectTrigger
              className={cn(
                "lg:w-[150px] w-[120px] md:w-[140px] border-gray-300",
                birthdayError?.year && birthdayTouched?.year && "border-red-500"
              )}
            >
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent className="border border-gray-200 bg-white">
              {years.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {birthdayError?.year && birthdayTouched?.year && (
            <div className="text-red-500 text-xs mt-1">{birthdayError.year}</div>
          )}
        </div>
      </div>

      {/* Nếu có lỗi chung invalid date */}
      {birthdayError?.invalidDate && <div className="text-red-500 text-xs mt-2">{birthdayError.invalidDate}</div>}
    </div>
  );
};

export default BirthdaySelect;
