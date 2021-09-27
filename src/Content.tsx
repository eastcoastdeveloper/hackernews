import React, { useEffect, useRef, useState } from 'react';
import "./Content.scss";

const Content = (
  {contentPanel, searchQuery, historyList, searchCallback}:
  {contentPanel:boolean, searchQuery: any, historyList:any, searchCallback:any}) => {

  // const mainElem = useRef(null);
  const mainElem = document.querySelector('main');
  useEffect(() => {
    if(mainElem) mainElem.scrollTop = 0;
  })
  
  const searchAgain = (i:number) => {
    const dataIndex = historyList[i].query;
    searchCallback(dataIndex)
  }
  
  return (
    <div className="content">
     <main className={contentPanel ? 'overflow-y-none' : ''}>
     <ul className="search-results">
     {
       searchQuery.map((item:any, index:number) => (
        <li key={index}>
        <a target="_blank" href={item.story_url}>{item.story_title}</a>
      </li>
      ))
     }
    </ul>
      <div id="search-history" className={contentPanel ? 'show-panel' : 'hide-panel'}>
        <h3>Search History</h3>
        <ul>
          {
            historyList.map((val:any, index:number) => (
              <li key={index}>
                <div>
                  <div className="history-query">
                    <span>Query: {val.query}</span>
                    <span onClick={() => searchAgain(index)}>Search Again</span>
                  </div>
                  <div className="history-results">
                    <a href={val.hits[0].story_url} target="_blank">{val.hits[0].story_title}</a>
                    <a href={val.hits[1].story_url} target="_blank">{val.hits[1].story_title}</a>
                    <a href={val.hits[2].story_url} target="_blank">{val.hits[2].story_title}</a>
                  </div>
                </div>
                </li>
            ))
          }
      </ul>
      </div>
     </main>
    </div>
  )
}

export default Content;