import PropTypes from 'prop-types';

const Notification = ({ message, type }) => {
    let backgroundColor;

    switch (type) {
        case 'success':
            backgroundColor = '#118b50';
            break;
        case 'failure':
            backgroundColor = '#ec612a';
            break;
        case 'normal':
        default:
            backgroundColor = '#ffe5c7';
            break;
    }

    const notificationStyle = {
        padding: '10px',
        borderRadius: '5px',
        color: '#fff',
        backgroundColor,
        margin: '10px 0',
    };

    return <div style={notificationStyle}>{message}</div>;
};

Notification.propTypes = {
    message: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['success', 'failure', 'normal']).isRequired,
};

export default Notification;