import React from 'react';
import './status-label.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

type StatusLabelType = 'success' | 'danger' | 'warning';

interface StatusLabelProps {
  type: StatusLabelType;
  message: string;
  spinner?: boolean;
}
const StatusLabel: React.FC<StatusLabelProps> = ({ type, message, spinner = false }) => {
  const getClassNames = (type: StatusLabelType): string => {
    const classes = ['label'];
    switch (type) {
      case 'success':
        classes.push('label-success');
        break;
      case 'danger':
        classes.push('label-danger');
        break;
      case 'warning':
        classes.push('label-warning');
        break;
    }
    return classes.join(' ');
  };

  return (
    <>
      <div className={getClassNames(type)}>
        {spinner && (
          <span style={{ marginRight: '0.4em' }}>
            <FontAwesomeIcon icon={faSpinner} spinPulse />
          </span>
        )}
        <span>{message}</span>
      </div>
    </>
  );
};

export default StatusLabel;
