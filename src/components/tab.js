import React, { useState } from "react";
import MainComponent from "./MainComponent";
import "../App.css";
export default function Tab() {
  //Tabs
  const [myTabs, setTabs] = useState([{ id: 1 }]);
  const [activeTab, setActiveTab] = useState(1);

  const closeTab = (tabId) => {
    const newupdateTab = myTabs.filter((tab) => tab.id !== tabId);
    setTabs(newupdateTab);
    if (activeTab === tabId) {
      setActiveTab(newupdateTab.length > 0 ? newupdateTab[0].id : null);
    }
  };

    const addNewTab = () => {
      const newTab = { id: myTabs.length + 1 };
      setTabs([...myTabs, newTab]);
      setActiveTab(newTab.id);
    };

  return (
    <div>
      <ul className="nav nav-tabs">
        {myTabs.map((tab) => (
          <li className="nav-item" key={tab.id}>
            <a
              onClick={() => setActiveTab(tab.id)}
              className="tabs"
            >
              Tab {tab.id}
              {tab.id !== 1 && (
                <button className="close ml-2" onClick={() => closeTab(tab.id)}>
                  X
                </button>
              )}
            </a>
          </li>
        ))}
        <li>
          <button className="nav-item" onClick={addNewTab}>
            <i
              className="fa-solid fa-plus"
            ></i>
          </button>
        </li>
      </ul>
      {myTabs.map((t, index) => (
        <div
          key={index}
          className={index + 1 === activeTab ? "tab-active" : "tab"}
        >
          <MainComponent />
        </div>
      ))}
    </div>
  );
}
