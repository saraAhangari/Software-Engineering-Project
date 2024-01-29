import React from "react";
import Comments from "../../components/comment/Comments";
import MainTemplate from "../../components/container/MainTemplate";

function MyComments() {
    const comments = [
        {
            rate: 5,
            date: '1402-01-23',
            doctorName: 'دکتر محسن احسانی',
            content: 'دکتر بسیار با تجربه و خوش اخلاق، من تحت درمانم فعلا تا الان خیلی خوب بوده',
        },
        {
            rate: 3.3,
            date: '1402-01-23',
            doctorName: 'دکتر محسن احسانی',
            content: 'دکتر بسیار با تجربه و خوش اخلاق، من تحت درمانم فعلا تا الان خیلی خوب بوده',
        },
        {
            rate: 2.5,
            date: '1402-01-23',
            doctorName: 'دکتر احمد کریمی',
            content: 'دکتر بسیار با تجربه و خوش اخلاق، من تحت درمانم فعلا تا الان خیلی خوب بوده',
        },
        {
            rate: 1.3,
            date: '1402-01-23',
            doctorName: 'دکتر محسن احسانی',
            content: 'دکتر بسیار با تجربه و خوش اخلاق، من تحت درمانم فعلا تا الان خیلی خوب بوده',
        },
        {
            rate: 0.7,
            date: '1402-01-23',
            doctorName: 'دکتر احمد کریمی',
            content: 'دکتر بسیار با تجربه و خوش اخلاق، من تحت درمانم فعلا تا الان خیلی خوب بوده',
        },
        {
            rate: 5,
            date: '1402-01-23',
            doctorName: 'دکتر محسن احسانی',
            content: 'دکتر بسیار با تجربه و خوش اخلاق، من تحت درمانم فعلا تا الان خیلی خوب بوده',
        },
        {
            rate: 3.3,
            date: '1402-01-23',
            doctorName: 'دکتر محسن احسانی',
            content: 'دکتر بسیار با تجربه و خوش اخلاق، من تحت درمانم فعلا تا الان خیلی خوب بوده',
        },
        {
            rate: 2.5,
            date: '1402-01-23',
            doctorName: 'دکتر احمد کریمی',
            content: 'دکتر بسیار با تجربه و خوش اخلاق، من تحت درمانم فعلا تا الان خیلی خوب بوده',
        },
        {
            rate: 1.3,
            date: '1402-01-23',
            doctorName: 'دکتر محسن احسانی',
            content: 'دکتر بسیار با تجربه و خوش اخلاق، من تحت درمانم فعلا تا الان خیلی خوب بوده',
        },
        {
            rate: 0.7,
            date: '1402-01-23',
            doctorName: 'دکتر احمد کریمی',
            content: 'دکتر بسیار با تجربه و خوش اخلاق، من تحت درمانم فعلا تا الان خیلی خوب بوده',
        },
    ]


    return (
        <MainTemplate
            hasLoggedIn={true}
        >
            <div
                style={
                    {
                        width: '100%',
                        padding: '20px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }
                }
            >
                <Comments
                    style={
                        {
                            margin: '20px'
                        }
                    }
                    title={'نظرات من'}
                    comments={comments}
                />
            </div>
        </MainTemplate>
    )
}

export default MyComments;
