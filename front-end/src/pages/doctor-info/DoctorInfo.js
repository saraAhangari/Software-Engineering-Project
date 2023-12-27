import React, {useEffect, useRef, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import MainTemplate from "../../components/container/MainTemplate";
import Doctor from "../../components/doctor/Doctor";
import Biography from "../../components/doctor/Biography";
import AppointmentChooser from "../../components/doctor/AppointmentChooser";
import Comments from "../../components/comment/Comments";
import {safeApiCall} from "../../data/api/Api";
import {getDoctor} from "../../data/api/DoctorApi";
import {getDoctorComments} from "../../data/api/CommentApi";

function useDoctorInfo(doctorId) {
    const [info, setInfo] = useState(undefined)
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState({})

    const loadDoctorInfo = () => {
        safeApiCall(
            getDoctor(doctorId),
            setIsLoading,
            setErrors,
            (newInfo) => {
                setInfo(
                    {
                        ...info,
                        ...newInfo
                    }
                )
            },
        )
    }
    useEffect(loadDoctorInfo, [doctorId])

    const loadDoctorComments = () => {
        safeApiCall(
            getDoctorComments(doctorId),
            setIsLoading,
            setErrors,
            (comments) => {
                setInfo(
                    {
                        ...info,
                        comments: comments,
                    }
                )
            },
        )
    }
    useEffect(loadDoctorComments, [doctorId])

    return {info, isLoading, errors};
}

export default function DoctorInfo(props) { // Container
    const {doctor_id} = useParams();

    if (doctor_id === undefined) {
        window.location.replace('/all-doctors')
    }

    const navigate = useNavigate();

    function navigateToHome() {
        navigate('/');
    }

    const {info, isLoading, errors} = useDoctorInfo(doctor_id);
    // TODO: use the info instead of hard-coded data

    const doctor = {
        id: '1',
        name: 'دکتر محمد محمدی',
        expertise: 'متخصص جراحی استخوان و مفاصل',
    }

    const biography = {
        title: 'بیوگرافی',
        content: '-بالای 20 سال سابقه در بخش فوق تخصص گوارش بیمارستان میلاد \n' +
            '-آندوسکوپی کولونوسکوپی\n' +
            '-لاغری با تزریق بوتاکس معده بدون عمل جراحی\n' +
            '-درمان فیشر مخرج با تزریق بوتاکس بدون عمل جراحی \n' +
            '-عمل پلیپکتومی برای کسانی ک پلیپ روده دارند\n' +
            ' -درمان آشالازی با تزریق بوتاکس و بالن بدون عمل جراحی \n' +
            '-درمان تنگی دوازدهه بدون عمل جراحی '
    }

    const comments = [
        {
            rate: 5,
            date: '1402-01-23',
            content: 'دکتر بسیار با تجربه و خوش اخلاق، من تحت درمانم فعلا تا الان خیلی خوب بوده',
        },
        {
            rate: 3.3,
            date: '1402-01-23',
            content: 'دکتر بسیار با تجربه و خوش اخلاق، من تحت درمانم فعلا تا الان خیلی خوب بوده',
        },
        {
            rate: 2.5,
            date: '1402-01-23',
            content: 'دکتر بسیار با تجربه و خوش اخلاق، من تحت درمانم فعلا تا الان خیلی خوب بوده',
        },
        {
            rate: 1.3,
            date: '1402-01-23',
            content: 'دکتر بسیار با تجربه و خوش اخلاق، من تحت درمانم فعلا تا الان خیلی خوب بوده',
        },
        {
            rate: 0.7,
            date: '1402-01-23',
            content: 'دکتر بسیار با تجربه و خوش اخلاق، من تحت درمانم فعلا تا الان خیلی خوب بوده',
        },
    ]

    return (
        <DoctorInfoPresenter
            onButtonClicked={navigateToHome}
            doctor={doctor}
            biography={biography}
            comments={comments}
        />
    )
}

function DoctorInfoPresenter(props) {
    const doctorInfoRef = useRef(null);
    const [appointmentChooserMinHeight, setAppointmentChooserMinHeight] = useState(undefined);
    useEffect(
        () => {
            setAppointmentChooserMinHeight(doctorInfoRef.current.clientHeight)
        },
        [doctorInfoRef],
    )

    return <MainTemplate
        buttonTitle={"ورود | ثبت نام"}
        onButtonClicked={props.onButtonClicked}
    >
        <div
            style={
                {
                    width: "100%",
                    rowGap: "20px",
                    display: "flex",
                    padding: "20px 40px",
                    flexDirection: "column",
                    justifyContent: "center",
                }
            }
        >
            <div
                style={
                    {
                        gap: "15px",
                        width: "100%",
                        height: "fit-content",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        flexWrap: "wrap",
                    }
                }
            >
                <div
                    ref={doctorInfoRef}
                    style={
                        {
                            gap: "15px",
                            display: "flex",
                            height: "fit-content",
                            flexDirection: "column",
                            alignItems: "center",
                        }
                    }
                >
                    <Doctor
                        id={props.doctor.id}
                        name={props.doctor.name}
                        expertise={props.doctor.expertise}
                    />

                    <Biography
                        style={
                            {
                                width: "100%",
                                maxWidth: "450px",
                            }
                        }
                        title={props.biography.title}
                        content={props.biography.content}
                    />
                </div>

                <AppointmentChooser
                    style={
                        {
                            minHeight: appointmentChooserMinHeight,
                        }
                    }
                    title={"نوبت دهی"}
                />
            </div>

            <Comments
                title={"نظرات"}
                comments={props.comments}
            />
        </div>
    </MainTemplate>;
}
