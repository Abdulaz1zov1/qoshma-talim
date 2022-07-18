import { List } from "antd";
// import QRCode from "react-qr-code";
import QRCode from "qrcode";
import { Ariza } from "../Language";
import { useEffect, useState, forwardRef } from "react";
import { MainApi } from "../../services/api";
import { data } from "./data";

const PDF = forwardRef(({ pdf, type, language ,user}, ref) => {
  const [src, setSrc] = useState("");
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
  } = Ariza;

  useEffect(() => {
    if (user)
    QRCode.toDataURL(
      "http://192.168.0.102:3000/QR/" + user?.id + "/" + "setapp"
    ).then((data) => {
      setSrc(data);
      //   console.log(data);
    });
  }, [pdf]);



  return (
    <div
      style={type ? { opacity: 0, marginTop: "20%" } : {}}
      className={type ? "pdf-none" : "pdf-center"}
      ref={ref}
    >
      <div
        id={type ? "PDF" : ""}
        style={type ? { display: "block", width: "65%" } : {}}
      >
        <h3 style={{ textAlign: "center" }}>Abituriyentning Qayt varaqasi</h3>
        <h2
          style={{ color: "red", textAlign: "center", fontFamily: "monospace" }}
        >
          Tizim testlanmoqda! Ushbu arizangiz haqiqiy hisoblanmaydi.
        </h2>
        <h5 style={{ textAlign: "center" }}>Shaxsiy ma'lumotlar</h5>

        <div style={{ display: "flex" }}>
          <div
            className={"pdf-title"}
            style={
              type
                ? { width: "80%" }
                : {
                    width: "80%",
                    fontSize: 16,
                  }
            }
          >
            <List>
              <div
                style={type ? { width: "80%" } : { width: "80%", fontSize: 15 }}
              >
                {"ID"} :{" "}
                <span style={{ fontWeight: "bold", width: "60%" }}>
                  {user?._id /* done*/}
                </span>
              </div>
              <div
                style={type ? { width: "80%" } : { width: "80%", fontSize: 15 }}
              >
                {"F . I . SH"} :{" "}
                <span style={{ fontWeight: "bold", width: "60%" }}>
                  {user?.name} {"  "} {user?.surename} {"  "}{" "}
                  {user?.father_name}
                </span>
              </div>
              <div
                style={type ? { width: "80%" } : { width: "80%", fontSize: 15 }}
              >
                {"Passport"} :{" "}
                <span style={{ fontWeight: "bold", width: "60%" }}>
                  {user?.passport_seria_number}
                </span>
              </div>
              <div
                style={type ? { width: "80%" } : { width: "80%", fontSize: 15 }}
              >
                {passport[language]} :{" "}
                <span style={{ fontWeight: "bold", width: "60%" }}>
                  {user?.passport_jshir}
                </span>
              </div>
              <div
                style={type ? { width: "80%" } : { width: "80%", fontSize: 15 }}
              >
                {"Passport berilgan joyi"} :{" "}
                <span style={{ fontWeight: "bold", width: "60%" }}>
                  {user?.passport_location}
                </span>
              </div>
              {/* <div style={type ? {width: '80%'} : {width: '80%', fontSize: 15}}>
                                {'Tug\'lgan sana'} : <span style={{fontWeight: 'bold', width: "60%"}}>{user?.birth_date}</span>
                            </div> */}
              <div
                style={type ? { width: "80%" } : { width: "80%", fontSize: 15 }}
              >
                {phone[language]} :{" "}
                <span style={{ fontWeight: "bold", width: "60%" }}>
                  {user?.phone_number}
                </span>
              </div>
              <div
                style={type ? { width: "80%" } : { width: "80%", fontSize: 15 }}
              >
                {"Yashash manzili"} :{" "}
                <span style={{ fontWeight: "bold", width: "60%" }}>
                  {user?.region +
                    " " +
                    user?.city +
                    " " +
                    user?.street +
                    " " +
                    user?.home_number}
                </span>
              </div>
            </List>
          </div>

          <div style={{ width: "20%" }} className={"logo-pdf"}>
            <img
              style={
                type
                  ? { width: "130px", height: "130px" }
                  : { width: "190px", height: "190px" }
              }
              src={`${user?.bio_img}`}
              alt="user?"
            />
          </div>

          {/*<div style={{width: '80px', height: '80px', border: "1px solid"}}>*/}
          {/*    <img src={src} alt="NO" width={"80px"} height={"80px"}/>*/}
          {/*    /!*<QRCode value={'http://192.168.31.82:3000/QR/' + pdf._id + "/" + "setapp"} size={80}/>*!/*/}
          {/*</div>*/}
        </div>

        <hr />
        <div style={{ display: "flex" }}>
          <div style={{ width: "90%" }}>
            <List>
              {/*<div style={{display: 'flex'}}>*/}
              {/*    <List.Item style={type ? {width: '80%'} : {width: '80%', fontSize: 16}}>*/}
              {/*        {'Passport'} : <span style={{fontWeight: 'bold', width: "60%"}}>{pdf.passport}</span>*/}
              {/*    </List.Item>*/}
              {/*    <List.Item style={type ? {width: '80%'} : {width: '80%', fontSize: 16}}>*/}
              {/*        {'Id'} : <span style={{fontWeight: 'bold', width: "60%"}}>{pdf._id}</span>*/}
              {/*    </List.Item>*/}
              {/*</div>*/}

              <List.Item
                style={
                  type
                    ? {}
                    : {
                        fontSize: 16,
                      }
                }
              >
                {"Test topshiradigan hudud"} :{" "}
                <span style={{ fontWeight: "bold" }}>{user?.region}</span>
              </List.Item>
              <List.Item style={type ? {} : { fontSize: 16 }}>
                {"Test topshiradigan sana"} :{" "}
                <span style={{ fontWeight: "bold" }}>1-Avgust</span>
              </List.Item>
              <List.Item
                style={
                  type
                    ? {}
                    : {
                        fontSize: 16,
                      }
                }
              >
                {"Test sinovi topshirish joyiga kelish vaqti"} :{" "}
                <span style={{ fontWeight: "bold" }}>8:00</span>
              </List.Item>
            </List>
          </div>
          <div>
            <div style={{ width: "150px", height: "150px" }}>
              <img src={src} alt="NO" width={"150px"} height={"150px"} />
              {/*<QRCode value={'http://192.168.31.82:3000/QR/' + pdf._id + "/" + "setapp"} size={80}/>*/}
            </div>
          </div>
        </div>

        <hr />

        <List>
          <List.Item
            style={
              type
                ? { width: "100%" }
                : {
                    width: "100%",
                    fontSize: 16,
                  }
            }
          >
            {"Test o'tkaziladigan bino nomi"} :{" "}
            <span style={{ fontWeight: "bold" }}>Yoshlar ittifoqi binosi</span>
          </List.Item>
          <List.Item style={type ? {} : { fontSize: 16 }}>
            {"Bino manzil"} :{" "}
            <span style={{ fontWeight: "bold" }}>
              Yoshlar ittifoqi binosi ko'chasi
            </span>
          </List.Item>
          <div style={{ display: "flex" }}>
            <List.Item
              style={type ? { width: "30%" } : { fontSize: 16, width: "30%" }}
            >
              {"Smena"} : <span style={{ fontWeight: "bold" }}>1</span>
            </List.Item>
            <List.Item
              style={type ? { width: "30%" } : { fontSize: 16, width: "30%" }}
            >
              {"Bino raqami"} : <span style={{ fontWeight: "bold" }}>4</span>
            </List.Item>
            <List.Item
              style={type ? { width: "30%" } : { fontSize: 16, width: "30%" }}
            >
              {"Guruh raqami"} : <span style={{ fontWeight: "bold" }}>6</span>
            </List.Item>
          </div>
          <div style={{ display: "flex" }}>
            <List.Item
              style={type ? { width: "50%" } : { fontSize: 16, width: "50%" }}
            >
              {"Ta'lim shakli"} :{" "}
              <span style={{ fontWeight: "bold" }}>Kunduzgi</span>
            </List.Item>
            <List.Item
              style={type ? { width: "50%" } : { fontSize: 16, width: "50%" }}
            >
              {"Ta'lim turi"} :{" "}
              <span style={{ fontWeight: "bold" }}>Rus tili</span>
            </List.Item>
          </div>
          <div style={{ display: "block", fontSize: 16 }}>
            <h5>
              Tanlangan oliy ta'lim muassasalri va ta'lim yo'nalishlari
              ketma-ketligi:
            </h5>
            <span style={{ fontWeight: "bold" }}>
              Andijon davlat universiteti | Informatika o'qitish metodikasi
            </span>
            <br />
            <span style={{ fontWeight: "bold" }}>
              Andijon davlat universiteti | Informatika o'qitish metodikasi
            </span>
            <br />
            <span style={{ fontWeight: "bold" }}>
              Andijon davlat universiteti | Informatika o'qitish metodikasi
            </span>
            <br />
            <br />
            <h5>Test topshiradigan fanlar:</h5>
            <span style={{ fontWeight: "bold" }}>Informatika</span>
            <br />
            <span style={{ fontWeight: "bold" }}>Matematika</span>
            <br />
            <span style={{ fontWeight: "bold" }}>Ingliz tili</span>
            <br />
            <br />
            <br />
            <h5 style={{ textAlign: "center" }}>Abiturientlarga eslatma!</h5>
            <br />
            <h3
              style={{
                color: "red",
                textAlign: "center",
                fontFamily: "monospace",
              }}
            >
              Tizim testlanmoqda! Ushbu arizangiz haqiqiy hisoblanmaydi.
            </h3>
            <br />
            <br />
          </div>
        </List>
      </div>
    </div>
  );
});

export default PDF;
