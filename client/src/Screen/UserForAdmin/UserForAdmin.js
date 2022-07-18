import {useMatch, useNavigate, useParams} from "react-router-dom";
import {Button, Spin} from "antd";
import {Ariza} from "../../Components/Language";
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import {LeftOutlined} from "@ant-design/icons";

import {toast} from "react-hot-toast";
import {MainApi} from "../../services/api";

function UserForAdmin({language}) {

    const {id} = useParams()

    const history = useNavigate()
    const style = {
        textAlign: 'center',
        marginTop : 100
    }

    const [user, setUser] = useState('')
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        setLoading(true)
        axios({
            method: "GET",
            url: `${MainApi}/application/student/${id}`,
            headers: {"Authorization": "Bearer " + localStorage.getItem("Token")}
        }).then(res => {
            if (res.data.message.code === 0) {
                setUser(res.data.data)
                setLoading(false)
            } else {
                setLoading(false)
                toast.error(res.data.message)
            }
        }).catch(e => {
            setLoading(false)
            toast.error(e.message)
        })
    }, [])

    const {back} = Ariza;

    return (

        <>
            <div style={{float: 'right', paddingRight: "1rem", marginTop: "-1rem"}}>
                <Button onClick={() => history('/qabul')} className={'form-btn'} type="primary" htmlType="button">
                    <LeftOutlined /> {back[language] }
                </Button>
            </div>

            <h1 style={style}>Abituriyent haqida umumiy malumot</h1>

            <div className="hr"></div>


            {

                loading ? <Spin style={{marginTop: 20}} className={'small-spin'}/> :
                    <div>

                        <>
                            <div className="student">
                                <span className="textUser">Name : </span> <span className="textUser2">{user.name}</span><br/>
                                <span className="textUser">Tug'ilgan sanasi : </span><span className="textUser2">{user.name}</span><br/>
                                <span className="textUser">JSHSHIR Raqami : </span><span className="textUser2">{user.passport}</span><br/>
                                <span className="textUser">Manzil : </span><span className="textUser2">{user.region + " " + user.street + " " + user.house}</span><br/>
                                <span className="textUser">Topshirgan yo'nalishi : </span><span className="textUser2">{user.faculty}</span><br/>
                                <span className="textUser">Passport seriyasi : </span><span className="textUser2">{user.passportSeria}</span><br/>
                                <span className="textUser">Jinsi : </span><span className="textUser2">{user.gander}</span><br/>
                                <span className="textUser">Ta'lim darajasi : </span><span className="textUser2">{user.education}</span><br/>
                                <span className="textUser">Ta'lim tili : </span><span className="textUser2">{user.language}</span><br/>
                                <span className="textUser">Ta'lim shakli : </span><span className="textUser2">{user.form}</span><br/>
                                <span className="textUser">Telefon raqami : </span><span className="textUser2">{user.phone}</span><br/>
                                <span className="textUser">Tugallagan ta'lim muassasasi : </span><span className="textUser2">{user.school}</span><br/>
                            </div>
                        </>

                    </div>

            }

        </>


    )
}

export default UserForAdmin
