import React, { useState } from "react";
import MainComponent from "./MainComponent";
import '../App.css';
export default function Tab() {
  //Tabs
  const [tabs, setTabs] = useState([{ id: 1 }]);
  const [activeTab, setActiveTab] = useState(1);
  //Add tab functionlity
  const addTab = () => {
    const newTab = { id: tabs.length + 1 };
    setTabs([...tabs, newTab]);
    setActiveTab(newTab.id);
  };
  //Close tab functionality
  const closeTab = (tabId) => {
    const newupdateTab = tabs.filter((tab) => tab.id !== tabId);
    setTabs(newupdateTab);
    if (activeTab === tabId) {
      setActiveTab(newupdateTab.length > 0 ? newupdateTab[0].id : null);
      // setData(data);
    }
  };
  return (
    <div>
      <ul className="nav nav-tabs">
        {tabs.map((tab) => (
          <li className="nav-item" key={tab.id}>
            <a onClick={() => setActiveTab(tab.id)} style={{fontSize:20 , color:'black'}} className='tabs'>
              Tab {tab.id}
              {tab.id !== 1 && (
                <button className="close ml-2" onClick={() => closeTab(tab.id)}>X</button>
              )}
            </a>
          </li>
        ))}
        <li>
                  <button className="nav-item" onClick={addTab}>
                  <i className="fa-solid fa-plus" style={{color : 'red' , backgroundColor:'white'}}></i>
          </button>
        </li>
      </ul>
      {tabs.map((tab, index) => (
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