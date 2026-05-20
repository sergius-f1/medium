import React from 'react';
import './Spinner.css';

export function Spinner(): React.ReactElement {
  return <span className="spinner" role="status" aria-label="Loading" />;
}