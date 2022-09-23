import { ChangeEventHandler, FC, useState } from "react";
import styles from "./Checkbox.module.scss";

interface Props {
  id: string;
  label: string;
  value: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
  additionalText?: string;
}

export const Checkbox: FC<Props> = ({
  id,
  label,
  value,
  onChange,
  disabled = false,
  additionalText,
}) => {
  return (
    <div className={styles.checkbox}>
      <input
        id={id}
        type="checkbox"
        checked={value}
        onChange={onChange}
        disabled={disabled}
      />
      <label htmlFor={id}>{label}</label>
      {!!additionalText && (
        <div className={styles.additionalText}>{additionalText}</div>
      )}
    </div>
  );
};
