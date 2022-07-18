import React, {useEffect, useState} from 'react';
import AdminHeader from "../../Components/admin_header/admin_header";
import {Card} from 'antd';
import {MainApi} from "../../services/api";

function Statistics(props) {
    const [allStudents, setAllStudents] = useState([])
    const [tolov, setTolov] = useState([])
    useEffect(() => {
        fetch(`${MainApi}/students/all`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setAllStudents(data?.length)
            });
        fetch(`${MainApi}/tolov/all`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setTolov(data?.length)
            });
    }, [])
    return (
        <div className='root_page'>
            <AdminHeader/>
            <div className="left_spaced statistics">
                <Card title="Talabalar soni" style={{width: 300}}>
                    <p>{allStudents}</p>
                </Card>
                <Card title="To'lovlar soni" style={{width: 300}}>
                    <p>{tolov}</p>
                </Card>
            </div>
        </div>
    );
}

export default Statistics;
