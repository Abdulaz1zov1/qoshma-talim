import { Link, useLocation } from "react-router-dom";
import { Button, Dropdown, Menu } from "antd";
import SelectLanguage from "../SelectLanguage";
import SelectLanguage2 from "./SelectLanguage";
import { Ariza } from "../Language";
import logoImg from "../../logo.png";
import gerbImg from "../../gerb.png";
import comandIcon from "../../comand_icon.png";

const Sidebar = ({ setLanguage, language, userName, setUserName }) => {
  const { ariza_button, logo, yoriqnoma_button, kirish, profil_page, qabul } =
    Ariza;

  const menu = (
    <Menu
      items={[
        {
          label: <Link to={"/qabul"}>{qabul[language]}</Link>,
          key: "0",
        },
        {
          label: <Link to={"/user"}>{profil_page[language]}</Link>,
          key: "1",
        },
        {
          label: (
            <Link
              to={"/"}
              onClick={() => {
                localStorage.removeItem("Token");
                localStorage.removeItem("user-data");
                setUserName(null);
              }}
            >
              Log out
            </Link>
          ),
          key: "2",
        },
      ]}
    />
  );
  const menu1 = (
    <Menu
      items={[
        {
          label: <Link to={"/user"}>{profil_page[language]}</Link>,
          key: "1",
        },
        {
          label: (
            <Link
              to={"/"}
              onClick={() => {
                localStorage.removeItem("Token");
                localStorage.removeItem("user-data");
                setUserName(null);
              }}
            >
              Log out
            </Link>
          ),
          key: "2",
        },
      ]}
    />
  );
  const location = useLocation();

  function myFunction() {
    let x = document.querySelector("#a1");
    let y = document.querySelector("#a4");
    if (x.style.display === "none") {
      x.style.display = "block";
      y.style.transform = "rotate(0)";
      y.style.transition = "1s";
    } else {
      x.style.display = "none";
      y.style.transform = "rotate(90deg)";
      y.style.transition = "1s";
    }
  }

  // console.log(userName)

  return (
    <>
      {location.pathname !== "/qabul" || location.pathname !== "/paid" ? (
        <div className="navbar-container">
          <div className={"navbar-item"}>
            <div className="col-1">
              <div>
                <Link to="/">
                  {/* <a href="/"> */}
                  <div class="costum-logo-img">
                    <img src={logoImg} alt="logo" width="70" />
                  </div>
                  <span class="costum-logo-text">
                    TOSHKENT KIMYO TEXNOLOGIYA INSTITUTI QO'SHMA TA'LIM{" "}
                  </span>
                  {/* </a> */}
                  {/* {logo[language]} */}
                </Link>
              </div>
            </div>
            <div className="col-2">
              <div
                style={{ position: "relative" }}
                id={"a3"}
                onClick={() => myFunction()}
              >
                <button
                  id={"a4"}
                  className="button-48"
                  role="button"
                  style={{ transform: "rotate(90deg)" }}
                >
                  <span className="text">|||</span>
                </button>
                <div className={"a1"} id={"a1"} style={{ display: "none" }}>
                  <Link to="/ariza">
                    <button
                      className="button-48"
                      role="button"
                      style={{ width: "100%" }}
                    >
                      <span className="text">{ariza_button[language]}</span>
                    </button>
                  </Link>
                  {userName ? (
                    <>
                      {userName.teacher ? (
                        <Link to="/qabul">
                          <button
                            className="button-48"
                            role="button"
                            style={{ width: "100%" }}
                          >
                            <span className="text">{qabul[language]}</span>
                          </button>
                        </Link>
                      ) : null}
                      <Link to="/user">
                        <button
                          className="button-48"
                          role="button"
                          style={{ width: "100%" }}
                        >
                          <span className="text">{profil_page[language]}</span>
                        </button>
                      </Link>
                      <Link to="/">
                        <button
                          className="button-48"
                          role="button"
                          style={{ width: "100%" }}
                          onClick={() => {
                            localStorage.removeItem("Token");
                            localStorage.removeItem("user-data");
                            setUserName(null);
                          }}
                        >
                          <span className="text">Log out</span>
                        </button>
                      </Link>
                    </>
                  ) : (
                    <Link to={"/fortest"}>
                      <button
                        className="button-48"
                        role="button"
                        style={{ width: "100%" }}
                      >
                        <span className="text">{kirish[language]}</span>
                      </button>
                    </Link>
                  )}
                  <div
                    className="language-btn-burger"
                    style={{ padding: "1.5rem 2.2 rem", background: "white" }}
                  >
                    <SelectLanguage2
                      className="no-hamburger"
                      setLanguage={setLanguage}
                      style={{
                        display: "flex !important",
                        justifyContent: "center !important",
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className={"a2"}>
                <Link to="/ariza">
                  <button className="button-48" role="button">
                    <span className="text">{ariza_button[language]}</span>
                  </button>
                </Link>
              </div>
              <div className={"a2"}>
                <Link to="/qabul">
                  <button className="button-48" role="button">
                    <span className="text">Qabul</span>
                  </button>
                </Link>
              </div>
              <div className="no-hamburger">
                {userName ? (
                  <Dropdown
                    overlay={userName.teacher ? menu : menu1}
                    trigger={["click"]}
                    className={"a2"}
                  >
                    <button
                      type="button"
                      role="button"
                      className="button-48"
                      onClick={(e) => e.preventDefault()}
                    >
                      <span className={"text"}>{userName.name}</span>
                    </button>
                  </Dropdown>
                ) : (
                  <Link to={"/fortest"} className={"a2"}>
                    <button className="button-48" role="button">
                      <span className="text">{kirish[language]}</span>
                    </button>
                  </Link>
                )}
              </div>
              <div class="commands d-none">
                <div class="gerb">
                  <img src={gerbImg} alt="" width="35" />
                </div>
                <button class="zoom_btn zoom_minus">A-</button>
                <button class="zoom_btn zoom_default">A</button>
                <button class="zoom_btn zoom_plus">A+</button>
                <button class="zoom_btn theme_btn">
                  <img src={comandIcon} alt="" width="17" />
                </button>
              </div>

              <SelectLanguage
                className="no-hamburger"
                setLanguage={setLanguage}
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Sidebar;
