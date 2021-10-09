import React, { useEffect, useRef } from 'react';

const Utteranc: React.FC = () => {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const utteranceTheme = 'github-light'; // github-dark github-light

    const scriptEl = document.createElement("script");
    scriptEl.setAttribute("src", "https://utteranc.es/client.js");
    scriptEl.setAttribute("crossorigin","anonymous");
    scriptEl.setAttribute("async", "true");
    scriptEl.setAttribute("repo", "jdm85kor/vlogdev");
    scriptEl.setAttribute("issue-term", "url");
    scriptEl.setAttribute("label", "Hi!");
    scriptEl.setAttribute("theme", utteranceTheme);
    divRef.current?.appendChild(scriptEl);
  }, []);
  return (
    <div ref={divRef} />
  );
};

export default Utteranc;