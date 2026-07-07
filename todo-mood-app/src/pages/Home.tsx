import { useUserStore } from '@/store/userStore'
import { saveUserName } from '@/utils/userNameStorage';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { setUserName } = useUserStore();
  const navigate = useNavigate();
  const [inputName, setInputName] = useState('');

  // 영문 체크
  const handleChangeInputName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (/^[a-zA-Z]*$/.test(value)) {
      setInputName(value);
    }
  };

  const handleLogin = () => {
    if (!inputName.trim()) {
      alert('사용자 이름을 입력해주세요.');
      return;
    };

    saveUserName(inputName);
    setUserName(inputName);
    navigate("/todo");
  }

  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <div className="text-center">
        <h3 className="text-3xl font-bold tracking-wide">TODAY.</h3>
        <p className="text-sm text-neutral-500 dark:text-neutral-300">오늘의 할 일과 감정을 함께 기록하세요.</p>
      </div>

      <div className="mt-17.5">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <div className="mb-7.5">
            <input 
              type="text"
              className="w-65 border rounded-md p-2 box-border dark:border-neutral-300"
              placeholder="사용자 이름을 입력하세요."
              maxLength={10}
              value={inputName}
              onChange={handleChangeInputName}
            />
            <label className="block text-sm text-neutral-500 dark:text-neutral-300 mt-1">* 영문만 입력 가능합니다. (최대 10자)</label>
          </div>
  
          <button 
            className="w-65 px-2 py-3 box-border border rounded-md bg-neutral-800 hover:bg-black 
            dark:bg-neutral-700 dark:border-neutral-700 dark:hover:border-neutral-400 text-white transition-colors duration-300 cursor-pointer"
            type='submit'
          >
            시작하기
          </button>
        </form>
      </div>
    </div>
  )
}

export default Home