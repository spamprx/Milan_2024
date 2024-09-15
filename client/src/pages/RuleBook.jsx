import React, { useEffect } from 'react';

function RuleBook() {
  useEffect(() => {
    if (!window.hasRedirected) {
      window.location.href = 'https://drive.google.com/file/d/19x6wXCwdY1wUR0YByT8_KhcxGI6hLIU9/view';
      window.hasRedirected = true;
    }
  }, []);

  return <h1>Redirecting to Rule Book...</h1>;
}

export default RuleBook;