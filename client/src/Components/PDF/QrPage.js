import {useEffect, useState} from "react";
import {List} from "antd";
// import QRCode from "react-qr-code";
import QRCode from "qrcode"
import {Ariza} from "../Language";
import axios from "axios";
import {toast} from "react-hot-toast";
import {useParams} from "react-router-dom";
import {MainApi} from "../../services/api";

function QrPage() {

    const {id} = useParams();
    const [src,setSrc] = useState("");


    useEffect(()=>{
        QRCode.toDataURL('http://192.168.0.102:3000/QR/' + pdf._id + "/" + "setapp").then((data) => {
            setSrc(data)
        })
    }, [])

    const {
        name, lastName, fatherName, phone, birth, lang, district, education, street,
        faculty, form, gander, house, passportS, passport, passportIssued, picture, region, school, facultyName1, facultyName2,
        lang1, lang2, education1, education2, genderMale, genderWoman, send
    } = Ariza

    const language = 0;
    const [pdf, setPdf] = useState({})

    useEffect(() => {
        axios({
            method: "GET",
            // url: "https://qoshmatalim.herokuapp.com/student",
            url: `${MainApi}/${id}`
        }).then(res => {
            if (res.data.message.code === 0) {
                setPdf(res.data.data)
            } else {
                toast.error(res.data.message)
            }

        }).catch(e => {
            toast.error(e.message)
        })
    }, [])

    return (
        <div style={{padding: "100px 100px 0"}}>
            <div>
                <div style={{display: "flex", alignItems: 'center'}}>
                    <div className={'logo-pdf'}>
                        <img style={{width: '80px', height: '80px'}} src={pdf?.picture} alt=""/>
                    </div>

                    <div className={'pdf-title'} style={{width: '100%', textAlign: 'center'}}>
                        <div>
                            <h5>
                                Ozbekiston respublikasi <br/>
                                vazirlar mahkamasi huzuridagi <br/>
                                davlat test markazi asdfggfdsdfgf
                            </h5>
                        </div>
                        <div style={{borderTop: '1px solid'}}>
                            <h5>{pdf?.name + " " + pdf?.lastName + " " + pdf?.fatherName}</h5>
                        </div>

                    </div>

                    <div style={{width: '80px', height: '80px', border: "1px solid"}}>
                        <img src={src} alt="NO" width={"80px"} height={"80px"}/>
                        {/*<QRCode value={'http://192.168.31.82:3000/QR/' + pdf._id + "/" + "setapp"} size={80}/>*/}
                    </div>
                </div>

                <List>
                    <div style={{display: 'flex'}}>
                        <List.Item style={{width: '50%'}}>
                            {'passport'} : <span style={{fontWeight: 'bold'}}>{pdf.passport}</span>
                        </List.Item>
                        <List.Item style={{width: '50%'}}>
                            {'id'} : <span style={{fontWeight: 'bold'}}>{pdf._id}</span>
                        </List.Item>
                    </div>

                    <List.Item>{'Test topshiradigan hudud'} : <span style={{fontWeight: 'bold'}}>{pdf.region}</span></List.Item>
                    <List.Item>{'Test topshiradigan sana'} : <span
                        style={{fontWeight: 'bold'}}>{pdf.createdAt && pdf.createdAt.substring(0,10)}</span></List.Item>
                    <List.Item>{'Test sinovi topshirish joyiga kelish vaqti'} : <span
                        style={{fontWeight: 'bold'}}>{''}</span></List.Item>
                    <List.Item>{'Test o\'tkaziladigan bino nomi'} : <span
                        style={{fontWeight: 'bold'}}>{''}</span></List.Item>
                    <List.Item>{'Bino manzil'} : <span style={{fontWeight: 'bold'}}>{''}</span></List.Item>
                    <div style={{display: 'flex'}}>
                        <List.Item style={{width: '50%'}}>
                            {'Smena'} : <span style={{fontWeight: 'bold'}}>{''}</span>
                        </List.Item>
                        <List.Item style={{width: '50%'}}>
                            {'Bino raqami'} : <span style={{fontWeight: 'bold'}}>{''}</span>
                        </List.Item>
                        <List.Item style={{width: '50%'}}>
                            {'Guruh raqami'} : <span style={{fontWeight: 'bold'}}>{''}</span>
                        </List.Item>
                    </div>
                    <div style={{display: 'flex'}}>
                        <List.Item style={{width: '50%'}}>
                            {'Ta\'lim shakli'} : <span style={{fontWeight: 'bold'}}>{pdf.form === "morning" ? facultyName1[language] : pdf.form === "evening" ? facultyName2[language] : ""}</span>
                        </List.Item>
                        <List.Item style={{width: '50%'}}>
                            {'Ta\'lim turi'} : <span style={{fontWeight: 'bold'}}>{pdf.language === "rus" ? lang1[language] : pdf.language === "eng" ? lang2[language] : ""}</span>
                        </List.Item>
                    </div>
                    <div style={{display: 'block'}}>
                        <h5>Tanlangan oliy ta'lim muassasalri va ta'lim yo'nalishlari ketma-ketligi:</h5>
                        <span style={{fontWeight: 'bold'}}>{pdf.faculty}</span>
                        <br/>
                        <br/>
                        <h5>Test topshiradigan fanlar:</h5>
                        <br/>
                        <h5 style={{textAlign: 'center'}}>Abiturientlarga eslatma!</h5>
                    </div>

                </List>

            </div>
        </div>
    )
}

export default QrPage
