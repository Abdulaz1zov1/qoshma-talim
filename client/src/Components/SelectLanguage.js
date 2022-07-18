import {Button, Tooltip} from "antd";
import uzb from "../images/flags/uzbekistan (1).png"
import eng from "../images/flags/united-kingdom (2).png"
import rus from "../images/flags/russia (1).png"

function SelectLanguage({setLanguage}) {

    function setLang(lang) {
        if (lang === 0) {
            localStorage.setItem("language", "0")
            setLanguage(lang)
        } else if (lang === 1) {
            localStorage.setItem("language", "1")
            setLanguage(lang)
        } else if (lang === 2) {
            localStorage.setItem("language", "2")
            setLanguage(2)
        }
    }

    return (
        <div className={'select-language'} id={"a2"}>
            <div className={'language-btn'}>
                <Tooltip>
                    <Button onClick={() => setLang(0)} >
                        <img className="flagLogo" src={uzb} width={32} height={32} alt="UZ"/>
                    </Button>
                </Tooltip>
                <Tooltip>
                    <Button onClick={() => setLang(1)} >
                        <img className="flagLogo" src={rus} width={32} height={32} alt="RU"/>
                    </Button>
                </Tooltip>
                <Tooltip>
                    <Button onClick={() => setLang(2)} >
                        <img className="flagLogo" src={eng} width={32} height={32} alt="EN"/>
                    </Button>
                </Tooltip>
            </div>
        </div>
    )
}

export default SelectLanguage