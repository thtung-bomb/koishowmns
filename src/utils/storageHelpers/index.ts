import i18n from 'i18next';
import { User } from '../../models';

export const changeLanguage = (lng: string) => {
  i18n.changeLanguage(lng);
  localStorage.setItem('i18nextLng', lng);
};

export const getUserFromLocalStorage = () => {
  const userString = localStorage.getItem("user");
  const user: User = userString ? JSON.parse(userString) : "";
  return user
}

