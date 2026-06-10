import React from 'react';
import './Alert.scss';


type AlertSeverity = 'success' | 'info' | 'warning' | 'error';

interface AlertProps {
  severity?: AlertSeverity;
}
// Usage:
// <Alert severity="success">This is a success Alert.</Alert>
// Severities: success | info | warning | error
const icons :any= {
    success: (
        <svg className="alert-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path
                d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm-1 14.2-3.6-3.6 1.4-1.4L11 13.6l4.8-4.8 1.4 1.4L11 16.2Z"/>
        </svg>
    ),
    info: (
        <svg className="alert-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 15h-2v-6h2v6Zm0-8h-2V7h2v2Z"/>
        </svg>
    ),
    warning: (
        <svg className="alert-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M1 21h22L12 2 1 21Zm12-3h-2v-2h2v2Zm0-4h-2V9h2v5Z"/>
        </svg>
    ),
    error: (
        <svg className="alert-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 15h-2v-2h2v2Zm0-4h-2V7h2v6Z"/>
        </svg>
    ),
};

const Alert: React.FC<React.PropsWithChildren<AlertProps>> = ({
  severity = 'info',
  children,
}) => {
    const cls = `alert alert-${severity}`;
    const icon = icons[severity] || icons.info;
    return (
        <div role="alert" className={cls}>
            {icon}
            <span className="alert-text">{children}</span>
        </div>
    );
};

export default Alert;

