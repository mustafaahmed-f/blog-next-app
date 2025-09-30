import {
  FieldValues,
  Path,
  PathValue,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
} from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import styles from "./DropList.module.css";

interface DropListProps<T extends FieldValues> {
  options: any[];
  name: Path<T>;
  label: string;
  required?: boolean;
  errors: any;
  setValue: UseFormSetValue<T>;
  trigger: UseFormTrigger<T>;
  watch: UseFormWatch<T>;
}

function DropList<T extends FieldValues>({
  options,
  name,
  label,
  required,
  watch,
  setValue,
  trigger,
  errors,
}: DropListProps<T>) {
  function onSelectChange(value: string) {
    setValue(name, value as PathValue<T, Path<T>>, { shouldValidate: true });
    trigger(name);
  }

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        gap: "10px",
        flexDirection: "column",
      }}
    >
      <label style={{ wordBreak: "keep-all", whiteSpace: "nowrap" }}>
        {label}
        {required && <span className="ms-1 text-red-500">*</span>}
        {" : "}
      </label>
      <Select onValueChange={onSelectChange}>
        <SelectTrigger
          style={{ width: "100%", paddingInline: "10px", cursor: "pointer" }}
        >
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          {options.map((item: any) => (
            <SelectItem
              key={item.id}
              value={item.id}
              className={styles.selectItem}
            >
              {item.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default DropList;
