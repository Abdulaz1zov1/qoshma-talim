import React, {useEffect, useState} from "react";
import {Button, Checkbox, Dropdown, Menu} from "antd";
import {Base64} from "js-base64";
import {excelDataSet} from "./Example";

const ExcelFile = "";
const ExcelSheet = "";

function Excel() {

    const [data, setData] = useState(localStorage.getItem("EXCEL") ? JSON.parse(Base64.decode(localStorage.getItem("EXCEL"))) : []);
    const [dataT, setDataT] = useState([]);
    const [dataExcel, setDataExcel] = useState([]);
    const [filterExcel2, setFilterExcel2] = useState([]);
    const [filterExcel3, setFilterExcel3] = useState([]);
    const [dataSet, setDataSet] = useState([{
        columns: [],
        data: []
    }]);

    useEffect(() => {
        if (localStorage.getItem("EXCEL")) {
            setData(JSON.parse(Base64.decode(localStorage.getItem("EXCEL"))));
        }
    }, [localStorage.getItem("EXCEL")])

    useEffect(() => {
        let dataT = [];
        let arr = "";
        data?.map(i => {
                delete i._id;
                delete i.__v;
                delete i.education;
                delete i.photo;
                delete i.passport;
                delete i.passportSeria;
                delete i.passportIssued;
                delete i.gander;
                delete i.region;
                delete i.district;
                delete i.street;
                delete i.house;
                delete i.picture;
                delete i.school;
                delete i.form;
                delete i.language;
                delete i.faculty;
                delete i.pay;
                delete i.teacher;
                delete i.createdAt;
                delete i.updatedAt;
                dataT.push(i);
            }
        );
        setDataT(dataT);
        setDataExcel(dataT);
    }, [data]);


    useEffect(() => {
        let setData = excelDataSet(dataExcel, filterExcel2, filterExcel3);
        setDataSet(setData)
    }, [dataExcel, filterExcel2, filterExcel3]);

    useEffect(() => {
        dataT.map(i => {
            delete i.id;
            delete i.education;
            delete i.passport;
            delete i.passportSeria;
            delete i.passportIssued;
            delete i.gander;
            delete i.region;
            delete i.district;
            delete i.street;
            delete i.house;
            delete i.picture;
            delete i.school;
            delete i.form;
            delete i.language;
            delete i.faculty;
            delete i.pay;
            delete i.teacher;
            delete i.createdAt;
            delete i.updatedAt;
            setFilterExcel2(Object.keys(i));
            setFilterExcel3(Object.keys(i));
        });
    }, [dataT]);



    return (
        <>
            <div className="group-button" style={{margin: "32px 0 0 42px"}}>
                <ExcelFile
                    filename="SetAppStudent"
                    element={<Button type="button" className="group-button-btn1">Excel</Button>}>
                    <ExcelSheet dataSet={dataSet} name="SetAppStudent"/>
                </ExcelFile>
            </div>
        </>
    )
}

export default Excel
