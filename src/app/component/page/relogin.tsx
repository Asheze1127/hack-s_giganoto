"use client";
import { PrimaryButton } from "../atomic/button/button";
import { PrimaryTextBox } from "../atomic/textbox/textbox";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL and Key are required. Please check your .env.local file.");
}

const supabase = createClient(supabaseUrl, supabaseKey);

export const Relogin = () => {
  const [textMail, setMail] = useState("");
  const [textPass, setPass] = useState("");


  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "email") setMail(value);
    else if (name === "password") setPass(value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // 1. ログイン試行
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email: textMail,
      password: textPass,
    });

    if (signInError) {
      console.error('認証エラー:', signInError);
      alert(`ログインに失敗しました: ${signInError.message}`);
      return;
    }

    if (signInData.user) {
      const user = signInData.user;

      // 2. ログイン成功後、プロフィールが既に存在するかチェック
      const { data: profile, error: profileError } = await supabase
        .from('member_informations')
        .select('id')
        .eq('id', user.id)
        .single();

      // PGRST116 は '行が見つかりません' というエラーで、この場合は新規ユーザーなので問題ない
      if (profileError && profileError.code !== 'PGRST116') {
        console.error('プロフィールチェックエラー:', profileError);
        alert('プロフィールの確認中にエラーが発生しました。');
        return;
      }

      // 3. プロフィールが存在しない場合のみ、新規作成
      if (!profile) {
        const { error: insertError } = await supabase
          .from('member_informations')
          .insert([{
            id: user.id,
            mail: user.email,
            name: user.user_metadata.user_name || '', // 新規登録時に保存した名前
            slack_id: null,
            question_answer: {}
          }]);

        if (insertError) {
          console.error('プロフィール登録エラー:', insertError);
          alert('プロフィールの登録に失敗しました。');
          return;
        }
        alert('登録が完了しました！');
      } else {
        alert('ログインしました。');
      }

      // 4. 登録/ログイン成功後、ダッシュボードなどのページへリダイレクト
      // window.location.href = '/dashboard';
    }
  };
  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto space-y-4">
      <h1 className="text-xl font-bold mb-4">ログイン</h1>
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
      <PrimaryButton label="ログイン / 登録完了" type="submit" />
    </form>
  );
}
