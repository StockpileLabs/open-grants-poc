//@ts-nocheck
import md5 from "md5";

export const getRandomAvatar = (key: any) => {
  return `https://gravatar.com/avatar/${md5(key)}?s=400&d=robohash&r=x`;
};
