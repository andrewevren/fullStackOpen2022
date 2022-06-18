const Notification = ({message,errorMessage}) => {
    const notificationStyle = {
        color: 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    const errorStyle = {
        color: 'red'
    }

    if (message) {
        return (
            <div style={notificationStyle}>{message}</div>
        )
    } else if (errorMessage) {
        return (
            <div style={{...notificationStyle, ...errorStyle}}>{errorMessage}</div>
        )
    } else {
        return null
    }
}

export default Notification