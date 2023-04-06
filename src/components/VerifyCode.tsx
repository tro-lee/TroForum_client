import React, {useState, useRef} from "react";
import Captcha from "react-captcha-code";

export default function VerifyCode(props) {
    // 使用React的状态来存储验证码和用户输入
    const [code, setCode] = useState("");
    const [input, setInput] = useState("");

    // 使用React的引用来获取Captcha组件的实例
    const captchaRef = useRef(null);

    // 处理用户输入变化的事件
    function handleChange(e) {
        setInput(e.target.value);
    }

    // 当用户输入完成后
    function handleInputBlur() {
        props.setVerify(input === code);
    }

    // 处理Captcha组件生成验证码的事件
    function handleCaptchaChange(captcha) {
        setCode(captcha);
    }

    return (
        // 使用tailwindcss的功能类来装饰组件
        <div className="flex items-center justify-center">
            <div className="inline-block">
                <input
                    className="border border-gray-300 px-4 py-2 w-2/3"
                    type="text"
                    value={input}
                    onChange={handleChange}
                    onBlur={handleInputBlur}
                />
            </div>
            <div className="inline-block">
                <Captcha
                    ref={captchaRef}
                    height={40}
                    width={100}
                    charNum={4}
                    fontSize={25}
                    onChange={handleCaptchaChange}
                />
            </div>
        </div>
    );
}
