import { message } from "antd";
export const openTopNotif = (title, icon, duration) => {
  message.info({
    duration: duration,
    content: title,
    icon: icon,
  });
};
