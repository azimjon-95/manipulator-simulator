import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../store/store";
import { RootState, AppDispatch } from "../store/store";
import { FormData } from "../types";

const LoginCard = () => {
    const { register, handleSubmit } = useForm<FormData>();
    const dispatch = useDispatch<AppDispatch>();
    const auth = useSelector((state: RootState) => state.app.authenticated);
    const [focusedInput, setFocusedInput] = useState<string | null>(null);

    const onSubmit = (data: FormData) => {
        dispatch(actions.login(data));
    };

    const handleLogout = () => {
        dispatch(actions.logout());
    };

    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
        }}>
            <div style={{
                backgroundColor: "#ffffff",
                borderRadius: "18px",
                padding: "48px",
                maxWidth: "440px",
                width: "100%",
                boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
                position: "relative",
                animation: "slideIn 0.4s ease-out"
            }}>


                <div style={{ textAlign: "center", marginBottom: "36px" }}>
                    <h1 style={{
                        color: "#1a1a1a",
                        fontSize: "32px",
                        fontWeight: "700",
                        margin: "0 0 8px 0",
                        letterSpacing: "-0.5px"
                    }}>
                        Манипулятор
                    </h1>
                    <p style={{
                        color: "#6b7280",
                        fontSize: "15px",
                        margin: 0,
                        fontWeight: "400"
                    }}>
                        Интерфейс управления и оптимизации команд
                    </p>
                </div>

                <div style={{ marginBottom: "24px" }}>
                    <label style={{
                        display: "block",
                        color: "#374151",
                        fontSize: "14px",
                        fontWeight: "600",
                        marginBottom: "8px"
                    }}>
                        Имя пользователя
                    </label>
                    <input
                        {...register("username")}
                        type="text"
                        onFocus={() => setFocusedInput('username')}
                        onBlur={() => setFocusedInput(null)}
                        style={{
                            width: "100%",
                            padding: "14px 16px",
                            fontSize: "15px",
                            border: `2px solid ${focusedInput === 'username' ? '#667eea' : '#e5e7eb'}`,
                            borderRadius: "12px",
                            backgroundColor: focusedInput === 'username' ? '#ffffff' : '#f9fafb',
                            outline: "none",
                            transition: "all 0.2s ease",
                            boxSizing: "border-box",
                            fontFamily: "inherit"
                        }}
                    />
                </div>

                <div style={{ marginBottom: "32px" }}>
                    <label style={{
                        display: "block",
                        color: "#374151",
                        fontSize: "14px",
                        fontWeight: "600",
                        marginBottom: "8px"
                    }}>
                        Пароль
                    </label>
                    <input
                        {...register("password")}
                        type="password"
                        onFocus={() => setFocusedInput('password')}
                        onBlur={() => setFocusedInput(null)}
                        style={{
                            width: "100%",
                            padding: "14px 16px",
                            fontSize: "15px",
                            border: `2px solid ${focusedInput === 'password' ? '#667eea' : '#e5e7eb'}`,
                            borderRadius: "12px",
                            backgroundColor: focusedInput === 'password' ? '#ffffff' : '#f9fafb',
                            outline: "none",
                            transition: "all 0.2s ease",
                            boxSizing: "border-box",
                            fontFamily: "inherit"
                        }}
                    />
                </div>

                <button
                    onClick={handleSubmit(onSubmit)}
                    style={{
                        width: "100%",
                        padding: "16px",
                        fontSize: "16px",
                        fontWeight: "600",
                        color: "#ffffff",
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        border: "none",
                        borderRadius: "12px",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        boxShadow: "0 4px 14px rgba(102, 126, 234, 0.4)",
                        fontFamily: "inherit"
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow = "0 6px 20px rgba(102, 126, 234, 0.5)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "0 4px 14px rgba(102, 126, 234, 0.4)";
                    }}
                >
                    Войти в систему
                </button>

                {auth && (
                    <button
                        onClick={handleLogout}
                        style={{
                            width: "100%",
                            padding: "16px",
                            fontSize: "16px",
                            fontWeight: "600",
                            color: "#374151",
                            background: "#ffffff",
                            border: "2px solid #d1d5db",
                            borderRadius: "12px",
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                            marginTop: "12px",
                            fontFamily: "inherit"
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "#f9fafb";
                            e.currentTarget.style.borderColor = "#9ca3af";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "#ffffff";
                            e.currentTarget.style.borderColor = "#d1d5db";
                        }}
                    >
                        Выйти из системы
                    </button>
                )}

                <div style={{ marginTop: "32px", textAlign: "center" }}>
                    <p style={{
                        color: "#9ca3af",
                        fontSize: "12px",
                        margin: 0
                    }}>
                        © 2025 Манипулятор. Все права защищены.
                    </p>
                </div>

                <style>{`
                    @keyframes slideIn {
                        from {
                            opacity: 0;
                            transform: translateY(20px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                `}</style>
            </div>
        </div>
    );
};

export default LoginCard;