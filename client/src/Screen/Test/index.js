import {useEffect, useState} from "react";
import {Button, DatePicker, Form, Input, Radio, Select,} from 'antd';
import {Ariza} from '../../Components/Language'
import Upload from "antd/es/upload/Upload";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {toast} from "react-hot-toast";
import ParticlesBg from 'particles-bg'
import {MainApi} from "../../services/api";
import moment from "moment"
import {listData} from "../../utils/data";


const Test = ({language, setUserName}) => {
    const history = useNavigate()
    const [loading, setLoading] = useState(false)

    // useEffect(() => {
    //     setUserName(null)
    //     localStorage.removeItem('Token')
    // }, [])

    const [mapDistrict, setMapDistrict] = useState([])
    const [typeFaculty, setTypeFaculty] = useState('')
    const [typeLang, setTypeLang] = useState('')
    const [typeEducation, setTypeEducation] = useState('')
    const [changeFaculty, setChangeFaculty] = useState([])
    const [obj, setObj] = useState({
        degree: "",
        country: "",
        university: "",
        faculty: ""
    })

    useEffect(() => {
        if (typeLang === 'rus' && typeFaculty === 'morning' && typeEducation === 'bachelor') {
            setChangeFaculty(['Mehnat muhofazasi va yangi materiallar texnologiyasi (tarmoqlar boyicha)', 'Neftь va neftь-gazni qayta ishlash texnologiyasi', 'Neftь va gaz quvurlari, baza va omborlarini qurish va ulardan foydalanish', 'Transport logistikasi (avtomobil transporti)', 'Funksional ovqatlanish va bolalar maxsulotlari texnologiyasi', 'Oziq-ovqat texnologiyasi (non, makron va kandolatchilik mahsulotlari)', 'Oziq-ovqat sanoati mashina va jihozlari', 'Texnologik mashinalar va jihozlar (sovutish, kriogen texnikasi va moʼtadillash tizimlari mashinalari hamda agregatlari)', 'Texnologik mashinalar va jihozlar (tarmoqlar boʼyicha)', 'Materialshunoslik va yangi materiallar texnologiyasi (tarmoqlar boʼyicha)', 'Kimyoviy texnologiya (qurilish materiallar)', 'Neftь gazkimyo sanoati texnologiyasi', 'Mexatronika va robototexnika', 'Mashinasozlik texnologiyasi, mashinasozlik ishlab chiqarishini jihozlash va avtomatlashtirish', 'Oziq-ovqat texnologiyasi (mahsulot turlari boʼyicha)'])
        } else if (typeLang === 'rus' && typeFaculty === 'evening' && typeEducation === 'bachelor') {
            setChangeFaculty(['Oziq-ovqat texnologiyasi (don mahsulotlari)', 'Vinochilik texnologiyasi, bijgʼish mahsulotlari va alkogolsiz ichimliklar texnologiyasi', 'Texnologik mashinalar va jihozlar (tarmoqlar boʼyicha)', 'Kimyoviy texnologiya (ishlab chiqarish turlari boʼyicha)', 'Texnologik jarayonlar va ishlab chiqarishni avtomatlashtirish va boshqarish (tarmoqlar boʼyicha)'])
        } else if (typeLang === 'eng' && typeFaculty === 'morning' && typeEducation === 'bachelor') {
            setChangeFaculty(['Oziq-ovqat texnologiyasi (mahsulot turlari boʼyicha)'])
        } else if (typeLang === 'rus' && typeFaculty === 'morning' && typeEducation === 'magister') {
            setChangeFaculty(['Neft va gazni qayta ishlash va kimyoviy texnologiyasi', 'Neftь va gaz quvurlari, baza va omborlarini qurish va ulardan foydalanish|Neftь va gaz quvurlari, baza va omborlarini qurish va ulardan foydalanish', 'Oziq-ovqat mahsulotlarini ishlab chiqarish va qayta ishlash texnologiyasi (mahsulot turlari boʼyicha)', 'Xizmatlar sohasi (faoliyat turlari va yoʼnalishlari boʼyicha)', 'Oziq-ovqat sanoati mashina va agregatlari', 'Kimyoviy texnologiya jarayonlari va apparatlari (ishlab chiqarish turi boʼyicha)'])
        } else if (typeLang === 'eng' && typeFaculty === 'morning' && typeEducation === 'magister') {
            setChangeFaculty(['Oziq-ovqat xavfsizligi va sifati|Oziq-ovqat xavfsizligi va sifati', 'Latviya', 'Yogʼochga ishlov berish texnologiyasi va yogʼochshunoslik|Yogʼochga ishlov berish texnologiyasi va yogʼochshunoslik'])
        } else {
            setChangeFaculty([])
        }
    }, [typeLang, typeEducation, typeFaculty])


    const {
        name,
        lastName,
        fatherName,
        phone,
        birth,
        lang,
        district,
        education,
        street,
        faculty,
        form,
        gander,
        house,
        passportS,
        passport,
        passportIssued,
        picture,
        region,
        school,
        facultyName1,
        facultyName2,
        lang1,
        lang2,
        education1,
        education2,
        genderMale,
        genderWoman,
        send,
        location,
        country1,
        country2
    } = Ariza

    const selectRegion = [
        "Toshkent", "Toshkent shahar", "Surxondaryo", "Namangan", "Andijon", "Samarqand",
        "Sirdaryo", "Navoiy", "Buhoro", "Jizzax", "Qashqadaryo", "Qoraqolpog`iston"
    ]

    function selectDistrict(event) {
        if (event === 'Toshkent') setMapDistrict(['Bekabod', "Bo'stonliq", "Bo'ka", 'Chinoz', 'Qibray', 'Ohongaron', "Oqqo'rg'on", 'Parkent', 'Quyi chirchiq', "O'rta chirchiq", "Yangiyo'l", 'Yuqori chirchiq', "Zangiota"])
        else if (event === 'Toshkent shahar') setMapDistrict(['Mirobod', 'Bektemir', "Mirzo Ulug'bek", 'Sergili', 'Olmozor', 'Uchtepa', 'Shayxontoxur', 'Yashnabod ', 'Chilonzor', 'Yunudabod', 'Yakkasaroy'])
        else if (event === 'Surxondaryo') setMapDistrict(['Angor', 'Boysun', 'Bandixon', 'Denov', 'Jarqo`rg`on', 'Qorlik', 'Qiziriq', 'Qumqo`rg`on', 'Muzrobod', 'Sariosiyo', 'Sariq', 'Sharg`un', 'Sherobod', 'Sho`rchi', 'Termiz', 'Uchqizil', 'Uzun', 'Xalqobod'])
        else if (event === 'Andijon') setMapDistrict(['Oq oltin|Oq oltin', 'Oltinko`l|Oltinko`l', 'Andijon|Andijon', 'Asaka|Asaka', 'Ohunboboev|Ohunboboev', 'Baliqchi|Baliqchi', 'Bo`z|Bo`z', 'Buloqboshi|Buloqboshi', 'Qorasuv|Qorasuv', 'Kuyganyor|Kuyganyor', 'Qo`rg`ontepa|Qo`rg`ontepa', 'Marhamat|Marhamat', 'Poytug`|Poytug`', 'Pahtaobod|Pahtaobod', 'Shahrihon|Shahrihon', 'Xonobod|Xonobod', 'Xodjabod|Xodjabod'])
        else if (event === 'Namangan') setMapDistrict(['Chortoq|Chortoq', 'Chust|Chust', 'Jomasho`y|Jomasho`y', 'Kosonsoy|Kosonsoy', 'Namangan|Namangan', 'Pop|Pop', 'Toshbuloq|Toshbuloq', 'To`raqo`rg`on|To`raqo`rg`on', 'Uchqo`rg`on|Uchqo`rg`on', 'Xaqqulabod|Xaqqulabod'])
        else if (event === 'Samarqand') setMapDistrict(['Oqtosh|Oqtosh', 'Bulung`ur|Bulung`ur', 'Chelak|Chelak', 'Darband|Darband', 'Jumboy|Jumboy', 'Juma|Juma', 'Go`zalkent|Go`zalkent', 'Gulobod|Gulobod', 'Ishtihon|Ishtihon', 'Kattaqo`rg`on|Kattaqo`rg`on', 'Qo`shrobod|Qo`shrobod', 'Loish|Loish', 'Nurobod|Nurobod', 'Payariq|Payariq', 'Payshanba|Payshanba', 'Samarqand|Samarqand', 'Tayloq|Tayloq', 'Urgut|Urgut', 'Ziadin|Ziadin'])
        else if (event === 'Sirdaryo') setMapDistrict(['Baxt|Baxt', 'Boyovut|Boyovut', 'Sirdaryo|Sirdaryo', 'Guliston|Guliston', 'Navro`z|Navro`z', 'Sayxun|Sayxun', 'Sardoba|Sardoba', 'Shirin|Shirin', 'Sirdaryo|Sirdaryo', 'Terenozek|Terenozek', 'Xovos|Xovos', 'Yangiyer|Yangiyer'])
        else if (event === 'Navoiy') setMapDistrict(['Beshrobot|Beshrobot', 'Konimex|Konimex', 'Karmana|Karmana', 'Qiziltepa|Qiziltepa', 'Navoiy|Navoiy', 'Nurota|Nurota', 'Tomdibuloq|Tomdibuloq', 'Uchquduq|Uchquduq', 'Yangirobot|Yangirobot', 'Zarafshon|Zarafshon'])
        else if (event === 'Buhoro') setMapDistrict(['Olot|Olot', 'Buhoro|Buhoro', 'Galaosiyo|Galaosiyo', 'Gazli|Gazli', 'G`ijduvon|G`ijduvon', 'Kogon|Kogon', 'Qorako`l|Qorako`l', 'Qorovulbozor|Qorovulbozor', 'Romitan|Romitan', 'Shofirkon|Shofirkon', 'Vobkent|Vobkent', 'Jondor|Jondor'])
        else if (event === 'Jizzax') setMapDistrict(['Aydarko`l|Aydarko`l', 'Balandchaqir|Balandchaqir', 'Dashtobod|Dashtobod', 'Dostlik|Dostlik', 'Jizzax|Jizzax', 'Gagarin|Gagarin', 'G`allaorol|G`allaorol', 'G`oliblar|G`oliblar', 'Marjonbuloq|Marjonbuloq', 'Pahtakor|Pahtakor', 'Uchtepa|Uchtepa', 'O`smat|O`smat', 'Yangiqishloq|Yangiqishloq', 'Zomin|Zomin', 'Zafarobod|Zafarobod', 'Zarbdor|Zarbdor'])
        else if (event === 'Qashqadaryo') setMapDistrict(['Beshkent|Beshkent', 'Chiroqchi|Chiroqchi', 'Dehqonobod|Dehqonobod', 'G`uzor|G`uzor', 'Qamashi|Qamashi', 'Karashina|Karashina', 'Qarshi|Qarshi', 'Koson|Koson', 'Kasbi|Kasbi', 'Kitob|Kitob', 'Muborak|Muborak', 'Mug`lon|Mug`lon', 'Shahrisabz|Shahrisabz', 'Talimarjon|Talimarjon', "Yakkabog|Yakkabog'", 'Mirishkor|Mirishkor', 'Nishon|Nishon'])
        else if (event === 'Qoraqolpog`iston') setMapDistrict(['Oqmangit|Oqmangit', 'Beruniy|Beruniy', 'Bo`ston|Bo`ston', 'Chimboy|Chimboy', 'Qanliko`l|Qanliko`l', 'Qorao`zak|Qorao`zak', 'Kegeyli|Kegeyli', 'Qo`ng`irot|Qo`ng`irot', 'Mang`it|Mang`it', 'Mo`ynoq|Mo`ynoq', 'Nukus|Nukus', 'Shumanay|Shumanay', 'Taxiatosh|Taxiatosh', 'Taxtako`pir|Taxtako`pir', 'To`rtko`l|To`rtko`l', 'Xo`jayli|Xo`jayli'])
    }

    const onFinish = (values) => {
        let dataForm = new FormData()
        console.log(moment(values.birth_date._d).format("YYYY-MM-DD HH:mm:ss"))
        dataForm.append("birth_date", moment(values.birth_date._d).format("YYYY-MM-DD HH:mm:ss"))
        delete values.birth_date
        console.log(values)
        Object.keys(values).forEach(key => {
            if ((key !== 'bio_img' || key !== 'birth_date')) {
                dataForm.append(key, values[key])
            }
        })
        dataForm.append("bio_img", values.bio_img.file)

        setLoading(true)
        axios({
            method: "POST",
            url: `${MainApi}/students/add`,
            data: dataForm
        }).then(res => {
            if (res === "ok") {
                history('/')
                toast.success('Successfully toasted!')
                setLoading(false)
            } else {
                setLoading(false)
                toast.success("success!")
            }
        }).catch(e => {
            setLoading(false)
            toast.error(e.message)
            console.log(e)
        })
    }

    return <>
        <ParticlesBg color="#0d3b66" type="cobweb" num={35} bg={true}/>
        <div className={'ariza-box'} style={{marginTop: 100}}>
            <Form
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
                initialValues={{
                    size: '',
                }}
                onFinish={onFinish}
                size={''}
            >
                <div className={'form-ariza'}>
                    <div className={'form-col-1'}>
                        <Form.Item name={'name'} label={name[language]}>
                            <Input required/>
                        </Form.Item>

                        <Form.Item name={'surename'} label={lastName[language]}>
                            <Input required/>
                        </Form.Item>

                        <Form.Item name={'father_name'} label={fatherName[language]}>
                            <Input required/>
                        </Form.Item>

                        <Form.Item name={'phone_number'} label={phone[language]}>
                            <Input required/>
                        </Form.Item>

                        <Form.Item name={'passport_seria_number'} label={passportS[language]}>
                            <Input required/>
                        </Form.Item>

                        <Form.Item name={'passport_jshir'} label={passport[language]}>
                            <Input required/>
                        </Form.Item>

                        <Form.Item name={'passport_location'} label={passportIssued[language]}>
                            <Input required/>
                        </Form.Item>

                        <Form.Item rules={[
                            {
                                required: true,
                                message: birth[language]
                            },
                        ]} name={'birth_date'} label={birth[language]}>
                            <DatePicker/>
                        </Form.Item>

                        <Form.Item name={'gender'} label={gander[language]}>
                            <Radio.Group>
                                <Radio value="male">{genderMale[language]}</Radio>
                                <Radio value="woman">{genderWoman[language]}</Radio>
                            </Radio.Group>
                        </Form.Item>

                        <Form.Item rules={[
                            {
                                required: true,
                                message: region[language]
                            },
                        ]} name={'region'} label={region[language]}>
                            <Select onChange={(e) => selectDistrict(e)}>
                                {selectRegion.map((item, index) => <Select.Option value={item} key={index}>
                                    {item}
                                </Select.Option>)}
                            </Select>
                        </Form.Item>
                    </div>

                    <div className={'form-col-1'}>
                        <Form.Item rules={[
                            {
                                required: true,
                                message: district[language]
                            },
                        ]} name={'city'} label={district[language]}
                        >
                            <Select>
                                {mapDistrict.map((item, index) => <Select.Option value={item} key={index}>
                                    {item}
                                </Select.Option>)}
                            </Select>

                        </Form.Item>

                        <Form.Item name={'street'} label={street[language]}>
                            <Input required/>
                        </Form.Item>

                        <Form.Item rules={[
                            {
                                required: true,
                                message: house[language]
                            },
                        ]} name={'home_number'} label={house[language]}>
                            <Input required/>
                        </Form.Item>

                        <Form.Item
                            rules={[
                                {
                                    required: true,
                                    message: picture[language]
                                },
                            ]}
                            name="bio_img"
                            label={picture[language]}
                        >
                            <Upload accept=".png,.jpg" beforeUpload={file => {
                                return false
                            }}><Button>Select file</Button></Upload>
                        </Form.Item>

                        <Form.Item name={'finished_study'} label={school[language]}>
                            <Input required/>
                        </Form.Item>
                        <Form.Item rules={[
                            {
                                required: true,
                                message: education[language]
                            },
                        ]} name={'study_level'} label={education[language]}>
                            <Select onChange={(e) => setTypeEducation(e)}>
                                <Select.Option value="bachelor">{education1[language]}</Select.Option>
                                <Select.Option value="master">{education2[language]}</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item rules={[
                            {
                                required: true,
                                message: location[language]
                            },
                        ]} name={'country'} label={location[language]}>
                            <Select
                                onChange={event => setObj({
                                    ...obj,
                                    country: event
                                })}
                                value={obj?.country}
                            >
                                {
                                    typeEducation === "bachelor" &&
                                    listData[0]["bachelor"].map(p => {
                                        return (
                                            <option value={p.country}>{p.country}</option>
                                        )
                                    })
                                }
                                {
                                    typeEducation === "master" &&
                                    listData[0]["master"].map(p => {
                                        return (
                                            <option value={p.country}>{p.country}</option>
                                        )
                                    })
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item rules={[
                            {
                                required: true,
                                message: "Universitetni tanlang"
                            },
                        ]} name={'university'} label={`Universitetni tanlang`}>
                            <Select
                                onChange={event => setObj({
                                    ...obj,
                                    university: event
                                })}
                                value={obj?.university}
                            >
                                {
                                    typeEducation === "bachelor" &&
                                    listData[0]["bachelor"].find(l => l.country === obj?.country)?.universities.map(p => {
                                        return (
                                            <option value={p.name}>{p.name}</option>
                                        )
                                    })
                                }
                                {
                                    typeEducation === "master" &&
                                    listData[0]["master"].find(l => l.country === obj?.country)?.universities.map(p => {
                                        return (
                                            <option value={p.name}>{p.name}</option>
                                        )
                                    })
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item rules={[
                            {
                                required: true,
                                message: form[language]
                            },
                        ]} name={'study_type'} label={form[language]}>
                            <Select onChange={(e) => setTypeFaculty(e)}>
                                <Select.Option value="morning">{facultyName1[language]}</Select.Option>
                                <Select.Option value="evening">{facultyName2[language]}</Select.Option>
                            </Select>
                        </Form.Item>

                        <Form.Item rules={[
                            {
                                required: true,
                                message: lang[language]
                            },
                        ]} name={'study_lang'} label={lang[language]}>
                            <Select onChange={(e) => setTypeLang(e)}>
                                <Select.Option value="rus">{lang1[language]}</Select.Option>
                                <Select.Option value="eng">{lang2[language]}</Select.Option>
                            </Select>
                        </Form.Item>


                        <Form.Item rules={[
                            {
                                required: true,
                                message: faculty[language]
                            },
                        ]} name={'facultet'} label={faculty[language]}>
                            <Select
                                onChange={event => setObj({
                                    ...obj,
                                    faculty: event
                                })}
                                value={obj?.faculty}
                            >
                                {
                                    typeEducation === "master" &&
                                    listData[0]["master"].find(l => l.country === obj?.country)?.universities?.find(u => u.name === obj?.university)?.faculties?.map(p => {
                                        return (
                                            <option value={p}>{p}</option>
                                        )
                                    })
                                }
                                {
                                    typeEducation === "bachelor" &&
                                    listData[0]["bachelor"].find(l => l.country === obj?.country)?.universities?.find(u => u.name === obj?.university)?.faculties?.map(p => {
                                        return (
                                            <option value={p}>{p}</option>
                                        )
                                    })
                                }
                            </Select>
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{offset: 8, span: 16,}}>
                            <Button className={'form-btn'} type="primary" htmlType="submit" loading={loading}>
                                {send[language]}
                            </Button>
                        </Form.Item>
                    </div>
                </div>
            </Form>
        </div>
    </>
}

export default Test
