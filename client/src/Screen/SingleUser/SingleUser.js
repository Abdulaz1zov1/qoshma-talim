import React, {useEffect, useRef, useState} from 'react';
import {Alert, Button, Form, Spin} from "antd";
import Upload from "antd/es/upload/Upload";
import PDF from "../../Components/PDF/PDF";
import PaySlip from "../../Components/tickedDownload/container";
import axios from "axios";
import {MainApi} from "../../services/api";
import {toast} from "react-hot-toast";
import {useReactToPrint} from "react-to-print";
import {Ariza} from "../../Components/Language";

function getBase64(img, callback) {
    const reader = new FileReader()
    reader.addEventListener("load", () => callback(reader.result))
    reader.readAsDataURL(img)
}

function SingleUser({ setUserName, language ,id}) {
    const [loading, setLoading] = useState(false)
    const [loadingBtn, setLoadingBtn] = useState(false)
    const [pdf, setPdf] = useState({})
    const [file, setFile] = useState("")
    const [user, setUser] = useState([]);

    function onFinish(values) {
        if (!!file){
            setLoadingBtn(true)
            let dataForm = new FormData()
            dataForm.append("img",file)
            dataForm.append("arizaId",id)
            axios({
                method: 'POST',
                url: `${MainApi}/tolov/add`,
                data: dataForm,
            }).then(res => {
                toast.success("Fayl muvaffaqiyatli yuklandi!")
                setLoadingBtn(false)
            }).catch(e => {
                toast.error("")
                setLoadingBtn(false)
            })
        }
        else {
            toast.error("Avval fayl tanlang!")
        }
    }
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

    const {send} = Ariza

    useEffect(() => {
        if (!!id){
            axios.get(`${MainApi}/students/${id}`)
                .then(res => {
                    setUser(res?.data)
                    localStorage.setItem("user-data", JSON.stringify(res.data.data))
                    setLoading(false)
                    setPdf(res.data.data)
                }).catch(e => {
                setLoading(false)
                toast.error(e.message)
            })
        }
    }, [id])

    const handleChange = (info) => {
        if (info.file.status === "uploading") {
            return
        }
        if (info.file.status === "done") {
            setFile(info.file.originFileObj)
        }
    }

    const dummyRequest = ({ file, onSuccess }) => {
        setTimeout(() => {
            onSuccess("ok")
        }, 0)
    }

    return (
        <div>
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
                                        <Upload accept={'.pdf'}
                                                customRequest={dummyRequest}
                                                onChange={handleChange}
                                                name="logo" listType="picture">
                                            <Button>Check upload</Button>
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
                            <PDF pdf={pdf} type={false} language={language} ref={componentRef} user={user}/>
                        </div>
                    </div>
                    <PDF pdf={pdf} type={true} language={language} />
                    <PaySlip ref={componentRef1} user={user} pdf={pdf}/>
                </div>
            }
        </div>
    );
}

export default SingleUser;
