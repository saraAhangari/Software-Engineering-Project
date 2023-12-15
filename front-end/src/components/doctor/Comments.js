import React from "react";
import Comment from "./Comment";
import {useTheme} from "@mui/material";

function Comments(props) {
    const {comments, style} = props;
    const theme = useTheme();

    return (
        <div
            style={
                {
                    alignSelf: 'center',
                    display: 'flex',
                    padding: '20px 40px',
                    height: 'fit-content',
                    flexDirection: 'column',
                    width: 'min(100%,700px)',
                    borderRadius: theme.shape.borderRadius,
                    background: theme.palette.background.paper,
                    boxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.25)',
                    ...style,
                }
            }
        >
            <p
                style={
                    {
                        fontSize: '0.75rem',
                        fontWeight: 'bold',
                    }
                }
            >نظرات</p>

            <div
                style={
                    {
                        width: '100%',
                        height: '1px',
                        margin: '5px 0 20px 0',
                        background: 'black'
                    }
                }
            />

            {
                comments?.map(
                    (comment, index) => {
                        return <>
                            <Comment
                                rate={comment.rate}
                                date={comment.date}
                                content={comment.content}
                            />
                            {
                                (index < comments.length - 1) && <div
                                    style={
                                        {
                                            width: '100%',
                                            height: '1px',
                                            background: '#D9D9D9',
                                        }
                                    }
                                />
                            }
                        </>
                    }
                )
            }
        </div>
    )
}

export default Comments;
