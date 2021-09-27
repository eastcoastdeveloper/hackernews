import React, { useState, useCallback, useEffect, useRef } from 'react';
import Content from './Content';
import Footer from './Footer';
import Header from './Header';
import "./style.scss";

const App = () => {
  
  let [historyBtn, setHistory] = useState(false);
  let [contentPanel, setPanel] = useState(false);
  let [searchQuery, setState] = useState([]);
  let [historyList, setList] = useState([] as any);
  const isMounted = useRef(false);

  let url = 'https://hn.algolia.com/api/v1/search_by_date?query=',
      userQuery = 'front_page';

  const historyBtnCallback = useCallback((historyBtn) => {
    setPanel(historyBtn);
  }, [])

  const searchCallback = useCallback((val) => {
    userQuery = val;
    isMounted.current = false;
    if(!isMounted.current){
      fetchData()
    }
    setPanel(false);
  }, [])

  // One fetch for all components
  const fetchData = async () => {
    const res = await fetch(url + userQuery);
    const jsonData = await res.json();
    searchQuery = jsonData.hits;
    historyList.push(jsonData)
    setState(searchQuery);
    setList(historyList);
  };

  useEffect(() => {
    if(!isMounted.current){
      fetchData()
    }
    isMounted.current = true;
  }, []);

  return (
    <div className="wrapper">
      <Header
        contentPanel={contentPanel}
        historyBtn={historyBtn}
        searchCallback={searchCallback}
        historyBtnCallback={historyBtnCallback}
      />
      <Content
        contentPanel={contentPanel}
        searchQuery={searchQuery}
        historyList={historyList}
        searchCallback={searchCallback}
      />
      <Footer />
    </div>
  );
}

export default App;
