const USER_NAME_STORAGE_KEY = "userName";
const USER_NAME_EXPIRE_DAYS = 7;
const USER_NAME_EXPIRE_TIME = 1000 * 60 * 60 * 24 * USER_NAME_EXPIRE_DAYS;

type StoredUserName = {
  value: string;
  expiresAt: number;
}

export const saveUserName = (userName: string) => {
  const storedUserName: StoredUserName = {
    value: userName,
    // localStorage에는 만료 기능이 없어서 직접 만료 시간을 함께 저장
    expiresAt: Date.now() + USER_NAME_EXPIRE_TIME,
  };

  localStorage.setItem(USER_NAME_STORAGE_KEY, JSON.stringify(storedUserName));
}

export const getSavedUserName = () => {
  const savedUserName = localStorage.getItem(USER_NAME_STORAGE_KEY);

  if (!savedUserName) return "";

  try {
    const parsedUserName = JSON.parse(savedUserName) as StoredUserName;

    if (!parsedUserName.value || Date.now() > parsedUserName.expiresAt) {
      removeSavedUserName();
      return "";
    }

    return parsedUserName.value;
  } catch {
    // 예전처럼 문자열만 저장된 값이 있으면 새 포맷으로 다시 저장
    saveUserName(savedUserName);
    return savedUserName;
  }
}

export const removeSavedUserName = () => {
  localStorage.removeItem(USER_NAME_STORAGE_KEY);
}
