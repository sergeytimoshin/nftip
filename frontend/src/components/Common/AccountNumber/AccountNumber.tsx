import { FC, useMemo } from "react";
import { useSelector } from "react-redux";
import { userAccountNumber } from "../../../modules/selectors/user.selector";
import styles from "./AccountNumber.module.scss";

interface Props {
  truncateLength?: number;
}

export const AccountNumber: FC<Props> = ({ truncateLength = 5 }) => {
  const accountNumber = useSelector(userAccountNumber);
  const accountTruncate = (accNum) => {
    return `${accNum.substr(0, truncateLength)}...${accNum.substr(
      accNum.length - truncateLength
    )}`;
  };

  const truncatedAccountNumber = useMemo(
    () => accountTruncate(accountNumber),
    [accountNumber]
  );

  return <div className={styles.accountNumber}>{truncatedAccountNumber}</div>;
};
