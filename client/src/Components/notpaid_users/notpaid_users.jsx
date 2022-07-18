import {  useState, useEffect } from 'react'
import {MainApi} from "../../services/api";

function NotPaidUsers() {
    const [searchTerm, setSearchTerm] = useState([])
    const [allStudents, setAllStudents] = useState([])
    useEffect(() => {
        fetch(`${MainApi}/students/notpaid`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setAllStudents(data)
            });
    }, [])
    return (
        <>
            <div className="left_spaced">
                <div class="row pt-5 students_list">
                    <div class="col-xl-12">
                        <div class="card ">
                            <div class="card-body">
                                <div class="box">
                                    <form name="search" className='search_form'>
                                        <input type="text" class="input" name="txt" onmouseout="document.search.txt.value = ''" onChange={e => {
                                            setSearchTerm(e.target.value)
                                        }} /> <span class="deff">Search</span>
                                    </form>
                                </div>
                                <h4 class="mt-0 mb-4 pt-2">Barcha e`lonlar ro'yhati</h4>
                                <div class="table-responsive mt-5">
                                    <table class="table table-hover">
                                        <thead class="thead-dark">
                                            <tr>
                                                <th scope="col">Rasm</th>
                                                <th scope="col">ID</th>
                                                <th scope="col">Ismi</th>
                                                <th scope="col">Familiyasi</th>
                                                <th scope="col">Otasining ismi</th>
                                                <th scope="col">Universiteti</th>
                                                <th scope="col">Fakulteti</th>
                                                <th scope="col">Darajasi </th>
                                                <th scope="col">To'lov qilgan </th>
                                            </tr>
                                        </thead>
                                        {allStudents.reverse().filter((val) => {
                                            if (searchTerm == "") {
                                                return val
                                            } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                                                return val
                                            } else if (val.surename.toLowerCase().includes(searchTerm.toLowerCase())) {
                                                return val
                                            }
                                        }).map(item => (
                                            <tbody class="list_item_2">
                                                <td><img src={`${MainApi}/getfiles/${item.bio_img}`} class="sizeArticleImage" alt="" width={50} /></td>
                                                <td>{item.id}</td>
                                                <td>{item.name}</td>
                                                <td>{item.surename}</td>
                                                <td className='list_body'>{item.father_name}</td>
                                                <td class="">{item.university}</td>
                                                <td class="">{item.facultet}</td>
                                                <td class="">{item.study_level}</td>
                                                <td class=""><input type="checkbox" checked={item.checked} onClick={() => {
                                                    fetch(`${MainApi}/students/checked/${item.id}`, {
                                                        method: 'PUT',
                                                        headers: {
                                                            'Accept': 'application/json',
                                                            'Content-Type': 'application/json'
                                                        },
                                                        body: JSON.stringify(
                                                            {
                                                                checked: !item.checked
                                                            }
                                                        )
                                                    }).then(function (res) { return res.json(); })
                                                        .then(function (data) { console.log(data); })
                                                    window.location.reload()
                                                }} /></td>
                                            </tbody>
                                        ))}
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NotPaidUsers;
