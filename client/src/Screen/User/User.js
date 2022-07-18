import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Alert, Button, Form, List, Spin } from "antd";
import Upload from "antd/es/upload/Upload";
import { Ariza } from "../../Components/Language";
import { jsPDF } from "jspdf";
import { toast } from "react-hot-toast";
import PDF from "../../Components/PDF/PDF";
import { useReactToPrint } from "react-to-print";
import Excel from "../Excel/Excel";
import { Base64 } from "js-base64";
import PaySlip from "../../Components/tickedDownload/container";
import {MainApi} from "../../services/api";

const handleDownload = () => {

    const pdf = document.getElementById('PDF')

    const doc = new jsPDF("p", "pt", "a4");
    doc.html(pdf, {
        callback: function (doc) {
            doc.save('bySetApp.pdf');
        }
    });

};


function User({ setUserName, language }) {


    const [data, setData] = useState([])
    const [user, setUser] = useState('user')
    const [loading, setLoading] = useState(false)
    const [loadingBtn, setLoadingBtn] = useState(false)
    const [pdf, setPdf] = useState({})

    const history = useNavigate()

    const {
        name, lastName, fatherName, phone, birth, lang, district, education, street,
        faculty, form, gander, house, passport, passportIssued, picture, region, school, facultyName1, facultyName2,
        lang1, lang2, education1, education2, genderMale, genderWoman, send
    } = Ariza

    useEffect(() => {
        localStorage.removeItem("active-btn")
        if (!localStorage.getItem("Token")) {
            history('/')
        }
    }, [])


    useEffect(() => {
        setLoading(true)
        axios({
            method: "GET",
            url: `${MainApi}/student/_id`,
            headers: { "Authorization": "Bearer " + localStorage.getItem("Token") }
        }).then(res => {
            if (res.data.message.code === 0) {
                setData(res.data.data)
                setUserName(res.data.data)
                localStorage.setItem("user-data", JSON.stringify(res.data.data))
                setLoading(false)
                setPdf(res.data.data)
            } else {
                setLoading(false)
                toast.error(res.data.message)
            }

        }).catch(e => {
            setLoading(false)
            toast.error(e.message)
        })
    }, [])


    function onFinish(values) {
        setLoadingBtn(true)
        let dataForm = new FormData()
        dataForm.append("photo", values.photo.file)
        axios({
            method: 'POST',
            url: `${MainApi}/student/id`,
            data: dataForm,
            headers: { "Authorization": "Bearer " + localStorage.getItem("Token") }
        }).then(res => {
            if (res.data.message.code === 0) {
                toast.success("")
            } else {
                toast.error('')
            }
            setLoadingBtn(false)

        }).catch(e => {
            toast.error("")
            setLoadingBtn(false)
        })

    }

    console.log(pdf)

    // PDF
    // useEffect(() => {

    //     if (token) {
    //         const newToken = JSON.parse(token)
    //         setUser(newToken[0])
    //     }
    // }, [])

    useEffect(() => {
        const token = localStorage.getItem("Token")
        fetch(`${MainApi}/students/getone/${token}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setUser(data[0])
            });
    }, [])
    const componentRef = useRef();
    const componentRef1 = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        pageStyle: '@page { size: A3; margin: 20mm; } @media print { body { -webkit-print-color-adjust: exact; padding: 10px !important; width: 1400px !important; font-size: 16px !important } }'
    });
    const handlePrint1 = useReactToPrint({
        content: () => componentRef1.current,
        pageStyle: '@page { size: A4; margin: 0mm; } @media print { body { -webkit-print-color-adjust: exact; padding: 10px !important; width: 800px !important; font-size: 16px !important } }'
    });

    return (
        <>
            {loading ? <Spin className={'small-spin'} /> :
                <div>
                    <div className={'user-page'} style={{ marginTop: 100 }}>
                        <div className="user-1">
                            <Form
                                labelCol={{ span: 4, }}
                                wrapperCol={{ span: 14, }}
                                layout="horizontal"
                                initialValues={{ size: '', }}
                                onFinish={onFinish}
                                size={''}>
                                <div style={{ display: 'flex' }}>
                                    <Form.Item
                                        name="photo"
                                    >
                                        <Upload multiple accept={'.pdf'} beforeUpload={(file) => {
                                            return false
                                        }}
                                            name="logo" action="http://185.217.131.79/api/tolov/add" listType="picture">
                                            <Button>Cheak upload</Button>
                                        </Upload>
                                    </Form.Item>

                                    <Button loading={loadingBtn} className={'form-btn'} type="primary" htmlType="submit">
                                        {send[language]}
                                    </Button>
                                    <Button className={'form-btn'}
                                        style={{background: '#0F0'}}
                                        htmlType="button"
                                        onClick={handlePrint1}>
                                        To'lov varaqasi
                                    </Button>
                                </div>

                            </Form>
                        </div>
                        <div className="user-2">
                            <Button onClick={handlePrint}
                                htmlType={"button"}
                                type={'primary'}>Generate PDF</Button>
                            {/* <Button disabled={!user.checked} onClick={handlePrint} htmlType={"button"} type={'primary'}>Generate PDF</Button> */}

                            {
                                !pdf?.teacher &&
                                <div className={'payment-alert'}>
                                    {!pdf?.pay ? <Alert message="To'lov yoq" type="error" /> :
                                        <Alert message="To'lov qilingan" type="success" />}
                                </div>
                            }
                        </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center", width: '90%' }}>
                        <div style={{ width: "80%" }}>
                            <PDF pdf={pdf} type={false} language={language} ref={componentRef} />
                        </div>
                    </div>

                    <PDF pdf={pdf} type={true} language={language} />
                    <PaySlip ref={componentRef1}/>

                </div>
            }

        </>
    )
}

export default User
