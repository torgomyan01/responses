import React from 'react';
import './status-button.css';
import { STATUS_BUTTON } from '../../utils/const';

function StatusButton({ status }: StatusButton) {
  function printStatusClass(status: number) {
    switch (status) {
      case 10:
        return STATUS_BUTTON.SUCCESS;
      case 1:
        return STATUS_BUTTON.CLOSED;
    }
  }

  function printStatusText(status: number) {
    switch (status) {
      case 10:
        return 'Օтправлен';
      case 1:
        return 'Не отправлен';
    }
  }
  return (
    <button className={`btn-status ${printStatusClass(status)}`}>{printStatusText(status)}</button>
  );
}

export default StatusButton;
