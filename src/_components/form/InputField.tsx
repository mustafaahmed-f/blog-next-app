import { getErrObject } from "@/_utils/helperMethods/getErrObject";
import {
  FieldValues,
  Path,
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
} from "react-hook-form";
import { Input } from "../ui/input";

interface InputFieldProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  placeholder?: string;
  required?: boolean;
  errors: any;
  watch: UseFormWatch<T>;
  setValue: UseFormSetValue<T>;
  trigger: UseFormTrigger<T>;
  register: UseFormRegister<T>;
}

function InputField<T extends FieldValues>({
  name,
  label,
  required,
  placeholder,
  errors,
  register,
}: InputFieldProps<T>) {
  const errorObj = getErrObject<T>(errors, name);
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <label style={{ wordBreak: "keep-all", whiteSpace: "nowrap" }}>
        {label}
        {required && <span className="ms-1 text-red-500">*</span>}
        {" : "}
      </label>
      <Input
        type="text"
        placeholder={placeholder}
        {...register(name)}
        style={{ padding: "10px" }}
      />
      {errorObj && (
        <p className="mt-1 text-xs text-red-600">{errorObj.message}</p>
      )}
    </div>
  );
}

export default InputField;
