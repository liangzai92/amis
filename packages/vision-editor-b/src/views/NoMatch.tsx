import React from 'react';
import {useLocation} from 'react-router-dom';

interface Props {
  title?: string;
}

const NoMatch: React.FC<Props> = ({title}) => {
  const location = useLocation();

  return (
    <div>
      <h1>Page Not Found</h1>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
};

export default NoMatch;
