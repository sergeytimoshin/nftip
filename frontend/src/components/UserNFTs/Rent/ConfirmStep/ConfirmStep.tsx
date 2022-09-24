import { useState, useContext } from "react";
import { Checkbox } from "../../../Common/Checkbox/Checkbox";
import { RentContext } from "../context/rent.context";
import styles from "./ConfirmStep.module.scss";
import { Event } from "ethers";
import { ERC721Rent__factory } from "../../../../typechain-types";
import { ethProvider } from "../../../../utils/utils";

export const ConfirmStep = () => {
  const [firstCheck, setFirstCheck] = useState(false);
  const { setStep, nft } = useContext(RentContext);

  const { id } = nft;

  const checkboxHandler = () => {
    setFirstCheck(!firstCheck);
  };

  const confirmHandler = async () => {
    const contract = await ERC721Rent__factory.connect(
      "0xa5a47bF5273dD40679C213C8A8939c5133A85635",
      ethProvider.getSigner()
    );

    // // approve rent nft
    const trans2 = await contract.rent(
      "0xC7E1ae0dA2fD67a4192560C709A8Ed33557e435a",
      id._hex, //tokenId
      1, //time for rent
      { value: 2 } /*totalPrice = time*(price+collateral)*/
    );

    // result of nft renting
    const txRecite = await trans2.wait();

    const event = (txRecite.events as Event[]).find(
      (event) => event.event === "Transfer"
    );
    const args = event.args;
    const rentTokenId = args[2];

    if (!rentTokenId) {
      setStep("success");
    }
  };

  return (
    <div className={styles.rentStep}>
      <div className={styles.title}>Agreement</div>
      <div className={styles.subTitle}>Updated March 25, 2022</div>
      <div className={styles.agreementText}>
        Praesentium in aspernatur quae ut impedit consequatur quo. Ipsam
        temporibus blanditiis pariatur eveniet accusamus temporibus. Id dolores
        earum eum qui. Et est ipsa adipisci iste. Cum officiis sed beatae aut in
        necessitatibus est sequi. Debitis qui ad illo magnam ut. Et delectus vel
        sed iure. Aut illo modi. Ut perspiciatis repudiandae asperiores in
        blanditiis.
        <br />
        <br />
        Praesentium in aspernatur quae ut impedit consequatur quo. Ipsam
        temporibus blanditiis pariatur eveniet accusamus temporibus. Id dolores
        earum eum qui. Et est ipsa adipisci iste. Cum officiis sed beatae aut in
        necessitatibus est sequi. Debitis qui ad illo magnam ut. Et delectus vel
        sed iure. Aut illo modi. Ut perspiciatis repudiandae asperiores in
        blanditiis.
      </div>
      <a className={styles.pdfLink} href="">
        Link to PDF copy of agreement
      </a>

      <div className={styles.checkboxes}>
        <Checkbox
          value={firstCheck}
          label="I agree"
          onChange={checkboxHandler}
          id="agreement"
          additionalText="You'll make your nft ready for rent, are you sure?"
        />
      </div>

      <button
        className="button buttonFullWidth buttonCta"
        onClick={confirmHandler}
      >
        Confirm
      </button>
    </div>
  );
};
