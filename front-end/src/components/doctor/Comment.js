import React from "react";

function Rating(props) {
    const {rate} = props;

    return (
        <div
            style={
                {
                    width: '40px',
                    color: 'white',
                    height: 'fit-content',
                    borderRadius: '5px',
                    backgroundColor: getRatingColor(rate),
                    textAlign: 'center',
                    fontSize: '0.75rem'
                }
            }
        >{rate}</div>
    )
}

function getRatingColor(rate) {
    rate = parseFloat(rate);

    console.log(`rate: ${rate}`)

    if (rate ===undefined || isNaN(rate)) {
        return undefined;
    }

    if (rate > 4) {
        return '#57e32c'
    } else if (rate > 3) {
        return '#b7dd29'

    } else if (rate > 2) {
        return '#ffe234'

    } else if (rate > 1) {
        return '#ffa534'
    } else {
        return '#ff4545'
    }
}

function Comment(props) {
    const {date, content, rate, style} = props;

    return (
        <div
            style={
                {
                    display: 'flex',
                    padding: '10px',
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                    background: 'white',
                    ...style,
                }
            }
        >
            <Rating rate={rate}/>
            <p
                style={
                    {
                        color: '#747171',
                        marginRight: '10px',
                    }
                }
            >{date}</p>
            <p
                style={
                    {
                        color: 'black',
                        flexBasis: '100%',
                        fontSize: '0.85rem',
                        marginRight: '50px',
                    }
                }
            >{content}</p>
        </div>
    )
}

export default Comment;
