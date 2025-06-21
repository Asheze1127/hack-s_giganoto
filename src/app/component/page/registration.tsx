"use client";
import { PrimaryButton } from "../atomic/button/button";
import { PrimaryTextBox } from "../atomic/textbox/textbox";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const Registlation=()=> {
  const [textName, setName] = useState("");
  const [textMail, setMail] = useState("");
  const [textPass, setPass] = useState("");
  const [textPassConf, setPassConf] = useState("");

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "name") setName(value);
    else if (name === "email") setMail(value);
    else if (name === "password") setPass(value);
    else if (name === "passwordConf") setPassConf(value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (textPass !== textPassConf) {
      alert("パスワードが一致しません。");
      return;
    }

    const { error } = await supabase.auth.signUp({
      email: textMail,
      password: textPass,
      options: {
        data: {
          user_name: textName, // ユーザー名をメタデータとして渡す
        },
        emailRedirectTo: `${window.location.origin}/welcome`,
      },
    });

    if (error) {
      alert(`サインアップエラー: ${error.message}`);
    } else {
      alert("確認メールを送信しました。メールを確認してください。");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto space-y-4">
      <h1 className="text-xl font-bold mb-4">登録</h1>

      <PrimaryTextBox
        label="お名前"
        name="name"
        value={textName}
        onChange={handleTextChange}
        placeholder="例：山田 太郎"
        id="name-input"
      />
      <PrimaryTextBox
        label="メールアドレス"
        name="email"
        type="email"
        value={textMail}
        onChange={handleTextChange}
        placeholder="例：user@example.com"
        id="email-input"
      />
      <PrimaryTextBox
        label="パスワード"
        name="password"
        type="password"
        value={textPass}
        onChange={handleTextChange}
        placeholder="パスワードを入力"
        id="password-input"
      />
      <PrimaryTextBox
        label="パスワード確認"
        name="passwordConf"
        type="password"
        value={textPassConf}
        onChange={handleTextChange}
        placeholder="パスワードを確認"
        id="password-confirm-input"
      />

      <PrimaryButton label="登録" type="submit" />
    </form>
  );
}
export const Registration = Registlation;