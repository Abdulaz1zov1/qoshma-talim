import {useEffect, useMemo, useState} from 'react'
import {MainApi} from "../../services/api";
import {Checkbox, Modal, Table} from "antd";
import {ExclamationCircleOutlined,} from "@ant-design/icons"
import axios from "axios";

function RegisteredUsers() {
    const [searchTerm, setSearchTerm] = useState([])
    const [allStudents, setAllStudents] = useState([])
    const [tolov, setTolov] = useState()

    const handleActivate = (id, bool) => {
        axios.put(`${MainApi}/students/${id}`).then(r => {
            fetch(`${MainApi}/students/all`)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    let a = []
                    for (let i = 0; i < data?.length; i++) {
                        if (!!data[i].name) {
                            a = [...a, data[i]]
                        }
                    }
                    setAllStudents(a)
                });
        })
            .catch(error => console.log(error))
    }

    const onChange = (e, id) => {
        if (e.target.checked) {
            Modal.confirm({
                centered: true,
                title: "Rostan ham to'lov qilmoqchimisiz?",
                icon: <ExclamationCircleOutlined/>,
                onOk() {
                    handleActivate(id, e.target.checked)
                    let a = allStudents.find(p => p._id.toString() === id.toString())
                    delete a.status
                    setAllStudents([...allStudents.filter(i => i._id.toString() === id.toString()), {
                        a,
                        status: true
                    }])
                },
            })
        } else {
            Modal.confirm({
                centered: true,
                title: "Rostan to'lovni bekor qilmoqchimisiz?",
                icon: <ExclamationCircleOutlined/>,
                onOk() {
                    handleActivate(id, e.target.checked)
                },
            })
        }
    };

    useEffect(() => {
        fetch(`${MainApi}/students/all`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                let a = []
                for (let i = 0; i < data?.length; i++) {
                    if (!!data[i].name) {
                        a = [...a, data[i]]
                    }
                }
                setAllStudents(a)
            });
    }, [])

    useEffect(() => {
        fetch(`${MainApi}/tolov/all`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setTolov(data)
            });
    }, [])

    const columns = useMemo(() => {
        return [
            {
                title: 'Rasm',
                dataIndex: 'bio_img',
                key: 'bio_img',
                render: (text) => <img src={text} alt="yurt" className="imgs"/>,
            },
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Familiya',
                dataIndex: 'surename',
                key: 'surename',
            },
            {
                title: 'Otasining ismi',
                key: 'father_name',
                dataIndex: 'father_name'
            },
            {
                title: 'Tel no\'meri',
                key: 'phone_number',
                dataIndex: 'phone_number'
            },
            {
                title: 'Universitet',
                key: 'university',
                dataIndex: 'university'
            },
            {
                title: 'Fakulteti',
                key: 'facultet',
                dataIndex: 'facultet'
            },
            {
                title: 'Darajasi',
                key: 'study_level',
                dataIndex: 'study_level'
            },
            {
                title: 'To\'lov',
                key: 'id',
                render: (values) => {
                    if (!values?.status && tolov?.some(p => p?.arizaId?.toString() === values?._id?.toString()))
                        return (
                            <Checkbox onChange={e => onChange(e, values?._id)}
                                      checked={values?.status}>To'lov</Checkbox>
                        )
                    else {
                        if (values?.status) {
                            return <Checkbox checked disabled>To'lov qilingan</Checkbox>
                        }
                        else {
                            return <p>Fayl yuklang</p>
                        }
                    }

                }
            },
        ];
    }, [tolov,allStudents])

    return (
        <>
            <div className="left_spaced">
                <div class="row pt-5 students_list">
                    <div class="col-xl-12">
                        <div class="card ">
                            <div class="card-body">
                                <div class="box">
                                    <form name="search" className='search_form'>
                                        <input type="text" class="input" name="txt"
                                               onmouseout="document.search.txt.value = ''" onChange={e => {
                                            setSearchTerm(e.target.value)
                                        }}/> <span class="deff">Search</span>
                                    </form>
                                </div>
                                <h4 class="mt-0 mb-4 pt-2">Barcha e`lonlar ro'yhati</h4>
                                <div class="table-responsive mt-5">
                                    <Table scroll={{x: "max-content"}} columns={columns} dataSource={allStudents}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RegisteredUsers;
