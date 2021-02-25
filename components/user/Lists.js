import React, { useState, useEffect } from "react";
import styles from "../../styles/index.module.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetListsData } from "../../util/useRequest";
import GameListsList from "../GameListsList";

// UI Icons
import { Icon } from "@iconify/react";
import listIcon from "@iconify/icons-fa-solid/list";
import arrowIconRight from "@iconify/icons-fa-solid/arrow-right";
import arrowIconLeft from "@iconify/icons-fa-solid/arrow-left";

const Lists = ({ user }) => {
  const [pageNum, setPageNum] = useState(1);

  const pageSize = 16;

  const { listsData, listsError } = useGetListsData(
    user._id,
    "",
    pageSize,
    pageNum
  );

  const prevResults = () => {
    setPageNum(pageNum - 1);
  };

  const nextResults = () => {
    setPageNum(pageNum + 1);
  };

  return (
    <div>
      <h1 className={styles.tabHeader}>
        <Icon icon={listIcon} /> <span>Lists</span>
      </h1>
      <div>
        {!listsData || listsData?.lists.length < 1 ? (
          <p>No Lists...</p>
        ) : (
          <>
            {" "}
            {[...Array(Math.ceil(listsData?.lists.length > 0 / 4)).keys()].map(
              (i) => (
                <GameListsList
                  data={listsData.lists.slice(i * 4, i * 4 + 4)}
                  key={i}
                />
              )
            )}
            <div className={styles.pageButtons}>
              <div className={styles.glassButtons}>
                <button
                  className={`${styles.button} ${
                    pageNum == 1 ? styles.disabled : ""
                  }`}
                  disabled={pageNum == 1}
                  onClick={prevResults}
                >
                  {<Icon icon={arrowIconLeft} width={25} />}
                </button>
                <button
                  className={`${styles.button} ${
                    pageNum == Math.ceil(listsData.count / pageSize) ||
                    listsData.count == 0
                      ? styles.disabled
                      : ""
                  }`}
                  disabled={
                    pageNum == Math.ceil(listsData.count / pageSize) ||
                    listsData.count == 0
                  }
                  onClick={nextResults}
                >
                  {<Icon icon={arrowIconRight} width={25} />}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Lists;
