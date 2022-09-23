import { ChangeEvent, FC } from "react";
import style from "./MoneyInput.module.scss";
import ethIcon from "../../../assets/icons/eth.svg";

interface Props {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  disabled?: boolean;
}

export const MoneyInput: FC<Props> = ({
  value,
  onChange,
  placeholder,
  disabled = false,
}) => {
  return (
    <div className={style.moneyInput}>
      <input
        value={value}
        type="text"
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={style.input}
      />
      <div className={style.currency}>
        ETH/Day{" "}
        <img className={style.currencyIcon} src={ethIcon} alt="ETH icon" />
      </div>
    </div>
  );
};
