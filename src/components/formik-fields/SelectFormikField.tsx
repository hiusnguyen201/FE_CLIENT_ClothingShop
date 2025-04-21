import { FormikProps } from "formik";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { cn } from "@/lib/utils";

export type SelectFormikFieldProps<TData> = {
    name: keyof TData & string;
    label?: string;
    required?: boolean;
    options: { value: string; label: string }[];
    className?: string;
    formikProps: FormikProps<TData>;
};

export function SelectFormikField<TData>({
    name,
    label,
    required = false,
    options,
    className,
    formikProps,
}: SelectFormikFieldProps<TData>) {
    const { values, errors, touched, setFieldValue } = formikProps;

    const currentValue: string = values[name] as string;
    const error: string | undefined = touched[name] && errors[name] ? (errors[name] as string) : undefined;

    return (
        <div className={cn("w-full", className)}>
            {label && (
                <Label className={cn("select-none mb-2 block", error && "text-red-500")}>
                    {label} {required && <span>*</span>}
                </Label>
            )}
            <Select
                onValueChange={(value) => setFieldValue(name, value)}
                value={currentValue}
            >
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                    {options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
        </div>
    );
}