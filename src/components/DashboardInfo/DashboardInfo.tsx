import React from "react";
import styles from "./DashboardInfo.module.sass";

const DashboardInfo = ({
  titulo,
  value,
  quantidade,
}: {
  titulo: string;
  value?: number;
  quantidade?: number;
}) => {
  return (
    <div className={styles.dashboardInfo}>
      <p>{titulo}</p>
      {quantidade && <strong>{quantidade}</strong>}
      {value && <strong>R${value},00</strong>}
    </div>
  );
};

export default DashboardInfo;
