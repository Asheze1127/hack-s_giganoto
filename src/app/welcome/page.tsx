"use client"; 
import Link from 'next/link';

const WelcomePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center">
      <h1 className="text-2xl font-bold mb-2">メール認証が完了しました！</h1>
      <p className="mb-4">ありがとうございます。最後に、ログインして登録を完了してください。</p>
      <Link href="/Login" className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
        ログインページへ進む
      </Link>
    </div>
  );
};
export default WelcomePage;
