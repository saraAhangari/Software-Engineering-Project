import React from "react";
import {ReactComponent as CalendarLogo} from "../../assets/images/icon_calendar.svg";

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
    const {date, content, rate, doctorName, style} = props;

    const hasDoctorName = doctorName !== undefined;

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
            {
                hasDoctorName && <p
                    style={
                        {
                            color: 'black',
                            flexGrow: '1',
                            fontSize: '0.95rem',
                        }
                    }
                >{doctorName}</p>
            }
            <Rating rate={rate}/>
            {
                hasDoctorName && <div style={ { flexBasis: '100%', height: '0' } } />
            }
            {
                hasDoctorName && <CalendarLogo
                    style={
                        {
                            width: '20px',
                            height: '20px',
                            stroke: '#D9D9D9', //TODO: stroke doesnt work :(
                        }
                    }
                />
            }
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
                        marginRight: hasDoctorName ? '0' : '50px',
                    }
                }
            >{content}</p>
        </div>
    )
}

export default Comment;
